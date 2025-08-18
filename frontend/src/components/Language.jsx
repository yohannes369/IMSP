import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Language = () => {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    alert(`Language changed to: ${lang === "en" ? "English" : "Amharic"}`);
    // Here you can integrate a real i18n library like react-i18next
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-6">
            Select Your Language
          </h1>
          <p className="text-gray-600 mb-10">
            Choose your preferred language for the Inventory Management System
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`px-6 py-3 rounded-lg font-semibold shadow-md transition 
                ${language === "en" ? "bg-green-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              English
            </button>

            <button
              onClick={() => handleLanguageChange("am")}
              className={`px-6 py-3 rounded-lg font-semibold shadow-md transition 
                ${language === "am" ? "bg-green-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              አማርኛ
            </button>
          </div>

          <div className="mt-10 text-gray-700">
            <p className="text-lg">
              Current Language:{" "}
              <span className="font-bold">{language === "en" ? "English" : "አማርኛ"}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Language;
