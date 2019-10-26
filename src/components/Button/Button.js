import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

const Button = ({ type, text, onClick, name }) => {
  return (
    <>
      <button
        onClick={name ? () => onClick(name) : () => onClick()}
        className={`bag-button bag-button-${type || "default"}`}
      >
        {text}
      </button>
    </>
  );
};

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string
};
