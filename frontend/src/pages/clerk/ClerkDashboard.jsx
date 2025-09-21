
import React from "react";
import Sidebar from "./Sidebar";

const ClerkDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-green-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-extrabold text-green-900">
          Welcome, Clerk!
        </h1>
      </div>
    </div>
  );
};

export default ClerkDashboard;
