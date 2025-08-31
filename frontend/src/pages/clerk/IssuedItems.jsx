import React, { useState, useEffect } from "react";
import axios from "axios";

const IssuedItems = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    RequestID: "",
    StaffID: "",
    ItemID: "",
    UnitID: "",
    Quantity: "",
    UnitPriceBirr: "",
    UnitPriceCent: "",
    BalanceQty: "",
    Remark: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all issued/returned items
  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clerk/records");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch records.");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle issue submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/api/clerk/issue", formData);
      setFormData({
        RequestID: "",
        StaffID: "",
        ItemID: "",
        UnitID: "",
        Quantity: "",
        UnitPriceBirr: "",
        UnitPriceCent: "",
        BalanceQty: "",
        Remark: ""
      });
      fetchRecords(); // refresh list
    } catch (err) {
      console.error(err);
      setError("Failed to issue item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Issue Item to Staff</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Issue Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md p-4 rounded">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="font-medium mb-1">{key}</label>
              <input
                type={key.toLowerCase().includes("price") || key.toLowerCase().includes("quantity") ? "number" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                required
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Issuing..." : "Issue Item"}
        </button>
      </form>

      {/* Issued Items Table */}
      <h3 className="text-xl font-semibold mb-2">Issued / Returned Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {["FormID", "RequestID", "StaffID", "ItemID", "UnitID", "ActionType", "Quantity", "UnitPriceBirr", "UnitPriceCent", "BalanceQty", "Remark", "ActionDate"].map((col) => (
                <th key={col} className="border px-2 py-1 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.FormID} className="hover:bg-gray-50">
                {Object.values(record).map((val, i) => (
                  <td key={i} className="border px-2 py-1">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ Make sure to use default export
export default IssuedItems;
