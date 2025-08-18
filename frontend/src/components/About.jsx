import React from "react";
import Navbar from "./Navbar/Navbar";
import { motion } from "framer-motion";
import { FaBoxes, FaUsers, FaChartBar, FaCloud } from "react-icons/fa";
import Footer from "./Footer/Footer"; // Make sure this path is correct

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="py-12 px-6 flex-grow">
        <motion.div
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-green-700 mb-4">
            About Our Inventory Management System
          </h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Our Inventory Management System is designed to streamline your stock control,
            enhance operational efficiency, and provide real-time insights for
            better decision-making. Whether you are managing small supplies or
            enterprise-level inventory, our system adapts to your needs.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <FeatureCard
              icon={<FaBoxes className="text-green-600 text-5xl mb-4" />}
              title="Smart Stock Tracking"
              text="Monitor stock levels in real-time with barcode integration and alerts."
            />
            <FeatureCard
              icon={<FaUsers className="text-green-600 text-5xl mb-4" />}
              title="Role-Based Access"
              text="Secure and organized access for Admin, Manager, Clerk, and Staff."
            />
            <FeatureCard
              icon={<FaChartBar className="text-green-600 text-5xl mb-4" />}
              title="Analytics & Reports"
              text="Gain insights with advanced reports and interactive dashboards."
            />
            {/* <FeatureCard
              icon={<FaCloud className="text-green-600 text-5xl mb-4" />}
              title="Cloud Integration"
              text="Access your inventory anywhere with cloud-based hosting."
            /> */}
          </div>

          {/* Mission Section */}
          <motion.div
            className="bg-green-50 p-6 rounded-xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-green-700 mb-2">Our Mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We aim to provide a user-friendly, secure, and efficient inventory management
              solution that empowers organizations to save time, reduce errors, and improve
              productivity. Our platform is built for growth, scalability, and adaptability.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <div className="flex flex-col items-center text-center p-6 border rounded-xl hover:shadow-md transition">
    {icon}
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{text}</p>
  </div>
);

export default About;
