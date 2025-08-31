const RequestForm = require("../models/RequestForm");

// Staff creates request
exports.createRequest = async (req, res) => {
  try {
    const { staff_id, fname, lname, item_name, quantity, measurement } = req.body;

    // Create request with fname and lname
    const requestId = await RequestForm.createRequest(
      staff_id,
      fname,
      lname,
      item_name,
      quantity,
      measurement
    );

    // Emit real-time notification to manager
    req.io?.emit("new_request", {
      request_id: requestId,
      staff_id,
      fname,
      lname,
      item_name,
      quantity,
      measurement,
      status: "PENDING",
    });

    res.status(201).json({ message: "Request submitted successfully", requestId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create request" });
  }
};

// Manager fetches all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await RequestForm.getRequests();
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

// Staff fetches own requests
exports.getMyRequests = async (req, res) => {
  try {
    const { staff_id } = req.params;
    const requests = await RequestForm.getRequestsByStaff(staff_id);
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch staff requests" });
  }
};

// Manager updates request (approve/reject)
exports.updateRequest = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { status, manager_comment } = req.body;

    const updated = await RequestForm.updateRequestStatus(
      request_id,
      status,
      manager_comment
    );

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Emit real-time update notification to staff
    req.io?.emit("update_request", {
      request_id,
      status,
      manager_comment,
    });

    res.json({ message: "Request updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update request" });
  }
};

// Manager deletes request
exports.deleteRequest = async (req, res) => {
  try {
    const { request_id } = req.params;

    const deleted = await RequestForm.deleteRequest(request_id);

    if (!deleted) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Emit real-time notification to staff (optional)
    req.io?.emit("delete_request", { request_id });

    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete request" });
  }
};
