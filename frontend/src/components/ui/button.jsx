// src/components/ui/button.jsx
import * as React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
