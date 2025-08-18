
// import React, { useState } from "react";
// import { FaBoxes, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const Navbar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { t, i18n } = useTranslation();
//   const currentLang = i18n.language || "en";

//   const handleLanguageChange = (lang) => {
//     i18n.changeLanguage(lang);
//     setDropdownOpen(false);
//     setMobileMenuOpen(false);
//   };

//   return (
//     <header className="bg-[#154734] text-white shadow-lg sticky top-0 z-50">
//       <div className="container mx-auto px-6 py-5 md:py-6 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-4">
//           <FaBoxes className="text-3xl text-[#C69214]" />
//           <h1 className="text-2xl font-bold tracking-wide">
//             IMS<span className="text-[#C69214]">solution</span>
//           </h1>
//         </div>

//         {/* Desktop Menu */}
//         <nav className="hidden md:flex items-center space-x-10">
//           <Link to="/" className="hover:text-[#C69214] transition font-medium">{t("home")}</Link>
//           <Link to="/about" className="hover:text-[#C69214] transition font-medium">{t("about")}</Link>
//           <Link to="/services" className="hover:text-[#C69214] transition font-medium">{t("services")}</Link>
//           <Link to="/contact" className="hover:text-[#C69214] transition font-medium">{t("contact")}</Link>

//           {/* Language Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center space-x-2 hover:text-[#C69214] transition font-medium"
//             >
//               <FaGlobe />
//               <span>{currentLang === "en" ? "English" : "አማርኛ"}</span>
//             </button>
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg z-20">
//                 <button
//                   onClick={() => handleLanguageChange("en")}
//                   className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${currentLang === "en" ? "font-bold" : ""}`}
//                 >
//                   English
//                 </button>
//                 <button
//                   onClick={() => handleLanguageChange("am")}
//                   className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${currentLang === "am" ? "font-bold" : ""}`}
//                 >
//                   አማርኛ
//                 </button>
//               </div>
//             )}
//           </div>

