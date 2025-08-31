import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClerkReportDashboard = () => {
  // Cal Poly Green color palette
  const calPolyGreen = "#154734";
  const calPolyGold = "#C69214";
  const calPolyLightGreen = "#8A9A5B";

  const [data, setData] = useState({
    pendingRequests: [],
    pendingReturns: [],
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pendingRequestsRes, pendingReturnsRes, itemsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/requests/clerk/pending"),
          axios.get("http://localhost:5000/api/pending-returns"),
          axios.get("http://localhost:5000/api/items/items"),
        ]);

        setData({
          pendingRequests: pendingRequestsRes.data,
          pendingReturns: pendingReturnsRes.data,
          items: itemsRes.data,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateBarChartData = (dataset, label, backgroundColor) => {
    const categories = dataset.map((item) => item.category || item.type || "Item");
    const values = dataset.map((item) => item.count || item.quantity || 1);

    return {
      labels: categories,
      datasets: [
        {
          label,
          data: values,
          backgroundColor,
          borderColor: calPolyGreen,
          borderWidth: 1,
        },
      ],
    };
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Clerk Dashboard Statistics",
        font: { size: 16, weight: "bold" },
        color: calPolyGreen,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.1)" },
        ticks: { color: calPolyGreen },
      },
      x: {
        grid: { display: false },
        ticks: { color: calPolyGreen },
      },
    },
  };

  const exportToCSV = () => {
    const allData = [
      ...data.pendingRequests.map((item) => ({ ...item, type: "Pending Request" })),
      ...data.pendingReturns.map((item) => ({ ...item, type: "Pending Return" })),
      ...data.items.map((item) => ({ ...item, type: "Item" })),
    ];
    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clerk Report");
    XLSX.writeFile(workbook, "clerk_report.csv", { bookType: "csv" });
  };

  const exportToExcel = () => {
    const allData = [
      ...data.pendingRequests.map((item) => ({ ...item, type: "Pending Request" })),
      ...data.pendingReturns.map((item) => ({ ...item, type: "Pending Return" })),
      ...data.items.map((item) => ({ ...item, type: "Item" })),
    ];
    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clerk Report");
    XLSX.writeFile(workbook, "clerk_report.xlsx");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-b-4 border-calPolyGreen w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center mt-10">
        Error loading data: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-4xl font-bold mb-2" style={{ color: calPolyGreen }}>
          Clerk Report Dashboard
        </h1>
        <div className="flex gap-2">
          <button
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded"
            onClick={exportToCSV}
          >
            Export CSV
          </button>
          <button
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
            onClick={exportToExcel}
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2" style={{ color: calPolyGreen }}>
            Pending Requests
          </h2>
          <Bar
            data={generateBarChartData(data.pendingRequests, "Pending Requests", calPolyGreen)}
            options={barChartOptions}
          />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2" style={{ color: calPolyGreen }}>
            Pending Returns
          </h2>
          <Bar
            data={generateBarChartData(data.pendingReturns, "Pending Returns", calPolyGold)}
            options={barChartOptions}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2" style={{ color: calPolyGreen }}>
          Inventory Items
        </h2>
        <Bar
          data={generateBarChartData(data.items, "Items", calPolyLightGreen)}
          options={{
            ...barChartOptions,
            scales: {
              ...barChartOptions.scales,
              x: { ...barChartOptions.scales.x, ticks: { autoSkip: false, maxRotation: 90, minRotation: 90 } },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ClerkReportDashboard;
