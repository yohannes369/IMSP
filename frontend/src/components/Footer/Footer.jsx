// import React from "react";
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGlobe } from "react-icons/fa";
// import { useTranslation } from "react-i18next";

// const Footer = () => {
//   const { t, i18n } = useTranslation();
//   const currentLang = i18n.language || "en";

//   const handleLanguageChange = (lang) => {
//     i18n.changeLanguage(lang);
//   };

//   return (
//     <footer className="bg-[#0d3528] text-white pt-12">
//       <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* About */}
//         <div>
//           <h3 className="text-xl font-bold mb-4">{t("footer_about_title")}</h3>
//           <p className="text-gray-300">{t("footer_about_text")}</p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-xl font-bold mb-4">{t("footer_links_title")}</h3>
//           <ul>
//             <li className="mb-2 hover:text-[#C69214]">
//               <a href="/">{t("home")}</a>
//             </li>
//             <li className="mb-2 hover:text-[#C69214]">
//               <a href="/about">{t("about")}</a>
//             </li>
//             <li className="mb-2 hover:text-[#C69214]">
//               <a href="/services">{t("services")}</a>
//             </li>
//             <li className="mb-2 hover:text-[#C69214]">
//               <a href="/contact">{t("contact")}</a>
//             </li>
//           </ul>
//         </div>

//         {/* Support */}
//         <div>
//           <h3 className="text-xl font-bold mb-4">{t("")}</h3>
//           <ul>
           
//             <li className="mb-2 hover:text-[#C69214]">
//               <a href="/contact">{t("contact_support")}</a>
//             </li>
//           </ul>
//         </div>

//         {/* Language & Social */}
//         <div>
//           <h3 className="text-xl font-bold mb-4">{t("footer_language_title")}</h3>
//           <div className="flex flex-col space-y-2 mb-6">
//             <button
//               onClick={() => handleLanguageChange("en")}
//               className={`px-3 py-2 rounded-md hover:bg-[#C69214] ${
//                 currentLang === "en" ? "bg-[#C69214] font-bold" : "bg-gray-700"
//               }`}
//             >
//               English
//             </button>
//             <button
//               onClick={() => handleLanguageChange("am")}
//               className={`px-3 py-2 rounded-md hover:bg-[#C69214] ${
//                 currentLang === "am" ? "bg-[#C69214] font-bold" : "bg-gray-700"
//               }`}
//             >
//               አማርኛ
//             </button>
//           </div>
//           <div className="flex space-x-4">
//             <a href="#" className="hover:text-[#C69214]"><FaFacebookF /></a>
//             <a href="#" className="hover:text-[#C69214]"><FaTwitter /></a>
//             <a href="#" className="hover:text-[#C69214]"><FaLinkedinIn /></a>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
//         © {new Date().getFullYear()} IMS. {t("footer_rights")}
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer className="bg-[#0d3528] text-white pt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">{t("footer_about_title", "About Us")}</h3>
          <p className="text-gray-300">{t("footer_about_text", "IMS is a leading inventory management system providing reliable solutions for organizations.")}</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">{t("footer_links_title", "Quick Links")}</h3>
          <ul>
            <li className="mb-2 hover:text-[#C69214]">
              <a href="/">{t("home", "Home")}</a>
            </li>
            <li className="mb-2 hover:text-[#C69214]">
              <a href="/about">{t("about", "About")}</a>
            </li>
            <li className="mb-2 hover:text-[#C69214]">
              <a href="/services">{t("services", "Services")}</a>
            </li>
            <li className="mb-2 hover:text-[#C69214]">
              <a href="/contact">{t("contact", "Contact")}</a>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">{t("footer_support_title", "Support")}</h3>
          <ul>
            <li className="mb-2 hover:text-[#C69214]">
              <a href="/contact">{t("contact_support", "Contact Support")}</a>
            </li>
            <li className="mb-2 hover:text-[#C69214]">
              {/* <a href="/faq">{t("faq", "FAQ")}</a> */}
            </li>
            <li className="mb-2 hover:text-[#C69214]">
              {/* <a href="/help">{t("help_center", "Help Center")}</a> */}
            </li>
          </ul>
        </div>

        {/* Language & Social Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">{t("footer_language_title", "Language & Social")}</h3>
          
          {/* Language Buttons */}
          <div className="flex flex-col space-y-2 mb-6">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`px-3 py-2 rounded-md hover:bg-[#C69214] transition ${
                currentLang === "en" ? "bg-[#C69214] font-bold" : "bg-gray-700"
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange("am")}
              className={`px-3 py-2 rounded-md hover:bg-[#C69214] transition ${
                currentLang === "am" ? "bg-[#C69214] font-bold" : "bg-gray-700"
              }`}
            >
              አማርኛ
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-[#C69214] transition">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#C69214] transition">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#C69214] transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
        © {new Date().getFullYear()} IMS. {t("footer_rights", "All rights reserved.")}
      </div>
    </footer>
  );
};

export default Footer;
