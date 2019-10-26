import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

const Button = ({ type, text, onClick, name, size }) => {
  return (
    <>
      <button
        // If there's a name, send up the name
        // If there's a not an onClick
        onClick={
          name ? () => onClick(name) : onClick ? () => onClick() : () => {}
        }
        className={`bag-button bag-button-${type ||
          "default"} bag-button--${size || "normal"}`}
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
  onClick: PropTypes.func,
  name: PropTypes.string
};
