// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BoxIcon,
//   ClipboardListIcon,
//   RefreshCcwIcon,
// } from "lucide-react";

// const calPolyGreen = "#154734";
// const calPolyGold = "#C4820E";

// const ClerkReportDashboard = () => {
//   const [items, setItems] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [pendingReturns, setPendingReturns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         setLoading(true);
//         const [itemsRes, requestsRes, returnsRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/items/items"),
//           axios.get("http://localhost:5000/api/requests/clerk/pending"),
//           axios.get("http://localhost:5000/api/pending-returns"),
//         ]);
//         setItems(itemsRes.data || []);
//         setPendingRequests(requestsRes.data || []);
//         setPendingReturns(returnsRes.data || []);
//       } catch (err) {
//         setError("Failed to fetch report data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReports();
//   }, []);

//   if (loading) return <p className="p-4">Loading report data...</p>;
//   if (error) return <p className="p-4 text-red-600">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <aside
//         className="w-64 bg-green-900 text-white flex flex-col p-4"
//         style={{ backgroundColor: calPolyGreen }}
//       >
//         <h2 className="text-xl font-bold mb-6 text-center">Clerk Dashboard</h2>
//         <nav className="flex flex-col gap-4">
//           <a href="#items" className="flex items-center gap-2 hover:text-yellow-400">
//             <BoxIcon size={18} /> Items
//           </a>
//           <a href="#pending-requests" className="flex items-center gap-2 hover:text-yellow-400">
//             <ClipboardListIcon size={18} /> Pending Requests
//           </a>
//           <a href="#pending-returns" className="flex items-center gap-2 hover:text-yellow-400">
//             <RefreshCcwIcon size={18} /> Pending Returns
//           </a>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Clerk Report</h1>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-2xl shadow-md p-6">
//             <h3 className="text-gray-600">Total Items</h3>
//             <p className="text-3xl font-bold text-green-700">{items.length}</p>
//           </div>
//           <div className="bg-white rounded-2xl shadow-md p-6">
//             <h3 className="text-gray-600">Pending Requests</h3>
//             <p className="text-3xl font-bold text-yellow-600">{pendingRequests.length}</p>
//           </div>
//           <div className="bg-white rounded-2xl shadow-md p-6">
//             <h3 className="text-gray-600">Pending Returns</h3>
//             <p className="text-3xl font-bold text-red-600">{pendingReturns.length}</p>
//           </div>
//         </div>

//         {/* Items Table */}
//         <section id="items" className="mb-10">
//           <h2 className="text-xl font-bold mb-4">Items</h2>
//           <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
//             <table className="w-full table-auto">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   <th className="p-3 text-left">Item Name</th>
//                   <th className="p-3 text-left">Category</th>
//                   <th className="p-3 text-left">Quantity</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item) => (
//                   <tr key={item.id} className="border-t">
//                     <td className="p-3">{item.name}</td>
//                     <td className="p-3">{item.category}</td>
//                     <td className="p-3">{item.quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* Pending Requests Table */}
//         <section id="pending-requests" className="mb-10">
//           <h2 className="text-xl font-bold mb-4">Pending Requests</h2>
//           <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
//             <table className="w-full table-auto">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   <th className="p-3 text-left">Request ID</th>
//                   <th className="p-3 text-left">Staff</th>
//                   <th className="p-3 text-left">Item</th>
//                   <th className="p-3 text-left">Quantity</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pendingRequests.map((req) => (
//                   <tr key={req.id} className="border-t">
//                     <td className="p-3">{req.id}</td>
//                     <td className="p-3">{req.staffName}</td>
//                     <td className="p-3">{req.itemName}</td>
//                     <td className="p-3">{req.quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* Pending Returns Table */}
//         <section id="pending-returns">
//           <h2 className="text-xl font-bold mb-4">Pending Returns</h2>
//           <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
//             <table className="w-full table-auto">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   <th className="p-3 text-left">Return ID</th>
//                   <th className="p-3 text-left">Staff</th>
//                   <th className="p-3 text-left">Item</th>
//                   <th className="p-3 text-left">Quantity</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pendingReturns.map((ret) => (
//                   <tr key={ret.id} className="border-t">
//                     <td className="p-3">{ret.id}</td>
//                     <td className="p-3">{ret.staffName}</td>
//                     <td className="p-3">{ret.itemName}</td>
//                     <td className="p-3">{ret.quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default ClerkReportDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ClipboardList, RefreshCw, Download, Printer, FileText } from "lucide-react";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Footer from '../../components/Footer/Footer'; // Adjust path as needed
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Cal Poly color scheme for professional look
const CAL_POLY_GREEN = '#1E4D2B';
const CAL_POLY_GOLD = '#C28E0E';
const CAL_POLY_LIGHT_GREEN = '#3D7C47';
const CAL_POLY_DARK_GREEN = '#154734';

