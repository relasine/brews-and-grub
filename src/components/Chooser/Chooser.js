import React, { Component } from "react";
import "./Chooser.scss";
import Dropdown from "../Dropdown/Dropdown";
import PropTypes from "prop-types";

class Chooser extends Component {
  constructor() {
    super();

    this.state = {
      location: null,
      foodSelection: null,
      beerSelection: null,
      deployed: null,
      error: false
    };
  }

  handleSelect = (name, selection) => {
    this.setState({ [name]: selection, deployed: null });
  };

  handleDeploy = dropdown => {
    if (this.state.deployed === dropdown) {
      this.setState({ deployed: null });
    } else {
      this.setState({ deployed: dropdown });
    }
  };

  handleSubmit = () => {
    const { foodSelection, beerSelection, location } = this.state;
    if (!foodSelection || !beerSelection || !location) {
      this.setState({ error: true });
      return;
    }

    this.props.handleSubmit(foodSelection, beerSelection, location);
  };

  render() {
    const { beerOptions, foodOptions } = this.props;
    return (
      <main className="bag-chooser">
        {beerOptions && <Dropdown options={beerOptions} name="beerSelection" />}
        {foodOptions && <Dropdown options={foodOptions} name="foodSelection" />}
      </main>
    );
  }
}

export default Chooser;

Chooser.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  beerOptions: PropTypes.arrayOf(PropTypes.string),
  foodOptions: PropTypes.arrayOf(PropTypes.string)
};
