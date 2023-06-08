import React from "react";

function Input({ name, value, type, placeholder, onChange }) {
  return (
    <input
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Input;
