// const Return = require("../models/returnModel");

// // Socket.IO instance
// let ioInstance;
// exports.setSocketIO = (io) => {
//   ioInstance = io;
// };

// // Create a new return request (Staff)
// exports.createReturn = async (req, res) => {
//   try {
//     const id = await Return.create(req.body);

//     const newReturn = { ...req.body, return_id: id, status: "Pending" };

//     // Emit real-time event
//     ioInstance?.emit("newReturn", newReturn);

//     res.status(201).json({ message: "Return request created", return_id: id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ICT decision handler
// exports.ictDecision = async (req, res) => {
//   try {
//     const { decision } = req.body;
//     const validDecisions = ["approve", "reject"];

//     if (!decision || !validDecisions.includes(decision.toLowerCase())) {
//       return res.status(400).json({ message: "Invalid decision. Must be 'approve' or 'reject'" });
//     }

//     const status = decision.toLowerCase() === "approve" ? "ICT Approved" : "ICT Rejected";

//     const updated = await Return.updateStatus(req.params.return_id, status);

//     if (!updated) return res.status(404).json({ message: "Return not found" });

//     // Emit real-time update
//     ioInstance?.emit("updateReturn", { return_id: req.params.return_id, status });

//     res.json({ return_id: req.params.return_id, status });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all returns
// exports.getAllReturns = async (req, res) => {
//   try {
//     const results = await Return.getAll();
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const Return = require("../models/returnModel");

// Socket.IO instance
let ioInstance;
exports.setSocketIO = (io) => {
  ioInstance = io;
};

// Create a new return request (Staff)
exports.createReturn = async (req, res) => {
  try {
    const id = await Return.create(req.body);

    const newReturn = { ...req.body, return_id: id, status: "Pending" };

    ioInstance?.emit("newReturn", newReturn);

    res.status(201).json({ message: "Return request created", return_id: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ICT decision
exports.ictDecision = async (req, res) => {
  try {
    const { decision } = req.body;
    if (!decision || !["approve", "reject"].includes(decision.toLowerCase())) {
      return res.status(400).json({ message: "Invalid decision. Must be 'approve' or 'reject'" });
    }

    const status = decision.toLowerCase() === "approve" ? "ICT Approved" : "ICT Rejected";

    const updated = await Return.updateStatus(req.params.return_id, status);
    if (!updated) return res.status(404).json({ message: "Return not found" });

    ioInstance?.emit("updateReturn", { return_id: req.params.return_id, status });

    res.json({ return_id: req.params.return_id, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Manager decision
exports.managerDecision = async (req, res) => {
  try {
    const { decision } = req.body;
    if (!decision || !["approve", "reject"].includes(decision.toLowerCase())) {
      return res.status(400).json({ message: "Invalid decision. Must be 'approve' or 'reject'" });
    }

    const status = decision.toLowerCase() === "approve" ? "Manager Approved" : "Manager Rejected";

    const updated = await Return.updateStatus(req.params.return_id, status);
    if (!updated) return res.status(404).json({ message: "Return not found" });

    ioInstance?.emit("updateReturn", { return_id: req.params.return_id, status });

    res.json({ return_id: req.params.return_id, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all returns
exports.getAllReturns = async (req, res) => {
  try {
    const results = await Return.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
