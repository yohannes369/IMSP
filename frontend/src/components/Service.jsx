import React, { useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";

const Service = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const services = [
    {
      title: "Inventory Tracking",
      description: "Keep real-time track of all your stock, with low-stock alerts and barcode integration."
    },
    {
      title: "Role-Based Access",
      description: "Assign permissions for Admin, Manager, Clerk, and Staff to ensure security and control."
    },
    {
      title: "Real-Time Notifications",
      description: "Receive instant notifications for approvals, stock changes, and requests."
    },
    {
      title: "Barcode System",
      description: "Generate and scan barcodes for quick inventory management."
    },
    {
      title: "Reports & Analytics",
      description: "Generate visual reports to analyze trends and track performance."
    }
  ];

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Services Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 min-h-screen py-12"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-center text-green-700 mb-12"
          >
            Our Services
          </motion.h1>

          {/* Service Cards */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 cursor-default"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <span className="text-green-700 font-bold">{index + 1}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-green-700">
                    {service.title}
                  </h2>
                </div>
                <p className="text-gray-600 pl-14">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Service;