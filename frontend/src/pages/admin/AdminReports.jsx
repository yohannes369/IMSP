// // src/pages/admin/AdminReport.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";

// const AdminReport = () => {
//   const [users, setUsers] = useState([]);

//   // Fetch user data
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/users"); // use your API
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   // Group users by role for charts
//   const roleData = users.reduce((acc, user) => {
//     acc[user.role] = (acc[user.role] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = Object.keys(roleData).map((role) => ({
//     name: role,
//     value: roleData[role],
//   }));

//   // Export CSV
//   const exportCSV = () => {
//     const header = ["ID", "Name", "Email", "Role", "Status"];
//     const rows = users.map((u) => [u.id, u.name, u.email, u.role, u.isActive ? "Active" : "Inactive"]);
//     const csv = [header, ...rows].map((e) => e.join(",")).join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "users_report.csv";
//     a.click();
//   };

//   // Export Excel
//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(users);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
//     XLSX.writeFile(workbook, "users_report.xlsx");
//   };

//   // Export PDF
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Admin Users Report", 14, 10);
//     const tableColumn = ["ID", "Name", "Email", "Role", "Status"];
//     const tableRows = users.map((u) => [
//       u.id,
//       u.name,
//       u.email,
//       u.role,
//       u.isActive ? "Active" : "Inactive",
//     ]);
//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 20,
//     });
//     doc.save("users_report.pdf");
//   };

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Admin Report</h2>

//       {/* Action buttons */}
//       <div className="flex gap-4 mb-6">
//         <button onClick={exportCSV} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Export CSV
//         </button>
//         <button onClick={exportExcel} className="bg-green-500 text-white px-4 py-2 rounded">
//           Export Excel
//         </button>
//         <button onClick={exportPDF} className="bg-red-500 text-white px-4 py-2 rounded">
//           Export PDF
//         </button>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="flex justify-center">
//           <PieChart width={300} height={300}>
//             <Pie
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               outerRadius={120}
//               fill="#8884d8"
//               dataKey="value"
//               label
//             >
//               {chartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         <div>
//           <BarChart width={400} height={300} data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="value" fill="#8884d8" />
//           </BarChart>
//         </div>
//       </div>

//       {/* User Table */}
//       <div className="mt-8 overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Role</th>
//               <th className="border p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id}>
//                 <td className="border p-2">{u.id}</td>
//                 <td className="border p-2">{u.name}</td>
//                 <td className="border p-2">{u.email}</td>
//                 <td className="border p-2">{u.role}</td>
//                 <td className="border p-2">{u.isActive ? "Active" : "Inactive"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminReport;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import Footer from "../../components/Footer/Footer";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";
import { FiDownload, FiFileText, FiFile, FiPieChart } from "react-icons/fi";

const AdminReport = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Summary statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive).length;
  const inactiveUsers = totalUsers - activeUsers;

  // Users per role
  const roleData = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const roleChartData = Object.keys(roleData).map(role => ({
    name: role,
    value: roleData[role],
  }));

  const statusChartData = [
    { name: "Active", value: activeUsers },
    { name: "Inactive", value: inactiveUsers },
  ];

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

  // Export functions
  const exportCSV = () => {
    const header = ["ID", "Name", "Email", "Phone", "Role", "Status"];
    const rows = users.map(u => [
      u.id,
      `${u.firstName || ''} ${u.lastName || ''}`.trim(),
      u.email,
      u.phone || "-",
      u.role,
      u.isActive ? "Active" : "Inactive",
    ]);
    const csv = [header, ...rows].map(e => e.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportExcel = () => {
    const excelData = users.map(u => ({
      ID: u.id,
      Name: `${u.firstName || ''} ${u.lastName || ''}`.trim(),
      Email: u.email,
      Phone: u.phone || "-",
      Role: u.role,
      Status: u.isActive ? "Active" : "Inactive",
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users_report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(16, 185, 129); // Emerald-500
    doc.text("User Management Report", 105, 15, { align: "center" });
    
    // Summary
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Report Generated: ${new Date().toLocaleString()}`, 14, 25);
    
    // Summary boxes
    doc.setFillColor(239, 246, 255); // Blue-50
    doc.rect(14, 35, 60, 20, "F");
    doc.setTextColor(29, 78, 216); // Blue-700
    doc.text("Total Users", 20, 45);
    doc.setTextColor(0, 0, 0);
    doc.text(totalUsers.toString(), 50, 45);
    
    doc.setFillColor(236, 253, 245); // Green-50
    doc.rect(80, 35, 60, 20, "F");
    doc.setTextColor(5, 150, 105); // Green-700
    doc.text("Active Users", 86, 45);
    doc.setTextColor(0, 0, 0);
    doc.text(activeUsers.toString(), 116, 45);
    
    doc.setFillColor(254, 242, 242); // Red-50
    doc.rect(146, 35, 60, 20, "F");
    doc.setTextColor(220, 38, 38); // Red-700
    doc.text("Inactive Users", 152, 45);
    doc.setTextColor(0, 0, 0);
    doc.text(inactiveUsers.toString(), 182, 45);
    
    // Table
    const tableColumn = ["ID", "Name", "Email", "Role", "Status"];
    const tableRows = users.map(u => [
      u.id,
      `${u.firstName || ''} ${u.lastName || ''}`.trim(),
      u.email,
      u.role,
      u.isActive ? "Active" : "Inactive",
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      headStyles: {
        fillColor: [16, 185, 129], // Emerald-500
        textColor: [255, 255, 255],
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 8
      },
      alternateRowStyles: {
        fillColor: [243, 244, 246] // Gray-100
      },
      margin: { top: 60 }
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Generated by Admin Dashboard", 105, doc.internal.pageSize.height - 10, { align: "center" });

    doc.save("users_report.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Report Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="text-gray-500 font-medium">Total Users</h3>
            <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-emerald-500">
            <h3 className="text-gray-500 font-medium">Active Users</h3>
            <p className="text-2xl font-bold text-emerald-600">{activeUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
            <h3 className="text-gray-500 font-medium">Inactive Users</h3>
            <p className="text-2xl font-bold text-red-600">{inactiveUsers}</p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={exportCSV}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
          >
            <FiFileText className="mr-2" />
            Export CSV
          </button>
          <button
            onClick={exportExcel}
            className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md shadow-sm transition-colors"
          >
            <FiFile className="mr-2" />
            Export Excel
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-sm transition-colors"
          >
            <FiDownload className="mr-2" />
            Export PDF
          </button>
          <button
            onClick={fetchUsers}
            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md shadow-sm transition-colors"
          >
            <FiPieChart className="mr-2" />
            Refresh Data
          </button>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Roles Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Users by Role</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {roleChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Users by Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell key="cell-active" fill="#10B981" />
                    <Cell key="cell-inactive" fill="#EF4444" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.firstName || ''} {user.lastName || ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'manager' ? 'bg-yellow-100 text-yellow-800' :
                          user.role === 'staff' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AdminReport;