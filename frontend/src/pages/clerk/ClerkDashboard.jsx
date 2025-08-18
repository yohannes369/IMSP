// import React from "react";
// import Sidebar from "./Sidebar";

// const ClerkDashboard = () => {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold mb-6">Welcome, Clerk!</h1>

//         <div className="grid grid-cols-3 gap-6">
//           <div className="p-4 bg-white rounded shadow">Total Items</div>
//           <div className="p-4 bg-white rounded shadow">Pending Requests</div>
//           <div className="p-4 bg-white rounded shadow">Completed Tasks</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClerkDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ClipboardList, CheckCircle } from "lucide-react";

// Cal Poly color scheme for professional look
const CAL_POLY_GREEN = '#1E4D2B';
const CAL_POLY_GOLD = '#C28E0E';
const CAL_POLY_LIGHT_GREEN = '#3D7C47';
const CAL_POLY_DARK_GREEN = '#154734';

const ClerkDashboard = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [pendingReturns, setPendingReturns] = useState(0);
  const [totalRequestedItems, setTotalRequestedItems] = useState(0);
  const [pendingItems, setPendingItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      setTotalItems(itemsRes.data.length || 0);
      setPendingRequests(requestsRes.data.length || 0);
      setPendingReturns(returnsRes.data.length || 0);

      // Calculate total requested items and pending items
      const totalReq = requestsRes.data.reduce((sum, req) => sum + (req.quantity || 0), 0);
      const pendingItemsCount = requestsRes.data.reduce((sum, req) => sum + (req.quantity || 0), 0);
      setTotalRequestedItems(totalReq);
      setPendingItems(pendingItemsCount);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin w-12 h-12 border-4 border-t-transparent border-[#1E4D2B] rounded-full"></div>
        <span className="ml-4 text-xl font-semibold text-gray-800">Loading Dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="p-6 text-red-700 font-bold bg-red-100 rounded-xl shadow-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-[#1E4D2B] text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen font-sans">
        <h1 className="text-3xl font-extrabold text-[#1E4D2B] mb-8">Welcome, Clerk!</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <Card className="shadow-xl rounded-2xl border-l-8 border-[#1E4D2B] hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-base text-gray-600 font-medium">Total Items</p>
                <h2 className="text-3xl font-bold text-[#1E4D2B]">{totalItems}</h2>
              </div>
              <Package className="w-12 h-12 text-[#1E4D2B]" />
            </CardContent>
          </Card>
          <Card className="shadow-xl rounded-2xl border-l-8 border-[#C28E0E] hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-base text-gray-600 font-medium">Pending Requests</p>
                <h2 className="text-3xl font-bold text-[#C28E0E]">{pendingRequests}</h2>
              </div>
              <ClipboardList className="w-12 h-12 text-[#C28E0E]" />
            </CardContent>
          </Card>
          <Card className="shadow-xl rounded-2xl border-l-8 border-[#3D7C47] hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-base text-gray-600 font-medium">Pending Returns</p>
                <h2 className="text-3xl font-bold text-[#3D7C47]">{pendingReturns}</h2>
              </div>
              <CheckCircle className="w-12 h-12 text-[#3D7C47]" />
            </CardContent>
          </Card>
          <Card className="shadow-xl rounded-2xl border-l-8 border-[#154734] hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-base text-gray-600 font-medium">Total Requested Items</p>
                <h2 className="text-3xl font-bold text-[#154734]">{totalRequestedItems}</h2>
              </div>
              <ClipboardList className="w-12 h-12 text-[#154734]" />
            </CardContent>
          </Card>
          <Card className="shadow-xl rounded-2xl border-l-8 border-[#C28E0E] hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-base text-gray-600 font-medium">Pending Items</p>
                <h2 className="text-3xl font-bold text-[#C28E0E]">{pendingItems}</h2>
              </div>
              <ClipboardList className="w-12 h-12 text-[#C28E0E]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClerkDashboard;