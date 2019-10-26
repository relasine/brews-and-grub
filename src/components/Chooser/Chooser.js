import React, { Component } from "react";
import "./Chooser.scss";
import SearchSelect from "../SearchSelect/SearchSelect";
import PropTypes from "prop-types";
import getCoordinates from "../../utils/async/getCoordinates";

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

  componentDidMount() {
    this.getLatAndLong();
  }

  getLatAndLong = () => {
    let location;
    navigator.geolocation.getCurrentPosition(function(position) {
      location = [position.coords.latitude, position.coords.longitude];
    });

    if (location) {
      this.setState({ location });
    }
  };

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

  handleSubmission = () => {
    const { foodSelection, beerSelection, location } = this.state;
    if (!foodSelection || !beerSelection || !location) {
      this.setState({ error: true });
      return;
    }

    this.props.handleSubmission(foodSelection, beerSelection, location);
  };

  render() {
    const { beerOptions, foodOptions } = this.props;
    return (
      <main className="bag-chooser">
        {beerOptions && (
          <SearchSelect
            options={beerOptions}
            name="beerSelection"
            isDeployed={this.state.deployed === "beerSelection" ? true : false}
            defaultSelection="Choose your beer"
            handleSelect={this.handleSelect}
          />
        )}
        {foodOptions && (
          <SearchSelect
            options={foodOptions}
            name="foodSelection"
            isDeployed={this.state.deployed === "foodSelection" ? true : false}
            defaultSelection="Choose your food"
            handleSelect={this.handleSelect}
          />
        )}
      </main>
    );
  }
}

export default Chooser;

Chooser.propTypes = {
  handleSubmission: PropTypes.func.isRequired,
  beerOptions: PropTypes.arrayOf(PropTypes.string),
  foodOptions: PropTypes.arrayOf(PropTypes.string)
};
