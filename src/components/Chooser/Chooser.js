import React, { Component, useState } from "react";
import "./Chooser.scss";
import SearchSelect from "../SearchSelect/SearchSelect";
import PropTypes from "prop-types";
import getCoordinates from "../../utils/async/getCoordinates";
import Button from "../Button/Button";
class Chooser extends Component {
  constructor() {
    super();

    this.state = {
      location: null,
      foodSelection: null,
      beerSelection: null,
      deployed: null,
      error: false,
      locationType: null,
      status: "normal"
    };
  }

  getLatAndLong = () => {
    this.setGetting();
    navigator.geolocation.getCurrentPosition(position => {
      this.setLocation([position.coords.latitude, position.coords.longitude]);
    });
  };

  setLocation = location => {
    if (location) {
      this.setState({ location, status: "success" });
    } else {
      this.setState({ status: "error" });
    }
  };

  setGetting = () => {
    this.setState({ status: "getting" });
  };

  setLocationType = locationType => {
    this.setState({ locationType });
    if (locationType === "lat-long") {
      this.getLatAndLong();
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
        {!this.state.locationType && (
          <div className="bag-chooser__location-button-wrapper">
            <Button
              size="small"
              onClick={this.setLocationType}
              name="lat-long"
              text="Current location"
            />
            <Button
              size="small"
              onClick={this.setLocationType}
              name="choose"
              text="Enter location"
            />
          </div>
        )}
        {this.state.locationType === "lat-long" && (
          <div className="bag-chooser__get-location-from-browser-wrapper">
            {this.state.status === "getting" && <p>Getting dem 'nates</p>}
            {this.state.status !== "getting" && this.state.location && (
              <p>got it</p>
            )}
            {this.state.status === "error" && <p>error</p>}
          </div>
        )}
        {this.state.locationType === "choose" && (
          <div className="bag-chooser__choose-location-wrapper"></div>
        )}
        {beerOptions && (
          <SearchSelect
            options={beerOptions}
            name="beerSelection"
            defaultText="Choose your beer"
            handleSelect={this.handleSelect}
            isDeployed={this.state.deployed === "beerSelection" ? true : false}
            currentSelection={this.state.beerSelection}
            handleDeploy={this.handleDeploy}
          />
        )}
        {foodOptions && (
          <SearchSelect
            options={foodOptions}
            name="foodSelection"
            isDeployed={this.state.deployed === "foodSelection" ? true : false}
            defaultText="Choose your food"
            handleSelect={this.handleSelect}
            currentSelection={this.state.foodSelection}
            handleDeploy={this.handleDeploy}
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

const LocationInput = props => {
  const [location, setLocation] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (location.length > 0) {
      props.handleSubmit(location);
    } else {
      return;
    }
  };

  return (
    <form className="bag-location-input-form" onSubmit={e => handleSubmit()}>
      <input
        className="bag-location-input-form__input"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Enter ZIP or city/state"
      />
      <Button />
    </form>
  );
};
