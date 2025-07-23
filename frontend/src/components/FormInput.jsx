import React from "react";

const FormInput = ({ label, type = "text", value, onChange, ...props }) => (
  <div style={{ marginBottom: "10px" }}>
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{ display: "block", width: "100%", padding: "8px" }}
        {...props}
      />
    </label>
  </div>
);

export default FormInput;
