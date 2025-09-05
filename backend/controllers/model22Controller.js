

// const Model22 = require('../models/model22');

// // Issue items from request
// const issueItemFromRequest = async (req, res) => {
//   try {
//     const data = req.body; // Expect RequestID, ItemID, UnitIDs (array), Quantity, Remark
//     const result = await Model22.issueItem(data);
//     res.status(201).json({ 
//       message: "Item(s) issued successfully", 
//       FormIDs: result.FormIDs // return all inserted FormIDs
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message || "Server Error" });
//   }
// };

// // Fetch all Model22Form records
// const getModel22Form = async (req, res) => {
//   try {
//     const records = await Model22.getAllRecords(); // Make sure this exists in your Model22
//     res.status(200).json(records);
//   } catch (err) {
//     console.error("Error fetching Model22Form records:", err);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// module.exports = {
//   issueItemFromRequest,
//   getModel22Form
// };
const Model22 = require('../models/model22');

// ✅ Issue items from request
const issueItemFromRequest = async (req, res) => {
  try {
    const { RequestID, ItemID, UnitIDs, Quantity, Remark } = req.body;

    if (!RequestID || !ItemID || !UnitIDs || !Quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Call model function
    const result = await Model22.issueItem({
      RequestID,
      ItemID,
      UnitIDs,
      Quantity,
      Remark: Remark || null
    });

    res.status(201).json({
      message: "✅ Item(s) issued successfully",
      FormIDs: result.FormIDs // return all inserted FormIDs
    });

  } catch (err) {
    console.error("❌ Error issuing item:", err.message);
    res.status(500).json({ error: err.message || "Server Error" });
  }
};

// ✅ Fetch all Model22Form records
const getModel22Form = async (req, res) => {
  try {
    const records = await Model22.getAllRecords();

    res.status(200).json({
      count: records.length,
      records
    });

  } catch (err) {
    console.error("❌ Error fetching Model22Form records:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  issueItemFromRequest,
  getModel22Form
};
