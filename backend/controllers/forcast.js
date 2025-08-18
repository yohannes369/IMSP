const db = require('../config/db'); // must export a mysql2 promise pool with .execute(sql)
const MLR = require('ml-regression-multivariate-linear');

/**
 * GET /api/requests/forcast
 * Returns:
 *  - historicalData: [{ item_id, date, actualDemand }, ...]
 *  - forecastData: [{ item_id, date, predictedDemand }, ...]
 *  - mostRequested: { item_id, totalDemand }
 *  - warnings: [ ... ]
 */
const getRequestsForForecast = async (req, res) => {
  try {
    const sql = `
      SELECT item_id, quantity, DATE(created_at) as date 
      FROM request_items 
      ORDER BY created_at ASC
    `;
    const [rows] = await db.execute(sql);

    if (!rows || rows.length === 0) {
      return res.json({
        historicalData: [],
        forecastData: [],
        mostRequested: null,
        warnings: ['No historical rows returned from request_items table.']
      });
    }

    // Group by item + date
    const dataMap = {};
    rows.forEach(row => {
      const key = `${row.item_id}_${row.date}`;
      if (!dataMap[key]) {
        dataMap[key] = { item_id: row.item_id, date: row.date, actualDemand: 0 };
      }
      dataMap[key].actualDemand += Number(row.quantity || 0);
    });

    const historicalData = Object.values(dataMap);

    // Totals per item (for "most requested")
    const itemTotals = {};
    historicalData.forEach(d => {
      itemTotals[d.item_id] = (itemTotals[d.item_id] || 0) + d.actualDemand;
    });

    // Unique items present in historicalData
    const items = [...new Set(historicalData.map(d => d.item_id))];

    const forecastData = [];
    const warnings = [];

    for (const item of items) {
      const itemData = historicalData
        .filter(d => d.item_id === item)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      const pointCount = itemData.length;

      // If no points (shouldn't happen)
      if (pointCount === 0) {
        warnings.push(`No historical points for item ${item}; skipped.`);
        continue;
      }

      // If single data point: fallback — repeat last value for forecast horizon
      if (pointCount === 1) {
        warnings.push(`Only 1 historical point for item ${item}; using constant forecast (repeat last value).`);
        const lastDate = new Date(itemData[0].date);
        const lastValue = Number(itemData[0].actualDemand || 0);

        for (let i = 1; i <= 7; i++) {
          const fdate = new Date(lastDate.getTime() + i * 86400000);
          forecastData.push({
            item_id: item,
            date: fdate.toISOString().split('T')[0],
            predictedDemand: lastValue
          });
        }
        continue;
      }

      // For 2+ points: attempt linear regression
      try {
        const X = itemData.map((_, i) => [i + 1]);           // [[1],[2],...]
        const y = itemData.map(d => [Number(d.actualDemand || 0)]); // [[v1],[v2],...]

        if (X.length < 2 || y.length < 2) {
          warnings.push(`Not enough numeric points for item ${item}; skipping regression.`);
          continue;
        }

        const mlr = new MLR(X, y);

        const lastDate = new Date(itemData[itemData.length - 1].date);
        const baseIndex = X.length; // next predicted index starts at baseIndex + 1

        for (let i = 1; i <= 7; i++) {
          const dayIndex = baseIndex + i;
          let pred;
          try {
            const p = mlr.predict([dayIndex]); // returns array or number
            pred = Array.isArray(p) ? Number(p[0]) : Number(p);
            if (!isFinite(pred) || Number.isNaN(pred)) pred = 0;
          } catch (innerErr) {
            const avg = y.reduce((s, vv) => s + Number(vv[0]), 0) / y.length;
            pred = Number.isFinite(avg) ? avg : 0;
            warnings.push(`Prediction failed for item ${item} at index ${dayIndex}, used avg fallback.`);
          }

          const fdate = new Date(lastDate.getTime() + i * 86400000);
          forecastData.push({
            item_id: item,
            date: fdate.toISOString().split('T')[0],
            predictedDemand: pred
          });
        }
      } catch (errItem) {
        // regression init failed → fallback average
        const avg = itemData.reduce((s, d) => s + Number(d.actualDemand || 0), 0) / Math.max(itemData.length, 1);
        const lastDate = new Date(itemData[itemData.length - 1].date);
        warnings.push(`Regression error for item ${item}: ${errItem.message}. Using average fallback.`);
        for (let i = 1; i <= 7; i++) {
          const fdate = new Date(lastDate.getTime() + i * 86400000);
          forecastData.push({
            item_id: item,
            date: fdate.toISOString().split('T')[0],
            predictedDemand: avg
          });
        }
      }
    } // end for each item

    // Most requested
    let mostRequested = null;
    const entries = Object.entries(itemTotals);
    if (entries.length > 0) {
      entries.sort((a, b) => b[1] - a[1]); // desc
      mostRequested = { item_id: entries[0][0], totalDemand: entries[0][1] };
    }

    if (forecastData.length === 0) {
      warnings.push('No forecast generated for any item.');
    }

    return res.json({
      historicalData,
      forecastData,
      mostRequested,
      warnings
    });
  } catch (err) {
    console.error('Forecast endpoint error:', err);
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = { getRequestsForForecast };
