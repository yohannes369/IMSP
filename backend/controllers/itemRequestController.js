const ItemRequest = require('../models/itemRequest');

// exports.createItemRequest = async (req, res) => {
//   try {
//     const {
//       staff_id,
//       staff_name,
//       staff_email,
//       item_type,
//       item_serial,
//       quantity,
//       explanation
//     } = req.body;

//     if (!staff_id || !staff_name || !staff_email || !item_type || !quantity) {
//       return res.status(400).json({ message: 'Required fields are missing' });
//     }

//     const result = await ItemRequest.create({
//       staff_id,
//       staff_name,
//       staff_email,
//       item_type,
//       item_serial,
//       quantity,
//       explanation,
//       status: 'pending_manager'
//     });

//     res.status(201).json({ message: 'Item request created', id: result.insertId });
//   } catch (error) {
//     console.error('Error creating item request:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.createItemRequest = async (req, res) => {
  try {
    const {
      staff_id,
      staff_name,
      staff_email,
      item_type,
      item_serial,
      quantity,
      explanation
    } = req.body;

    if (!staff_id || !staff_name || !staff_email || !item_type || !quantity) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Check if staff_id is already taken in item_requests
    // const existingRequest = await ItemRequest.findByStaffId(staff_id);
    // if (existingRequest) {
    //   return res.status(400).json({ message: 'Staff ID is taken, please use another' });
    // }

    const result = await ItemRequest.create({
      staff_id,
      staff_name,
      staff_email,
      item_type,
      item_serial,
      quantity,
      explanation,
      status: 'pending_manager'
    });

    res.status(201).json({ message: 'Item request created', id: result.insertId });
  } catch (error) {
    console.error('Error creating item request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllItemRequests = async (req, res) => {
  try {
    const requests = await ItemRequest.findAll();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching item requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getItemRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await ItemRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Item request not found' });
    }
    res.json(request);
  } catch (error) {
    console.error('Error fetching item request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateItemRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await ItemRequest.findById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Item request not found' });
    }

    await ItemRequest.update(id, data);

    const updated = await ItemRequest.findById(id);
    res.json(updated);
  } catch (error) {
    console.error('Error updating item request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteItemRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await ItemRequest.findById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Item request not found' });
    }

    await ItemRequest.remove(id);
    res.json({ message: 'Item request deleted successfully' });
  } catch (error) {
    console.error('Error deleting item request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
