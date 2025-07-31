import React from "react";

export const Alert = ({ children, variant = "default", className = "", ...props }) => {
  const baseClasses = "rounded-md p-4 mb-4 border flex items-start";

  // Variant styles (extend as needed)
  const variants = {
    default: "bg-gray-100 border-gray-300 text-gray-700",
    destructive: "bg-red-100 border-red-400 text-red-700",
    success: "bg-green-100 border-green-400 text-green-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  const variantClasses = variants[variant] || variants.default;

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} role="alert" {...props}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`ml-2 text-sm ${className}`} {...props}>
      {children}
    </p>
  );
};
