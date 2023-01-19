import React from "react";

const Input = ({ id, label, value = "", onChange }) => {
  return (
    <>
      <label>{label}</label>
      <input id={id} value={value} onChange={onChange} />
    </>
  );
};

export default Input;
