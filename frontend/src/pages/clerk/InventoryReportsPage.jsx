
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const InventoryReportsPage = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all reports
//   const fetchReports = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/reports");
//       setReports(response.data);
//     } catch (err) {
//       console.error("Fetch Reports Error:", err);
//       setError("Failed to fetch reports");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   if (loading) return <p>Loading reports...</p>;
//   if (error) return <p>{error}</p>;

//   // Group reports by date (YYYY-MM-DD)
//   const reportsByDate = reports.reduce((acc, report) => {
//     const date = report.created_at ? report.created_at.split("T")[0] : "Unknown Date";
//     if (!acc[date]) acc[date] = [];
//     acc[date].push(report);
//     return acc;
//   }, {});

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Inventory Reports</h1>

//       {/* Display reports grouped by created_at date */}
//       {Object.keys(reportsByDate).map((date) => (
//         <div key={date} className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">Reports on {date}</h2>
//           <table className="min-w-full border border-gray-300">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="border px-4 py-2">Report ID</th>
//                 <th className="border px-4 py-2">Item ID</th>
//                 <th className="border px-4 py-2">Item Name</th>
//                 <th className="border px-4 py-2">Model</th>
//                 <th className="border px-4 py-2">Available Qty</th>
//                 <th className="border px-4 py-2">Counted Qty</th>
//                 <th className="border px-4 py-2">Difference</th>
//                 <th className="border px-4 py-2">Counter Names</th>
//                 <th className="border px-4 py-2">Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportsByDate[date].map((report) => (
//                 <tr key={report.report_id}>
//                   <td className="border px-4 py-2">{report.report_id}</td>
//                   <td className="border px-4 py-2">{report.item_id}</td>
//                   <td className="border px-4 py-2">{report.item_name}</td>
//                   <td className="border px-4 py-2">{report.model}</td>
//                   <td className="border px-4 py-2">{report.available_qty}</td>
//                   <td className="border px-4 py-2">{report.counted_qty}</td>
//                   <td className="border px-4 py-2">{report.difference}</td>
//                   <td className="border px-4 py-2">{report.counter_names}</td>
//                   <td className="border px-4 py-2">{new Date(report.created_at).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InventoryReportsPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiDownload,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiBarChart2,
  FiCalendar,
  FiPrinter
} from "react-icons/fi";

const InventoryReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [differenceFilter, setDifferenceFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [expandedDates, setExpandedDates] = useState({});
  const [selectedReports, setSelectedReports] = useState(new Set());

  // Fetch all reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/reports");
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (err) {
      console.error("Fetch Reports Error:", err);
      setError("Failed to fetch reports. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Filter reports based on search and filters
  useEffect(() => {
    let result = [...reports];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(report => 
        report.item_name?.toLowerCase().includes(term) ||
        report.model?.toLowerCase().includes(term) ||
        report.counter_names?.toLowerCase().includes(term) ||
        report.report_id?.toString().includes(term) ||
        report.item_id?.toString().includes(term)
      );
    }
    
    // Apply date filter
    if (dateFilter !== "all") {
      const today = new Date().toISOString().split('T')[0];
      result = result.filter(report => {
        const reportDate = report.created_at?.split('T')[0];
        if (dateFilter === "today") return reportDate === today;
        if (dateFilter === "week") {
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return new Date(reportDate) >= weekAgo;
        }
        if (dateFilter === "month") {
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return new Date(reportDate) >= monthAgo;
        }
        return true;
      });
    }
    
    // Apply difference filter
    if (differenceFilter !== "all") {
      result = result.filter(report => {
        if (differenceFilter === "match") return report.difference === 0;
        if (differenceFilter === "mismatch") return report.difference !== 0;
        if (differenceFilter === "over") return report.difference > 0;
        if (differenceFilter === "under") return report.difference < 0;
        return true;
      });
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredReports(result);
  }, [reports, searchTerm, dateFilter, differenceFilter, sortConfig]);

  // Request sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Toggle date group expansion
  const toggleDateGroup = (date) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  // Toggle report selection
  const toggleReportSelection = (reportId) => {
    const newSelection = new Set(selectedReports);
    if (newSelection.has(reportId)) {
      newSelection.delete(reportId);
    } else {
      newSelection.add(reportId);
    }
    setSelectedReports(newSelection);
  };

  // Select all reports in a date group
  const selectAllInDateGroup = (date, reports) => {
    const newSelection = new Set(selectedReports);
    const allSelected = reports.every(report => newSelection.has(report.report_id));
    
    reports.forEach(report => {
      if (allSelected) {
        newSelection.delete(report.report_id);
      } else {
        newSelection.add(report.report_id);
      }
    });
    
    setSelectedReports(newSelection);
  };

  // Export selected reports
  const exportReports = () => {
    if (selectedReports.size === 0) {
      alert("Please select reports to export.");
      return;
    }
    
    const selectedData = filteredReports.filter(report => 
      selectedReports.has(report.report_id)
    );
    
    const csvContent = [
      ["Report ID", "Item ID", "Item Name", "Model", "Available Qty", "Counted Qty", "Difference", "Counter Names", "Created At"],
      ...selectedData.map(report => [
        report.report_id,
        report.item_id,
        report.item_name,
        report.model,
        report.available_qty,
        report.counted_qty,
        report.difference,
        report.counter_names,
        new Date(report.created_at).toLocaleString()
      ])
    ].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "inventory_reports.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print reports
  const printReports = () => {
    window.print();
  };

  // Calculate summary statistics
  const calculateSummary = () => {
    const totalReports = filteredReports.length;
    const matchingReports = filteredReports.filter(r => r.difference === 0).length;
    const mismatchedReports = totalReports - matchingReports;
    const overCount = filteredReports.filter(r => r.difference > 0).length;
    const underCount = filteredReports.filter(r => r.difference < 0).length;
    
    return { totalReports, matchingReports, mismatchedReports, overCount, underCount };
  };

  const summary = calculateSummary();

  // Group reports by date (YYYY-MM-DD)
  const reportsByDate = filteredReports.reduce((acc, report) => {
    const date = report.created_at ? report.created_at.split("T")[0] : "Unknown Date";
    if (!acc[date]) acc[date] = [];
    acc[date].push(report);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading inventory reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
            <FiAlertCircle className="h-6 w-6 mx-auto mb-2" />
            <p className="font-bold">Error Loading Reports</p>
            <p className="mt-2">{error}</p>
            <button
              onClick={fetchReports}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FiBarChart2 className="h-8 w-8 text-green-600" />
                Inventory Reports
              </h1>
              <p className="text-gray-600 mt-2">
                Track and analyze inventory counts and discrepancies
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportReports}
                disabled={selectedReports.size === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${selectedReports.size === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
              >
                <FiDownload className="h-4 w-4" />
                Export Selected ({selectedReports.size})
              </button>
              <button
                onClick={printReports}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
              >
                <FiPrinter className="h-4 w-4" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold text-gray-800">{summary.totalReports}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiBarChart2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Matching Counts</p>
                <p className="text-2xl font-bold text-green-600">{summary.matchingReports}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Mismatched Counts</p>
                <p className="text-2xl font-bold text-red-600">{summary.mismatchedReports}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiAlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Over Counts</p>
                <p className="text-2xl font-bold text-amber-600">{summary.overCount}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <FiChevronUp className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Under Counts</p>
                <p className="text-2xl font-bold text-purple-600">{summary.underCount}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiChevronDown className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by item name, model, counter names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <FiCalendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                </select>
              </div>
              
              <div className="relative">
                <FiFilter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  value={differenceFilter}
                  onChange={(e) => setDifferenceFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Results</option>
                  <option value="match">Counts Match</option>
                  <option value="mismatch">Counts Mismatch</option>
                  <option value="over">Over Counted</option>
                  <option value="under">Under Counted</option>
                </select>
              </div>
              
              <button
                onClick={() => {
                  setSearchTerm("");
                  setDateFilter("all");
                  setDifferenceFilter("all");
                }}
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <FiX className="h-4 w-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Reports List */}
        {filteredReports.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <FiBarChart2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">No reports found</h3>
            <p className="text-gray-500 mt-2">
              {searchTerm || dateFilter !== "all" || differenceFilter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "No inventory reports have been generated yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.keys(reportsByDate).map((date) => {
              const dateReports = reportsByDate[date];
              const isExpanded = expandedDates[date] !== false; // Default to expanded
              const allSelected = dateReports.every(report => selectedReports.has(report.report_id));
              
              return (
                <div key={date} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Date Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleDateGroup(date)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {isExpanded ? (
                            <FiChevronUp className="h-5 w-5" />
                          ) : (
                            <FiChevronDown className="h-5 w-5" />
                          )}
                        </button>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {new Date(date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {dateReports.length} report{dateReports.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={() => selectAllInDateGroup(date, dateReports)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-700">Select all</label>
                        </div>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {dateReports.filter(r => r.difference === 0).length} matched
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reports Table */}
                  {isExpanded && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Select
                            </th>
                            <th 
                              scope="col" 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                              onClick={() => requestSort('item_name')}
                            >
                              <div className="flex items-center">
                                Item Name
                                {sortConfig.key === 'item_name' && (
                                  <span className="ml-1">
                                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                                  </span>
                                )}
                              </div>
                            </th>
                            <th 
                              scope="col" 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                              onClick={() => requestSort('model')}
                            >
                              <div className="flex items-center">
                                Model
                                {sortConfig.key === 'model' && (
                                  <span className="ml-1">
                                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                                  </span>
                                )}
                              </div>
                            </th>
                            <th 
                              scope="col" 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                              onClick={() => requestSort('available_qty')}
                            >
                              <div className="flex items-center">
                                Available
                                {sortConfig.key === 'available_qty' && (
                                  <span className="ml-1">
                                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                                  </span>
                                )}
                              </div>
                            </th>
                            <th 
                              scope="col" 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                              onClick={() => requestSort('counted_qty')}
                            >
                              <div className="flex items-center">
                                Counted
                                {sortConfig.key === 'counted_qty' && (
                                  <span className="ml-1">
                                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                                  </span>
                                )}
                              </div>
                            </th>
                            <th 
                              scope="col" 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                              onClick={() => requestSort('difference')}
                            >
                              <div className="flex items-center">
                                Difference
                                {sortConfig.key === 'difference' && (
                                  <span className="ml-1">
                                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                                  </span>
                                )}
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Counter Names
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {dateReports.map((report) => (
                            <tr key={report.report_id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  checked={selectedReports.has(report.report_id)}
                                  onChange={() => toggleReportSelection(report.report_id)}
                                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{report.item_name}</div>
                                <div className="text-sm text-gray-500">ID: {report.item_id}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {report.model}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {report.available_qty}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {report.counted_qty}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  report.difference === 0 
                                    ? 'bg-green-100 text-green-800' 
                                    : report.difference > 0 
                                      ? 'bg-amber-100 text-amber-800' 
                                      : 'bg-red-100 text-red-800'
                                }`}>
                                  {report.difference > 0 ? `+${report.difference}` : report.difference}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {report.counter_names}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(report.created_at).toLocaleTimeString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryReportsPage;