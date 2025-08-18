import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const ForecastChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartInstance, setChartInstance] = useState(null);
  const [mostRequested, setMostRequested] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const res = await axios.get("/api/requests/forcast");

        const historicalData = res.data?.historicalData || [];
        const forecastData = res.data?.forecastData || [];
        setMostRequested(res.data?.mostRequested || null);

        if (historicalData.length === 0 && forecastData.length === 0) {
          setError("No forecast data available.");
          setLoading(false);
          return;
        }

        // Get all unique dates (for x-axis)
        const allDates = [
          ...new Set([
            ...historicalData.map((d) => d.date),
            ...forecastData.map((d) => d.date),
          ]),
        ];

        // Get all unique item IDs
        const items = [
          ...new Set([
            ...historicalData.map((d) => d.item_id),
            ...forecastData.map((d) => d.item_id),
          ]),
        ];

        // Prepare datasets per item
        const datasets = items.map((item, index) => {
          const color = `hsl(${(index * 60) % 360}, 70%, 50%)`;

          const historicalItemData = historicalData.filter(
            (d) => d.item_id === item
          );
          const forecastItemData = forecastData.filter(
            (d) => d.item_id === item
          );

          return {
            label: `Item ${item}`,
            data: allDates.map((date) => {
              const actual = historicalItemData.find((d) => d.date === date);
              const forecast = forecastItemData.find((d) => d.date === date);
              return actual
                ? actual.actualDemand
                : forecast
                ? forecast.predictedDemand
                : null;
            }),
            borderColor: color,
            backgroundColor: color,
            fill: false,
            tension: 0.2,
          };
        });

        // Create Chart
        const ctx = document.getElementById("demandChart").getContext("2d");

        if (chartInstance) {
          chartInstance.destroy();
        }

        const newChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: allDates,
            datasets: datasets,
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Item Demand Forecast" },
            },
            scales: {
              x: { title: { display: true, text: "Date" } },
              y: {
                title: { display: true, text: "Daily Demand" },
                beginAtZero: true,
              },
            },
          },
        });

        setChartInstance(newChart);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch forecast data.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        All Items Demand Forecast
      </h2>

      {loading && (
        <p className="text-center text-gray-600">Loading forecast data...</p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}

      {mostRequested && (
        <p className="text-center text-green-700 font-semibold mb-4">
          Most Requested Item: <b>{mostRequested.item_id}</b> with total demand of{" "}
          {mostRequested.totalDemand}
        </p>
      )}

      <canvas id="demandChart" />
    </div>
  );
};

export default ForecastChart;
