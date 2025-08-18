import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const calPolyGreen = "#154734";
const calPolyYellow = "#C4820E";
const calPolyRed = "#DC2626";

const ClerkReportDashboard = ({ staffId }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [givenItems, setGivenItems] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState("");

  // Fetch all necessary data
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [
        pendingRes,
        givenRes,
        returnRes,
        itemsRes
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/requests/clerk/pending"),
        axios.get(`http://localhost:5000/api/give-items/${staffId}`),
        axios.get("http://localhost:5000/api/pending-returns"),
        axios.get("http://localhost:5000/api/items")
      ]);

      setPendingRequests(pendingRes.data || []);
      setGivenItems(givenRes.data || []);
      setReturnRequests(returnRes.data || []);
      setItems(itemsRes.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 transition-all duration-300 md:ml-64">
        {/* Mobile menu toggle */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-calPolyGreen text-white shadow-lg hover:bg-green-700 transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <main className="p-4 md:p-8">
          {/* Header */}
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-calPolyGreen mb-2">
              Clerk Report Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Detailed report of inventory requests, given items, and returns
            </p>
            <button
              onClick={fetchData}
              className="mt-4 px-4 py-2 rounded-md text-white font-medium"
              style={{ backgroundColor: calPolyGreen }}
            >
              Refresh Data
            </button>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-calPolyGreen">
              <h3 className="text-gray-500 font-medium">Pending Requests</h3>
              <p className="text-3xl font-bold text-calPolyGreen">
                {pendingRequests.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="text-gray-500 font-medium">Given Items</h3>
              <p className="text-3xl font-bold text-yellow-500">
                {givenItems.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
              <h3 className="text-gray-500 font-medium">Pending Returns</h3>
              <p className="text-3xl font-bold text-red-500">
                {returnRequests.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-calPolyGreen">
              <h3 className="text-gray-500 font-medium">Total Items</h3>
              <p className="text-3xl font-bold text-calPolyGreen">
                {items.length}
              </p>
            </div>
          </div>

          {/* Pending Requests Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Pending Clerk Requests
              </h2>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div
                  className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                  style={{ borderColor: calPolyGreen }}
                ></div>
              </div>
            ) : error ? (
              <div className="p-4 text-red-700 bg-red-100">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-calPolyGreen text-white">
                      <th className="px-4 py-3 text-left">Item</th>
                      <th className="px-4 py-3 text-left">Quantity</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Requested At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pendingRequests.map((req) => (
                      <tr
                        key={req.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium">{req.item_type}</td>
                        <td className="px-4 py-3">{req.quantity}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              req.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : req.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{formatDate(req.requested_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Given Items Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Given Items to Staff
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-calPolyGreen text-white">
                    <th className="px-4 py-3 text-left">Item</th>
                    <th className="px-4 py-3 text-left">Quantity</th>
                    <th className="px-4 py-3 text-left">Given At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {givenItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium">{item.item_type}</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">{formatDate(item.given_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Return Requests Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Pending Return Requests
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-calPolyGreen text-white">
                    <th className="px-4 py-3 text-left">Item</th>
                    <th className="px-4 py-3 text-left">Quantity</th>
                    <th className="px-4 py-3 text-left">Requested By</th>
                    <th className="px-4 py-3 text-left">Requested At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {returnRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium">{req.item_type}</td>
                      <td className="px-4 py-3">{req.quantity}</td>
                      <td className="px-4 py-3">{req.staff_name}</td>
                      <td className="px-4 py-3">{formatDate(req.requested_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClerkReportDashboard;
