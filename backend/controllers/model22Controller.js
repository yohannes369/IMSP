
// const Model22 = require('../models/model22');

// // pass io instance from server.js
// let ioInstance = null;
// const setSocketIO = (io) => {
//   ioInstance = io;
// };

// // ✅ Issue items from request
// const issueItemFromRequest = async (req, res) => {
//   try {
//     const { RequestID, ItemID, UnitIDs, Quantity, Remark } = req.body;

//     if (!RequestID || !ItemID || !UnitIDs || !Quantity) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Call model function to insert issued items
//     const result = await Model22.issueItem({
//       RequestID,
//       ItemID,
//       UnitIDs,
//       Quantity,
//       Remark: Remark || null
//     });

//     // ✅ Emit real-time notification
//     if (ioInstance) {
//       ioInstance.emit("model22:newIssue", {
//         message: "✅ New item issued",
//         RequestID,
//         ItemID,
//         UnitIDs,
//         Quantity,
//         Remark,
//         FormIDs: result.FormIDs,
//         timestamp: new Date()
//       });
//     }

//     res.status(201).json({
//       message: "✅ Item(s) issued successfully",
//       FormIDs: result.FormIDs
//     });

//   } catch (err) {
//     console.error("❌ Error issuing item:", err.message);
//     res.status(500).json({ error: err.message || "Server Error" });
//   }
// };

// // ✅ Fetch all Model22Form records
// const getModel22Form = async (req, res) => {
//   try {
//     const records = await Model22.getAllRecords();

//     res.status(200).json({
//       count: records.length,
//       records
//     });

//   } catch (err) {
//     console.error("❌ Error fetching Model22Form records:", err.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// module.exports = {
//   setSocketIO,
//   issueItemFromRequest,
//   getModel22Form
// };
const Model22 = require('../models/model22');

// Pass io instance from server.js
let ioInstance = null;
const setSocketIO = (io) => {
  ioInstance = io;
};

/**
 * ✅ Issue items from request
 */
const issueItemFromRequest = async (req, res) => {
  try {
    const { RequestID, ItemID, UnitIDs, Quantity, Remark } = req.body;

    if (!RequestID || !ItemID || !UnitIDs || !Quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Call model function to insert issued items
    const result = await Model22.issueItem({
      RequestID,
      ItemID,
      UnitIDs,
      Quantity,
      Remark: Remark || null
    });

    // ✅ Emit real-time notification
    if (ioInstance) {
      ioInstance.emit("model22:newIssue", {
        message: "✅ New item issued",
        RequestID,
        ItemID,
        UnitIDs,
        Quantity,
        Remark,
        FormIDs: result.FormIDs,
        timestamp: new Date()
      });
    }

    res.status(201).json({
      message: "✅ Item(s) issued successfully",
      FormIDs: result.FormIDs
    });

  } catch (err) {
    console.error("❌ Error issuing item:", err.message);
    res.status(500).json({ error: err.message || "Server Error" });
  }
};

/**
 * ✅ Return issued item
 */
const returnItem = async (req, res) => {
  try {
    const { formID } = req.params;

    if (!formID) {
      return res.status(400).json({ error: "FormID is required" });
    }

    // Call model function to process return
    const result = await Model22.returnItem(formID, ioInstance);

    res.status(200).json({
      message: "✅ Item returned successfully",
      result
    });

  } catch (err) {
    console.error("❌ Error returning item:", err.message);
    res.status(500).json({ error: err.message || "Server Error" });
  }
};

/**
 * ✅ Fetch all Model22Form records
 */
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
  setSocketIO,
  issueItemFromRequest,
  returnItem,
  getModel22Form
};
