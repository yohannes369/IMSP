import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffSidebar from './StaffSidebar';

const StaffPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif]">
      <StaffSidebar />
      
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Welcome Section */}
          <section 
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 relative overflow-hidden min-h-[400px] sm:min-h-[480px] flex items-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1612831455545-4f6a4f81b10b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(255, 255, 255, 0.88)', // softer white overlay
            }}
          >
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Welcome to the Staff Portal
              </h1>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                As a staff member, you can <strong>request</strong> items you need for your tasks 
                and <strong>reserve</strong> them to ensure availability. Track the status of your requests, 
                manage your reserved items, and receive <strong>real-time notifications</strong> for smooth operations 
                in the Smart Inventory Management System (IMS).
              </p>
            </div>
          </section>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffPage;