//           <Link to="/login" className="hover:text-[#C69214] transition font-medium">{t("login")}</Link>
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           className="md:hidden text-2xl p-2"
//         >
//           {mobileMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-[#154734] text-white px-6 py-4 space-y-4">
//           <Link to="/" className="block hover:text-[#C69214] transition font-medium">{t("home")}</Link>
//           <Link to="/about" className="block hover:text-[#C69214] transition font-medium">{t("about")}</Link>
//           <Link to="/services" className="block hover:text-[#C69214] transition font-medium">{t("services")}</Link>
//           <Link to="/contact" className="block hover:text-[#C69214] transition font-medium">{t("contact")}</Link>
//           <div className="border-t border-gray-600 pt-3">
//             <span className="block mb-2 font-medium">{t("language")}</span>
//             <button
//               onClick={() => handleLanguageChange("en")}
//               className={`block w-full text-left px-2 py-1 hover:bg-gray-700 ${currentLang === "en" ? "font-bold" : ""}`}
//             >
//               English
//             </button>
//             <button
//               onClick={() => handleLanguageChange("am")}
//               className={`block w-full text-left px-2 py-1 hover:bg-gray-700 ${currentLang === "am" ? "font-bold" : ""}`}
//             >
//               አማርኛ
//             </button>
//           </div>
//           <Link to="/login" className="block hover:text-[#C69214] transition font-medium">{t("login")}</Link>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { FaBoxes, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#154734] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-5 md:py-6 flex justify-between items-center">
        {/* Logo with smooth hover effect */}
        <Link 
          to="/" 
          className="flex items-center space-x-4 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <FaBoxes className="text-3xl text-[#C69214] transition-transform duration-300 group-hover:scale-110" />
          <h1 className="text-2xl font-bold tracking-wide">
            IMS<span className="text-[#C69214] transition-colors duration-300 group-hover:text-white">solution</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-10">
          {/* Nav Links with animated underline */}
          <div className="relative group">
            <Link 
              to="/" 
              className="px-1 py-2 font-medium transition-colors duration-300 hover:text-[#C69214]"
            >
              {t("home")}
            </Link>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C69214] transition-all duration-300 group-hover:w-full"></div>
          </div>
          
          <div className="relative group">
            <Link 
              to="/about" 
              className="px-1 py-2 font-medium transition-colors duration-300 hover:text-[#C69214]"
            >
              {t("about")}
            </Link>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C69214] transition-all duration-300 group-hover:w-full"></div>
          </div>
          
          <div className="relative group">
            <Link 
              to="/services" 
              className="px-1 py-2 font-medium transition-colors duration-300 hover:text-[#C69214]"
            >
              {t("services")}
            </Link>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C69214] transition-all duration-300 group-hover:w-full"></div>
          </div>
          
          <div className="relative group">
            <Link 
              to="/contact" 
              className="px-1 py-2 font-medium transition-colors duration-300 hover:text-[#C69214]"
            >
              {t("contact")}
            </Link>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C69214] transition-all duration-300 group-hover:w-full"></div>
          </div>

          {/* Language Dropdown with better transitions */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 px-1 py-2 font-medium transition-colors duration-300 hover:text-[#C69214]"
            >
              <FaGlobe className="transition-transform duration-300 hover:rotate-12" />
              <span>{currentLang === "en" ? "English" : "አማርኛ"}</span>
            </button>
            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg z-20 overflow-hidden"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`block w-full text-left px-4 py-2 transition-colors duration-200 ${currentLang === "en" ? "bg-[#C69214] text-white font-bold" : "hover:bg-gray-100"}`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("am")}
                  className={`block w-full text-left px-4 py-2 transition-colors duration-200 ${currentLang === "am" ? "bg-[#C69214] text-white font-bold" : "hover:bg-gray-100"}`}
                >
                  አማርኛ
                </button>
              </div>
            )}
          </div>

          {/* Login button with nice hover effect */}
          <Link 
            to="/login" 
            className="px-4 py-2 font-medium rounded-md border border-[#C69214] text-[#C69214] transition-all duration-300 hover:bg-[#C69214] hover:text-white hover:shadow-lg"
          >
            {t("login")}
          </Link>
        </nav>

        {/* Mobile Menu Button with animation */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-2xl p-2 transition-transform duration-300 hover:scale-110"
        >
          {mobileMenuOpen ? <FaTimes className="text-[#C69214]" /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu with smooth slide-down animation */}
      <div className={`md:hidden bg-[#154734] overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-6 py-4 space-y-4">
          <Link 
            to="/" 
            className="block py-2 px-2 font-medium transition-colors duration-300 hover:text-[#C69214] hover:bg-white/10 rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("home")}
          </Link>
          <Link 
            to="/about" 
            className="block py-2 px-2 font-medium transition-colors duration-300 hover:text-[#C69214] hover:bg-white/10 rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("about")}
          </Link>
          <Link 
            to="/services" 
            className="block py-2 px-2 font-medium transition-colors duration-300 hover:text-[#C69214] hover:bg-white/10 rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("services")}
          </Link>
          <Link 
            to="/contact" 
            className="block py-2 px-2 font-medium transition-colors duration-300 hover:text-[#C69214] hover:bg-white/10 rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("contact")}
          </Link>
          
          <div className="border-t border-gray-600 pt-3">
            <span className="block mb-2 font-medium text-[#C69214]">{t("language")}</span>
            <button
              onClick={() => handleLanguageChange("en")}
              className={`block w-full text-left py-2 px-2 rounded transition-colors duration-300 ${currentLang === "en" ? "bg-[#C69214] text-white font-bold" : "hover:bg-white/10"}`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange("am")}
              className={`block w-full text-left py-2 px-2 rounded transition-colors duration-300 ${currentLang === "am" ? "bg-[#C69214] text-white font-bold" : "hover:bg-white/10"}`}
            >
              አማርኛ
            </button>
          </div>
          
          <Link 
            to="/login" 
            className="block mt-4 py-2 px-4 text-center font-medium rounded-md border border-[#C69214] text-[#C69214] transition-all duration-300 hover:bg-[#C69214] hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("login")}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;