import React from "react";

export const Badge = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 ${className}`}
    >
      {children}
    </span>
  );
};
