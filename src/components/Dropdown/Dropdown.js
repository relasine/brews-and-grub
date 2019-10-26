import React, { Component } from "react";
import "./Dropdown.scss";
import PropTypes from "prop-types";

class Dropdown extends Component {
  renderOptions = () => {
    this.props.options.map(option => {
      return (
        <li
          onClick={() => this.props.handleSelect(this.props.name, option)}
          key={option}
        >
          {option}
        </li>
      );
    });
  };

  render() {
    return <ul className="bag-dropdown">{this.renderOptions()}</ul>;
  }
}

export default Dropdown;

Dropdown.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired
};
