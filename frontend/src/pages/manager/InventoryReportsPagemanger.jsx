import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryReportsPagemanager = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all reports
  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reports");
      setReports(response.data);
    } catch (err) {
      console.error("Fetch Reports Error:", err);
      setError("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading reports...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  // Group reports by date (YYYY-MM-DD)
  const reportsByDate = reports.reduce((acc, report) => {
    const date = report.created_at ? report.created_at.split("T")[0] : "Unknown Date";
    if (!acc[date]) acc[date] = [];
    acc[date].push(report);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Inventory Reports</h1>

      {Object.keys(reportsByDate).map((date) => (
        <div key={date} className="mb-8 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Reports on {date}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-green-100">
                <tr>
                  <th className="border px-4 py-2 text-left text-green-700">Item ID</th>
                  <th className="border px-4 py-2 text-left text-green-700">Item Name</th>
                  <th className="border px-4 py-2 text-left text-green-700">Model</th>
                  <th className="border px-4 py-2 text-right text-green-700">Available Qty</th>
                  <th className="border px-4 py-2 text-right text-green-700">Counted Qty</th>
                  <th className="border px-4 py-2 text-right text-green-700">Difference</th>
                  <th className="border px-4 py-2 text-left text-green-700">Counter Names</th>
                  <th className="border px-4 py-2 text-left text-green-700">Created At</th>
                </tr>
              </thead>
              <tbody>
                {reportsByDate[date].map((report) => (
                  <tr key={report.item_id} className="hover:bg-green-50 transition-colors">
                    <td className="border px-4 py-2">{report.item_id}</td>
                    <td className="border px-4 py-2">{report.item_name}</td>
                    <td className="border px-4 py-2">{report.model}</td>
                    <td className="border px-4 py-2 text-right">{report.available_qty}</td>
                    <td className="border px-4 py-2 text-right">{report.counted_qty}</td>
                    <td
                      className={`border px-4 py-2 text-right font-semibold ${
                        report.difference > 0
                          ? "text-green-600"
                          : report.difference < 0
                          ? "text-red-600"
                          : "text-gray-700"
                      }`}
                    >
                      {report.difference}
                    </td>
                    <td className="border px-4 py-2">{report.counter_names}</td>
                    <td className="border px-4 py-2">
                      {new Date(report.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryReportsPagemanager;
