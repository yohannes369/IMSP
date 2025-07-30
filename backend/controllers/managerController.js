const ItemRequest = require('../models/itemRequest');

// Get all pending requests
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await ItemRequest.getPendingRequests();
    res.json(requests);
  } catch (err) {
    console.error('Error getting pending requests:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Accept or reject a request
exports.processRequestDecision = async (req, res) => {
  const requestId = req.params.id;
  const { action, explanation } = req.body;

  if (!['accept', 'reject'].includes(action)) {
    return res.status(400).json({ message: 'Invalid action type.' });
  }

  if (action === 'reject' && (!explanation || explanation.trim() === '')) {
    return res.status(400).json({ message: 'Explanation is required for rejection.' });
  }

  try {
    const updated = await ItemRequest.updateRequestStatus(
      requestId,
      action === 'accept' ? 'accepted' : 'rejected',
      explanation || null
    );

    if (updated === 0) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    res.json({ message: `Request ${action}ed successfully.` });
  } catch (err) {
    console.error('Error processing request decision:', err);
    res.status(500).json({ message: 'Server error' });
  }

  
};