const ClerkReportDashboard = () => {
  const [items, setItems] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingReturns, setPendingReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [itemsRes, requestsRes, returnsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/items/items"),
        axios.get("http://localhost:5000/api/requests/clerk/pending"),
        axios.get("http://localhost:5000/api/pending-returns"),
      ]);

      setItems(itemsRes.data || []);
      setPendingRequests(requestsRes.data || []);
      setPendingReturns(returnsRes.data || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching clerk report data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Items sheet
    const itemsSheet = XLSX.utils.json_to_sheet(items.map(item => ({
      Name: item.name,
      'Serial No': item.serial_no,
      Quantity: item.quantity,
      Status: item.quantity > 0 ? 'In Stock' : 'Out of Stock'
    })));
    XLSX.utils.book_append_sheet(workbook, itemsSheet, "Items");

    // Pending Requests sheet
    const requestsSheet = XLSX.utils.json_to_sheet(pendingRequests.map(req => ({
      'Request ID': req.id,
      Staff: req.staffName,
      Item: req.itemName,
      Quantity: req.quantity,
      Date: new Date(req.createdAt).toLocaleDateString(),
      Status: 'Pending'
    })));
    XLSX.utils.book_append_sheet(workbook, requestsSheet, "Pending Requests");

    // Pending Returns sheet
    const returnsSheet = XLSX.utils.json_to_sheet(pendingReturns.map(ret => ({
      'Return ID': ret.id,
      Staff: ret.staffName,
      Item: ret.itemName,
      Quantity: ret.quantity,
      Date: new Date(ret.createdAt).toLocaleDateString(),
      Status: 'Pending'
    })));
    XLSX.utils.book_append_sheet(workbook, returnsSheet, "Pending Returns");

    XLSX.writeFile(workbook, `Clerk_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleDateString();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(CAL_POLY_GREEN);
    doc.text('Clerk Report Dashboard', 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on: ${dateStr}`, 14, 28);

    // Executive Summary
    doc.setFontSize(16);
    doc.setTextColor(CAL_POLY_DARK_GREEN);
    doc.text('Executive Summary', 14, 40);
    doc.setFontSize(11);
    doc.setTextColor(80);
    doc.text(`Total Items: ${items.length}`, 14, 48);
    doc.text(`Pending Requests: ${pendingRequests.length}`, 14, 56);
    doc.text(`Pending Returns: ${pendingReturns.length}`, 14, 64);

    // Items Table
    doc.setFontSize(14);
    doc.setTextColor(CAL_POLY_GREEN);
    doc.text('Items in Stock', 14, 76);
    doc.autoTable({
      startY: 81,
      head: [['Name', 'Serial No', 'Quantity', 'Status']],
      body: items.map(item => [item.name, item.serial_no, item.quantity, item.quantity > 0 ? 'In Stock' : 'Out of Stock']),
      theme: 'grid',
      headStyles: { fillColor: [30, 77, 43], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [243, 244, 246] },
      styles: { fontSize: 9, cellPadding: 3 }
    });

    // Pending Requests Table
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(CAL_POLY_GREEN);
    doc.text('Pending Requests', 14, 20);
    doc.autoTable({
      startY: 25,
      head: [['Request ID', 'Staff', 'Item', 'Quantity', 'Date', 'Status']],
      body: pendingRequests.map(req => [req.id, req.staffName, req.itemName, req.quantity, new Date(req.createdAt).toLocaleDateString(), 'Pending']),
      theme: 'grid',
      headStyles: { fillColor: [194, 142, 14], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [243, 244, 246] },
      styles: { fontSize: 9, cellPadding: 3 }
    });

    // Pending Returns Table
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(CAL_POLY_GREEN);
    doc.text('Pending Returns', 14, 20);
    doc.autoTable({
      startY: 25,
      head: [['Return ID', 'Staff', 'Item', 'Quantity', 'Date', 'Status']],
      body: pendingReturns.map(ret => [ret.id, ret.staffName, ret.itemName, ret.quantity, new Date(ret.createdAt).toLocaleDateString(), 'Pending']),
      theme: 'grid',
      headStyles: { fillColor: [61, 124, 71], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [243, 244, 246] },
      styles: { fontSize: 9, cellPadding: 3 }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount}`, 190, 285, { align: 'right' });
      doc.text('Inventory Management System - Report', 14, 285);
    }

    doc.save(`Clerk_Report_${dateStr.replace(/\//g, '-')}.pdf`);
  };

  const exportToCSV = (data, filename) => {
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(item => Object.values(item).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  // Chart Data Preparation
  const categoryDistribution = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const summaryData = {
    labels: ['Items', 'Pending Requests', 'Pending Returns'],
    datasets: [
      {
        label: 'Counts',
        data: [items.length, pendingRequests.length, pendingReturns.length],
        backgroundColor: CAL_POLY_GREEN + 'B3',
        borderColor: CAL_POLY_GREEN,
        borderWidth: 2,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(categoryDistribution),
    datasets: [
      {
        data: Object.values(categoryDistribution),
        backgroundColor: [
          CAL_POLY_GREEN + 'B3',
          CAL_POLY_GOLD + 'B3',
          CAL_POLY_LIGHT_GREEN + 'B3',
          CAL_POLY_DARK_GREEN + 'B3',
        ],
        borderColor: [
          CAL_POLY_GREEN,
          CAL_POLY_GOLD,
          CAL_POLY_LIGHT_GREEN,
          CAL_POLY_DARK_GREEN,
        ],
        borderWidth: 2,
      },
    ],
  };

  const trendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Simulated; replace with real if available
    datasets: [
      {
        label: 'Requests',
        data: [5, 10, pendingRequests.length - 2, pendingRequests.length],
        borderColor: CAL_POLY_GOLD,
        backgroundColor: CAL_POLY_GOLD + '4D',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Returns',
        data: [3, 6, pendingReturns.length - 1, pendingReturns.length],
        borderColor: CAL_POLY_LIGHT_GREEN,
        backgroundColor: CAL_POLY_LIGHT_GREEN + '4D',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="animate-spin w-12 h-12 text-[#1E4D2B]" />
        <span className="ml-4 text-xl font-semibold text-gray-800">Loading Reports...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="p-6 text-red-700 font-bold bg-red-100 rounded-xl shadow-md">{error}</div>
        <Button
          onClick={handleRefresh}
          className="mt-6 px-6 py-3 bg-[#1E4D2B] text-white rounded-xl hover:bg-[#154734] flex items-center text-base shadow-lg"
        >
          <RefreshCw className="w-5 h-5 mr-3" />
          Retry Load
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1E4D2B]">📊 Clerk Report Dashboard</h1>
          <p className="text-base text-gray-600 mt-2">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleRefresh}
            disabled={loading}
            className={`px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 flex items-center text-base shadow ${loading ? 'opacity-70' : ''}`}
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={exportToExcel}
            className="px-4 py-2 bg-[#1E4D2B] text-white rounded-xl hover:bg-[#154734] flex items-center text-base shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Excel
          </Button>
          <Button
            onClick={exportToPDF}
            className="px-4 py-2 bg-[#C28E0E] text-white rounded-xl hover:bg-[#B27D0D] flex items-center text-base shadow-lg"
          >
            <FileText className="w-5 h-5 mr-2" />
            PDF
          </Button>
          <Button
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#3D7C47] text-white rounded-xl hover:bg-[#2E5D36] flex items-center text-base shadow-lg"
          >
            <Printer className="w-5 h-5 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-2xl rounded-3xl border-l-8 border-[#1E4D2B] hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-base text-gray-600">Total Items</p>
              <h2 className="text-3xl font-bold text-[#1E4D2B]">{items.length}</h2>
              <p className="text-sm text-gray-500 mt-2">Across {Object.keys(categoryDistribution).length} categories</p>
            </div>
            <Package className="w-12 h-12 text-[#1E4D2B]" />
          </CardContent>
        </Card>
        <Card className="shadow-2xl rounded-3xl border-l-8 border-[#C28E0E] hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-base text-gray-600">Pending Requests</p>
              <h2 className="text-3xl font-bold text-[#C28E0E]">{pendingRequests.length}</h2>
              <p className="text-sm text-gray-500 mt-2">From {new Set(pendingRequests.map(r => r.staffName)).size} staff</p>
            </div>
            <ClipboardList className="w-12 h-12 text-[#C28E0E]" />
          </CardContent>
        </Card>
        <Card className="shadow-2xl rounded-3xl border-l-8 border-[#3D7C47] hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-base text-gray-600">Pending Returns</p>
              <h2 className="text-3xl font-bold text-[#3D7C47]">{pendingReturns.length}</h2>
              <p className="text-sm text-gray-500 mt-2">From {new Set(pendingReturns.map(r => r.staffName)).size} staff</p>
            </div>
            <RefreshCw className="w-12 h-12 text-[#3D7C47]" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 shadow-2xl rounded-3xl bg-white">
          <h3 className="font-bold text-lg mb-4 text-[#1E4D2B]">Summary Overview (Bar Chart)</h3>
          <div className="h-80">
            <Bar
              data={summaryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 1500, easing: 'easeInOutQuart' },
                plugins: {
                  legend: { position: 'top', labels: { color: '#374151' } },
                  title: { display: true, text: 'Key Metrics', color: '#1E4D2B' },
                },
                scales: {
                  y: { beginAtZero: true, grid: { color: '#E5E7EB' } },
                  x: { grid: { display: false } },
                },
              }}
            />
          </div>
        </Card>
        <Card className="p-6 shadow-2xl rounded-3xl bg-white">
          <h3 className="font-bold text-lg mb-4 text-[#1E4D2B]">Item Category Distribution (Pie Chart)</h3>
          <div className="h-80">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 1500, easing: 'easeInOutQuart' },
                plugins: {
                  legend: { position: 'right', labels: { color: '#374151', boxWidth: 12 } },
                  title: { display: true, text: 'Categories Breakdown', color: '#1E4D2B' },
                },
              }}
            />
          </div>
        </Card>
        <Card className="p-6 shadow-2xl rounded-3xl bg-white">
          <h3 className="font-bold text-lg mb-4 text-[#1E4D2B]">Trends Over Time (Line Chart)</h3>
          <div className="h-80">
            <Line
              data={trendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 1500, easing: 'easeInOutQuart' },
                plugins: {
                  legend: { position: 'top', labels: { color: '#374151' } },
                  title: { display: true, text: 'Weekly Trends', color: '#1E4D2B' },
                },
                scales: {
                  y: { beginAtZero: true, grid: { color: '#E5E7EB' } },
                  x: { grid: { display: false } },
                },
              }}
            />
          </div>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="space-y-12">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#1E4D2B]">📦 Items in Stock</h2>
            <Button
              onClick={() => exportToCSV(items.map(item => ({
                Name: item.name,
                'Serial No': item.serial_no,
                Quantity: item.quantity,
                Status: item.quantity > 0 ? 'In Stock' : 'Out of Stock'
              })), 'items.csv')}
              className="text-base text-[#1E4D2B] hover:text-[#154734] flex items-center bg-transparent"
            >
              <Download className="w-5 h-5 mr-2" />
              CSV
            </Button>
          </div>
          <div className="overflow-x-auto bg-white shadow-2xl rounded-3xl border border-gray-200">
            <table className="min-w-full text-base text-left divide-y divide-gray-200">
              <thead className="bg-[#1E4D2B] text-white">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Serial No</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.serial_no}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.quantity > 0 ? 'bg-[#1E4D2B] text-white' : 'bg-red-500 text-white'}`}>
                        {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#1E4D2B]">📝 Pending Requests</h2>
            <Button
              onClick={() => exportToCSV(pendingRequests.map(req => ({
                'Request ID': req.id,
                Staff: req.staffName,
                Item: req.itemName,
                Quantity: req.quantity,
                Date: new Date(req.createdAt).toLocaleDateString(),
                Status: 'Pending'
              })), 'pending_requests.csv')}
              className="text-base text-[#1E4D2B] hover:text-[#154734] flex items-center bg-transparent"
            >
              <Download className="w-5 h-5 mr-2" />
              CSV
            </Button>
          </div>
          <div className="overflow-x-auto bg-white shadow-2xl rounded-3xl border border-gray-200">
            <table className="min-w-full text-base text-left divide-y divide-gray-200">
              <thead className="bg-[#C28E0E] text-white">
                <tr>
                  <th className="px-6 py-4">Request ID</th>
                  <th className="px-6 py-4">Staff</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{req.id}</td>
                    <td className="px-6 py-4">{req.staffName}</td>
                    <td className="px-6 py-4">{req.itemName}</td>
                    <td className="px-6 py-4">{req.quantity}</td>
                    <td className="px-6 py-4">{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#C28E0E] text-white">
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#1E4D2B]">🔄 Pending Returns</h2>
            <Button
              onClick={() => exportToCSV(pendingReturns.map(ret => ({
                'Return ID': ret.id,
                Staff: ret.staffName,
                Item: ret.itemName,
                Quantity: ret.quantity,
                Date: new Date(ret.createdAt).toLocaleDateString(),
                Status: 'Pending'
              })), 'pending_returns.csv')}
              className="text-base text-[#1E4D2B] hover:text-[#154734] flex items-center bg-transparent"
            >
              <Download className="w-5 h-5 mr-2" />
              CSV
            </Button>
          </div>
          <div className="overflow-x-auto bg-white shadow-2xl rounded-3xl border border-gray-200">
            <table className="min-w-full text-base text-left divide-y divide-gray-200">
              <thead className="bg-[#3D7C47] text-white">
                <tr>
                  <th className="px-6 py-4">Return ID</th>
                  <th className="px-6 py-4">Staff</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingReturns.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((ret) => (
                  <tr key={ret.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{ret.id}</td>
                    <td className="px-6 py-4">{ret.staffName}</td>
                    <td className="px-6 py-4">{ret.itemName}</td>
                    <td className="px-6 py-4">{ret.quantity}</td>
                    <td className="px-6 py-4">{new Date(ret.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#3D7C47] text-white">
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ClerkReportDashboard;