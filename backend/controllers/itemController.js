
const Item = require('../models/itemModel');
const ItemUnit = require('../models/itemUnitModel');

// Add a new item with units and notify clients in real-time
const addItem = async (req, res) => {
  try {
    let {
      Name,
      Model,
      TotalQty,
      ShelfNumber,
      UnitPriceBirr,
      UnitPriceCent,
      Remark,
      Description = "", // optional
      units
    } = req.body;

    TotalQty = Number(TotalQty) || 0;
    UnitPriceBirr = Number(UnitPriceBirr) || 0;
    UnitPriceCent = Number(UnitPriceCent) || 0;

    // Validate required fields
    if (!Name || TotalQty <= 0 || UnitPriceBirr < 0 || UnitPriceCent < 0) {
      return res.status(400).json({ message: 'Invalid item data' });
    }

    // Ensure units array exists
    if (!Array.isArray(units)) units = [];

    // Auto-generate missing units
    if (units.length < TotalQty) {
      for (let i = units.length; i < TotalQty; i++) {
        units.push({
          SerialNo: `SN${String(i + 1).padStart(3, "0")}`,
          UnitPriceBirr,
          UnitPriceCent,
          Status: 'AVAILABLE',
          AssignedTo: null
        });
      }
    } else if (units.length > TotalQty) {
      units = units.slice(0, TotalQty); // trim extra units
    }

    // Add item
    const itemID = await Item.add({ Name, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark, Description });

    // Add item units
    await ItemUnit.addUnits(itemID, units);

    // Real-time notification via Socket.IO
    if (req.io) {
      req.io.emit('newItemAdded', {
        ItemID: itemID,
        Name,
        Model,
        TotalQty,
        ShelfNumber,
        UnitPriceBirr,
        UnitPriceCent,
        Remark,
        Description
      });
    }

    res.status(201).json({ message: 'Item added successfully', itemID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Fetch all items with units
const getAllItems = async (req, res) => {
  try {
    const items = await Item.getAll();
    const itemsWithUnits = await Promise.all(
      items.map(async (item) => {
        const units = await ItemUnit.getByItemId(item.ItemID);
        return { ...item, units };
      })
    );
    res.status(200).json(itemsWithUnits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Fetch a single item by ID with units
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.getById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const units = await ItemUnit.getByItemId(id);
    res.status(200).json({ ...item, units });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update an item and its units
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.getById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const { Name, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark, Description, units } = req.body;

    // Update item
    await Item.update(id, { Name, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark, Description });

    // Optionally update units if provided
    if (Array.isArray(units)) {
      for (const unit of units) {
        if (unit.UnitID) {
          await ItemUnit.updateUnit(unit.UnitID, unit);
        }
      }
    }

    // Real-time notification
    if (req.io) {
      req.io.emit('itemUpdated', { ItemID: id });
    }

    res.status(200).json({ message: 'Item updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete an item and its units
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.getById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Delete all associated units first
    const units = await ItemUnit.getByItemId(id);
    for (const unit of units) {
      await ItemUnit.deleteUnit(unit.UnitID);
    }

    // Delete item
    await Item.delete(id);

    // Real-time notification
    if (req.io) {
      req.io.emit('itemDeleted', { ItemID: id });
    }

    res.status(200).json({ message: 'Item and its units deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { addItem, getAllItems, getItemById, updateItem, deleteItem };
