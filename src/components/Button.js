import React from "react";

const Button = ({ name, search, getImage, getColor, color, setBodyColor }) => {
  return (
    <button
      id="new-quote"
      className="btn-quote btn btn-primary btn-lg mt-5"
      style={{ backgroundColor: color }}
      onClick={() => {
        search();
        getImage();
        getColor();
      }}
    >
      <span>{name}</span>
    </button>
  );
};

export default Button;
