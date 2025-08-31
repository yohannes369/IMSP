import React from "react";
import Footer from "../../components/Footer/Footer";

const GuestPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      {/* Background elements with polygonal green theme */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Green polygonal overlay */}
        <div className="absolute inset-0 bg-emerald-600 opacity-10"></div>

        {/* Subtle polygon pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234ade80' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Decorative green header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 py-4 px-6">
            <h2 className="text-xl font-semibold text-white">
              Inventory Access Portal
            </h2>
          </div>

          <div className="p-8 md:p-10">
            <div className="text-center mb-10">
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 border-4 border-emerald-200">
                  <svg
                    className="w-12 h-12 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to Guest Page
              </h1>

              <div className="w-24 h-1 bg-emerald-400 mx-auto mb-6"></div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                You're accessing the{" "}
                <span className="font-semibold text-emerald-600">
                  Enterprise Inventory Platform
                </span>{" "}
                with guest privileges. This system provides comprehensive tools
                for tracking assets, processing requests, and managing approvals
                across your organization.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-lg">
                <div className="flex">
                  <svg
                    className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-medium text-emerald-800 mb-1">
                      Access Status
                    </h3>
                    <p className="text-emerald-700">
                      Your account is currently under review. The administrator
                      will assign you appropriate access level (Viewer, Editor,
                      or Admin) based on your departmental role and
                      responsibilities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">
                      Need Immediate Access?
                    </h3>
                    <p className="text-gray-600">
                      Contact{" "}
                      <span className="text-emerald-600 font-medium">
                        ims@company.com
                      </span>{" "}
                      or call{" "}
                      <span className="font-medium">(251) 729451</span> for
                      assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer className="bg-white border-t border-gray-200" />
    </div>
  );
};

export default GuestPage;
