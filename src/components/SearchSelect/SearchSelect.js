import React, { Component } from "react";
import "./SearchSelect.scss";
import PropTypes from "prop-types";

class SearchSelect extends Component {
  constructor() {
    super();

    this.state = {
      entry: ""
    };
  }

  renderOptions = () => {
    if (this.state.entry.length === 0) {
      return this.props.options.map(option => {
        return (
          <li
            onClick={() => this.handleSelect(option)}
            key={option}
            className="bag-search-select__option"
          >
            {option}
          </li>
        );
      });
    } else {
      const options = this.props.options.filter(option => {
        return option.toLowerCase().includes(this.state.entry.toLowerCase());
      });

      if (options.length > 0) {
        return options.map(option => {
          return (
            <li
              onClick={() => this.handleSelect(option)}
              key={option}
              className="bag-search-select__option"
            >
              {option}
            </li>
          );
        });
      } else {
        return (
          <li key="none" className="bag-search-select__option">
            no matches
          </li>
        );
      }
    }
  };

  onEntry = e => {
    this.setState({
      entry: e.target.value
    });
  };

  handleSelect = option => {
    this.props.handleSelect(this.props.name, option);
    this.setState({
      entry: ""
    });
  };

  getClass = () => {
    if (this.props.isDeployed) {
      return "bag-search-select__wrapper bag-search-select__wrapper--is-deployed";
    } else {
      return "bag-search-select__wrapper bag-search-select__wrapper--is-hidden";
    }
  };

  getCurrentSelection = () => {
    if (this.props.currentSelection) {
      return this.props.currentSelection;
    } else {
      return this.props.defaultText;
    }
  };

  render() {
    return (
      <div
        className="bag-search-select"
        onClick={() => this.props.handleDeploy(this.props.name)}
      >
        <p
          className="bag-search-select__current-selection"
          onClick={() => this.props.handleDeploy(this.props.name)}
        >
          {this.getCurrentSelection()}
        </p>
        <div className={this.getClass()}>
          <input
            type="text"
            className="bag-search-select__input"
            onChange={e => this.onEntry(e)}
            value={this.state.entry}
            placeholder="search"
            onClick={e => e.stopPropagation()}
          ></input>
          <ul className="bag-search-select__options">{this.renderOptions()}</ul>
        </div>
      </div>
    );
  }
}

export default SearchSelect;

SearchSelect.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  isDeployed: PropTypes.bool.isRequired,
  defaultText: PropTypes.string.isRequired,
  currentSelection: PropTypes.string
};
