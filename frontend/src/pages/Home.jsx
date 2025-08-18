import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import { FaBoxes, FaChartLine, FaMobileAlt, FaSyncAlt, FaSearch, FaUserShield } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use the Navbar component instead of custom header */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#154734] to-[#5B8E7D] text-white py-16 md:py-24 overflow-hidden">
        {/* ... rest of your hero section code ... */}
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        {/* ... your features section code ... */}
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#154734] text-white">
        {/* ... your stats section code ... */}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#E8F3EC]">
        {/* ... your CTA section code ... */}
      </section>

      {/* Footer */}
      <footer className="bg-[#0d3528] text-white py-8">
        {/* ... your footer code ... */}
      </footer>
    </div>
  );
};

export default Home;