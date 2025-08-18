const RequestModel = require('../models/requestModel');

exports.acknowledgeItemReceipt = async (req, res) => {
  try {
    const { requestId } = req.body;

    await RequestModel.markAsReceived(requestId);
    res.json({ message: "Item receipt acknowledged." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while acknowledging item receipt." });
  }
};
