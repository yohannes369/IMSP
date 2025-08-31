// controllers/clerkController.js
const Model22 = require('../models/model22');

/**
 * Clerk issues item to staff
 */
const issueItem = async (req, res) => {
    try {
        const data = req.body; // Expect an object with all required fields
        const result = await Model22.issueItem(data);
        res.status(201).json({ message: "Item issued successfully", data: result });
    } catch (err) {
        console.error("Error issuing item:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

/**
 * Clerk receives returned item from staff
 */
const returnItem = async (req, res) => {
    try {
        const data = req.body; // Expect an object with all required fields
        const result = await Model22.returnItem(data);
        res.status(201).json({ message: "Item returned successfully", data: result });
    } catch (err) {
        console.error("Error returning item:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

/**
 * Get all issue/return records
 */
const getRecords = async (req, res) => {
    try {
        const records = await Model22.getAllRecords();
        res.status(200).json(records);
    } catch (err) {
        console.error("Error fetching records:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

// Make sure to export an object with function references
module.exports = {
    issueItem,
    returnItem,
    getRecords
};
