// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ManagerSidebar from './ManagerSidebar';
// import { Activity, Clock, CheckCircle, Users, AlertCircle } from 'lucide-react';

// const ManagerDashboard = () => {
//   const [stats, setStats] = useState({
//     pendingRequests: 0,
//     approvedRequests: 0,
//     activeStaff: 0,
//     recentActivities: []
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const [pendingRes, approvedRes, staffRes, activitiesRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/requests/manager/pending"),
//           axios.get("http://localhost:5000/api/requests/manager/approved"),
//           axios.get("http://localhost:5000/api/staff/count"),
//           axios.get("http://localhost:5000/api/activities/recent")
//         ]);

//         setStats({
//           pendingRequests: pendingRes.data.length,
//           approvedRequests: approvedRes.data.count || approvedRes.data.length,
//           activeStaff: staffRes.data.count,
//           recentActivities: activitiesRes.data
//         });
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-50 font-['Inter',sans-serif]">
//       <ManagerSidebar />

//       <div className="flex-1 ml-0 md:ml-64 transition-all duration-200">
//         <header className="bg-white shadow-sm sticky top-0 z-10">
//           <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//             <h1 className="text-2xl font-semibold text-gray-900">Manager Dashboard</h1>
//             <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
//           </div>
//         </header>

//         <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {/* Pending Requests */}
//             <div className="bg-white rounded-xl shadow p-4 flex flex-col">
//               <div className="flex items-center justify-between mb-2">
//                 <h2 className="text-sm font-medium text-gray-500">Pending Requests</h2>
//                 <AlertCircle className="h-5 w-5 text-yellow-500" />
//               </div>
//               {!loading ? (
//                 <p className="text-3xl font-bold text-gray-900">{stats.pendingRequests}</p>
//               ) : (
//                 <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
//               )}
//               <p className="text-xs text-gray-500 mt-1">Awaiting your approval</p>
//             </div>

//             {/* Approved Requests */}
//             <div className="bg-white rounded-xl shadow p-4 flex flex-col">
//               <div className="flex items-center justify-between mb-2">
//                 <h2 className="text-sm font-medium text-gray-500">Approved Requests</h2>
//                 <CheckCircle className="h-5 w-5 text-green-500" />
//               </div>
//               {!loading ? (
//                 <p className="text-3xl font-bold text-gray-900">{stats.approvedRequests}</p>
//               ) : (
//                 <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
//               )}
//               <p className="text-xs text-gray-500 mt-1">This month</p>
//             </div>

//             {/* Active Staff */}
//             <div className="bg-white rounded-xl shadow p-4 flex flex-col">
//               <div className="flex items-center justify-between mb-2">
//                 <h2 className="text-sm font-medium text-gray-500">Active Staff</h2>
//                 <Users className="h-5 w-5 text-purple-500" />
//               </div>
//               {!loading ? (
//                 <p className="text-3xl font-bold text-gray-900">{stats.activeStaff}</p>
//               ) : (
//                 <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
//               )}
//               <p className="text-xs text-gray-500 mt-1">Currently working</p>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white rounded-xl shadow p-4">
//             <div className="flex items-center mb-4">
//               <Activity className="h-5 w-5 mr-2 text-gray-700" />
//               <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
//             </div>
//             {!loading ? (
//               <div className="space-y-4">
//                 {stats.recentActivities.length > 0 ? (
//                   stats.recentActivities.map((activity, index) => (
//                     <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
//                       <div className="flex-shrink-0 mt-1">
//                         <div className={`h-2 w-2 rounded-full ${
//                           activity.type === 'approval' ? 'bg-green-500' : 
//                           activity.type === 'request' ? 'bg-blue-500' : 'bg-yellow-500'
//                         }`}></div>
//                       </div>
//                       <div className="ml-3 flex-1">
//                         <p className="text-sm font-medium text-gray-900">{activity.message}</p>
//                         <p className="text-xs text-gray-500 flex items-center mt-1">
//                           <Clock className="h-3 w-3 mr-1" />
//                           {new Date(activity.timestamp).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-gray-500 py-4 text-center">No recent activity</p>
//                 )}
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {[...Array(5)].map((_, index) => (
//                   <div key={index} className="h-12 bg-gray-200 rounded animate-pulse"></div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManagerSidebar from './ManagerSidebar';
import { Activity, Clock, CheckCircle, Users, AlertCircle } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000"); // Real-time updates

const ManagerDashboard = () => {
  const [stats, setStats] = useState({
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    activeStaff: 0, // Optional, can calculate if staff data is included in requests
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/requests");
      const requests = res.data || [];

      // Calculate stats
      const pendingRequests = requests.filter(r => r.status === "PENDING").length;
      const approvedRequests = requests.filter(r => r.status === "APPROVED").length;
      const rejectedRequests = requests.filter(r => r.status === "REJECTED").length;

      // Active staff: unique users in requests
      const activeStaff = [...new Set(requests.map(r => r.user_id))].length;

      // Recent activities: latest 5 requests sorted by creation date
      const recentActivities = requests
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)
        .map(r => ({
          message: `${r.fname} ${r.lname} submitted a request for ${r.item_name} (${r.status})`,
          type: r.status.toLowerCase(),
          timestamp: r.created_at
        }));

      setStats({ pendingRequests, approvedRequests, rejectedRequests, activeStaff, recentActivities });
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Socket.IO real-time updates
    socket.on("new_request", fetchDashboardData);
    socket.on("update_request", fetchDashboardData);

    return () => {
      socket.off("new_request", fetchDashboardData);
      socket.off("update_request", fetchDashboardData);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      <ManagerSidebar />

      <div className="flex-1 ml-0 md:ml-64 transition-all duration-200">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Manager Dashboard</h1>
            <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Pending Requests */}
            <div className="bg-white rounded-xl shadow p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-medium text-gray-500">Pending Requests</h2>
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
              {!loading ? (
                <p className="text-3xl font-bold text-gray-900">{stats.pendingRequests}</p>
              ) : (
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              )}
            </div>

            {/* Approved Requests */}
            <div className="bg-white rounded-xl shadow p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-medium text-gray-500">Approved Requests</h2>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              {!loading ? (
                <p className="text-3xl font-bold text-gray-900">{stats.approvedRequests}</p>
              ) : (
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              )}
            </div>

            {/* Rejected Requests */}
            <div className="bg-white rounded-xl shadow p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-medium text-gray-500">Rejected Requests</h2>
                <Users className="h-5 w-5 text-red-500" />
              </div>
              {!loading ? (
                <p className="text-3xl font-bold text-gray-900">{stats.rejectedRequests}</p>
              ) : (
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              )}
            </div>

            {/* Active Staff */}
            <div className="bg-white rounded-xl shadow p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-medium text-gray-500">Active Staff</h2>
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              {!loading ? (
                <p className="text-3xl font-bold text-gray-900">{stats.activeStaff}</p>
              ) : (
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center mb-4">
              <Activity className="h-5 w-5 mr-2 text-gray-700" />
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            {!loading ? (
              <div className="space-y-4">
                {stats.recentActivities.length > 0 ? (
                  stats.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`h-2 w-2 rounded-full ${
                          activity.type === 'approved' ? 'bg-green-500' : 
                          activity.type === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-4 text-center">No recent activity</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;
