import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center px-6 overflow-hidden">
      {/* Background polygonal pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234ade80' fill-opacity='0.2'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0 0c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 text-center max-w-md w-full">
        {/* Error container */}
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
          {/* Error number with decorative elements */}
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-emerald-100 rounded-full opacity-30"></div>
            <h1 className="relative text-8xl font-bold text-emerald-600">404</h1>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 mb-6">
            The content you're looking for may have been moved or doesn't exist.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-0.5 bg-emerald-200"></div>
          </div>

          {/* Action button */}
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Return to Homepage
          </Link>
        </div>

        {/* Additional help link */}
        <div className="mt-6 text-sm text-gray-500">
          Need help? <Link to="/contact" className="text-emerald-600 hover:underline">Contact support</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;