import React from "react";

const Input = ({ id, label, value = "", onChange }) => {
  return (
    <div key={id}>
      <label>{label}</label>
      <input id={id} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
