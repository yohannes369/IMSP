
// export default Home;
import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  FaSyncAlt, 
  FaSearch, 
  FaMobileAlt, 
  FaUserShield, 
  FaGlobe, 
  FaQuestionCircle,
  FaChartLine,
  FaShieldAlt,
  FaHeadset,
  FaArrowRight
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useTranslation } from "react-i18next";
import InventoryImage from "../assets/5.jpg";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const Home = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-gray-50 m-0 p-0 overflow-x-hidden">
      {/* Navbar */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isScrolled ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed w-full z-50 ${isScrolled ? "shadow-lg bg-[#154734]/95" : "bg-[#154734]"}`}
      >
        <Navbar />
      </motion.div>

      {/* Hero Section */}
      <section className="relative w-full pt-24 md:pt-0">
        <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden">
          <motion.img
            src={InventoryImage}
            alt={t("hero_title")}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-6 md:px-20 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 md:mb-6"
            variants={itemVariants}
          >
            {t("hero_title")}
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-md mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t("hero_text")}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <Link
              to="/Contact"
              className="bg-[#C69214] hover:bg-[#e0aa2a] text-[#154734] font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {t("contact_button")}
            </Link>
            <Link
              to="/Login"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#154734] font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              {t("get_started")}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {t("features")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard 
              icon={<FaSyncAlt className="text-3xl sm:text-4xl" />} 
              title={t("feature_tracking_title")} 
              text={t("feature_tracking_text")} 
            />
            <FeatureCard 
              icon={<FaSearch className="text-3xl sm:text-4xl" />} 
              title={t("feature_analytics_title")} 
              text={t("feature_analytics_text")} 
            />
            <FeatureCard 
              icon={<FaMobileAlt className="text-3xl sm:text-4xl" />} 
              title={t("feature_mobile_title")} 
              text={t("feature_mobile_text")} 
            />
            <FeatureCard 
              icon={<FaUserShield className="text-3xl sm:text-4xl" />} 
              title={t("feature_secure_title")} 
              text={t("feature_secure_text")} 
            />
            <FeatureCard 
              icon={<FaGlobe className="text-3xl sm:text-4xl" />} 
              title={t("feature_language_title")} 
              text={t("feature_language_text")} 
            />
            <FeatureCard 
              icon={<FaQuestionCircle className="text-3xl sm:text-4xl" />} 
              title={t("feature_support_title")} 
              text={t("feature_support_text")} 
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#154734] text-white px-4 sm:px-6">
        {/* <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
          <Stat number={t("stats_uptime_number")} label={t("stats_uptime_label")} icon={<FaChartLine />} />
          <Stat number={t("stats_items_number")} label={t("stats_items_label")} icon={<FaSearch />} />
          <Stat number={t("stats_support_number")} label={t("stats_support_label")} icon={<FaHeadset />} />
          <Stat number={t("stats_transactions_number")} label={t("stats_transactions_label")} icon={<FaShieldAlt />} />
        </div> */}
      </section>

      {/* Transform CTA Section */}
      <section className="py-16 bg-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-[#154734] mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, margin: "-100px" }}>
            {t("cta_title")}
          </motion.h2>
          <motion.p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true, margin: "-100px" }}>
            {t("cta_text")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true, margin: "-100px" }}>
            <Link to="/demo" className="inline-flex items-center bg-[#154734] hover:bg-[#0d3528] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              {t("cta_button")}
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white border-t border-gray-100 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-[#154734] mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, margin: "-100px" }}>
              {t("about_title")}
            </motion.h2>
            <motion.p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true, margin: "-100px" }}>
              {t("about_description")}
            </motion.p>
          </div>
          <div className="flex justify-center">
            <Link to="/about" className="inline-flex items-center text-[#C69214] font-bold hover:text-[#e0aa2a] transition-all group">
              {t("about_learn_more")}
              <motion.span className="ml-2 inline-block" whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                <FaArrowRight />
              </motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, text }) => (
  <motion.div 
    className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#C69214]"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
  >
    <div className="text-[#C69214] mb-4 sm:mb-6 flex justify-center">{icon}</div>
    <h3 className="text-xl sm:text-2xl font-bold text-[#154734] mb-2 sm:mb-3 text-center">{title}</h3>
    <p className="text-gray-600 text-sm sm:text-base text-center">{text}</p>
  </motion.div>
);

// Stat Component
const Stat = ({ number, label, icon }) => (
  <motion.div className="p-4 sm:p-6" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, margin: "-50px" }}>
    <div className="flex justify-center mb-2 sm:mb-3 text-[#C69214]">{React.cloneElement(icon, { className: "text-2xl sm:text-3xl" })}</div>
    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 text-white">{number}</div>
    <div className="text-sm sm:text-base text-gray-300 font-medium">{label}</div>
  </motion.div>
);

export default Home;
