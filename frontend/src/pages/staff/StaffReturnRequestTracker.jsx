import React, { useState, useEffect } from "react";
import axios from "axios";

function StaffReturnRequestTracker() {
  const [userId, setUserId] = useState(""); // updated state name
  const [inputUserId, setInputUserId] = useState(""); // updated input
  const [userApprovedReturns, setUserApprovedReturns] = useState([]);
  const [error, setError] = useState(null);

  // Process returns data for display
  const processReturnsData = (returns) => {
    const itemMap = new Map();

    returns.forEach((returnItem) => {
      const key = returnItem.item_name;

      if (!itemMap.has(key)) {
        itemMap.set(key, {
          item_name: returnItem.item_name,
          serialData: [{ serial: returnItem.serial_number, quantity: returnItem.quantity }],
          return_dates: [new Date(returnItem.return_date)],
          status: returnItem.status,
        });
      } else {
        const existing = itemMap.get(key);
        existing.serialData.push({ serial: returnItem.serial_number, quantity: returnItem.quantity });
        existing.return_dates.push(new Date(returnItem.return_date));
      }
    });

    return Array.from(itemMap.values()).map((item) => ({
      ...item,
      total_quantity: item.serialData.reduce((sum, data) => sum + data.quantity, 0),
      latest_return_date: new Date(Math.max(...item.return_dates.map((d) => d.getTime()))),
    }));
  };

  // Fetch manager-approved returns for given userId
  const fetchUserApprovedReturns = async () => {
    if (!userId) return;

    try {
      const res = await axios.get("http://localhost:5000/api/returns");
      // Filter based on user_id
      const approved = res.data.filter(
        (r) =>
          r.status === "Manager Approved" &&
          String(r.user_id).trim() === userId.trim()
      );
      setUserApprovedReturns(processReturnsData(approved));
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      setError("Failed to fetch return requests.");
      setUserApprovedReturns([]);
    }
  };

  // Fetch data whenever userId changes
  useEffect(() => {
    fetchUserApprovedReturns();
  }, [userId]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputUserId.trim()) {
      setError("Please enter a valid User ID");
      return;
    }
    setUserId(inputUserId.trim());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Track User Return Requests</h2>
          <p className="text-green-100 mt-1">Enter User ID to view manager-approved returns</p>
        </div>

        {/* User ID Form */}
        <div className="p-6 border-b border-gray-200">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputUserId}
              onChange={(e) => setInputUserId(e.target.value)}
              placeholder="Enter User ID"
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Search
            </button>
          </form>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <p>{error}</p>
            </div>
          )}

          {userId && userApprovedReturns.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No manager-approved returns for User ID: {userId}
              </h3>
            </div>
          ) : (
            userApprovedReturns.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Item Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Serial Numbers & Quantities</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Total Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Return Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userApprovedReturns.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <tr className={idx % 2 === 0 ? "bg-white" : "bg-green-50"}>
                          <td rowSpan={item.serialData.length} className="px-6 py-4 text-sm font-medium text-gray-900 align-top border-r">{item.item_name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 border-r">
                            <div className="flex items-center">
                              <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">{item.serialData[0].serial}</span>
                              <span className="ml-2 text-green-700 font-medium">(Qty: {item.serialData[0].quantity})</span>
                            </div>
                          </td>
                          <td rowSpan={item.serialData.length} className="px-6 py-4 text-sm text-gray-500 text-center align-top border-r">
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">{item.total_quantity}</span>
                          </td>
                          <td rowSpan={item.serialData.length} className="px-6 py-4 text-sm text-gray-500 align-top border-r">{item.latest_return_date.toLocaleDateString()}</td>
                          <td rowSpan={item.serialData.length} className="px-6 py-4 text-sm align-top">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{item.status}</span>
                          </td>
                        </tr>
                        {item.serialData.slice(1).map((serialItem, sIdx) => (
                          <tr key={`${idx}-${sIdx + 1}`} className={idx % 2 === 0 ? "bg-white" : "bg-green-50"}>
                            <td className="px-6 py-4 text-sm text-gray-500 border-r">
                              <div className="flex items-center">
                                <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">{serialItem.serial}</span>
                                <span className="ml-2 text-green-700 font-medium">(Qty: {serialItem.quantity})</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffReturnRequestTracker;
