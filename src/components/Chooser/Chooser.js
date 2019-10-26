import React, { Component, useState } from "react";
import Hero from "../Hero/Hero";
import "./Chooser.scss";
// import SearchSelect from "../SearchSelect/SearchSelect";
import { SearchSelect, Button } from "terra-component-lib";
import PropTypes from "prop-types";
import getCoordinates from "../../utils/async/getCoordinates";
// import Button from "../Button/Button";
import LoadingBeerSmall from "../../images/loading-beer.gif";
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

  componentDidMount() {
    window.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick);
  }

  handleClick = e => {
    if (e.target.classList.contains("bag-search-select__current-selection")) {
      return;
    } else {
      this.setState({ deployed: null });
    }
  };

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

  setLocationTypeLatLong = () => {
    this.setState({ locationType: "lat-long" });
    this.getLatAndLong();
  };

  setLocationTypeManually = () => {
    this.setState({
      locationType: "choose"
    });
  };

  handleSelect = (selection, name) => {
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

    this.props.handleSubmission(beerSelection, foodSelection, location);
  };

  render() {
    const { beerOptions, foodOptions } = this.props;
    return (
      <main className="bag-chooser">
        <Hero />
        {!this.state.locationType && (
          <>
            <h4 className="bag-chooser__location-header">
              Choose location preference:
            </h4>
            <div className="bag-chooser__location-button-wrapper">
              <Button
                size="small"
                onClick={this.setLocationTypeLatLong}
                text="Use Current location"
                className="ter-button--primary--1"
              />
              <Button
                size="small"
                onClick={() => {}}
                text="Enter location"
                className="ter-button--primary--1"
              />
            </div>
          </>
        )}
        {this.state.locationType === "lat-long" && (
          <div className="bag-chooser__get-location-from-browser-wrapper">
            {this.state.status === "getting" && (
              <>
                <p className="bag-chooser__getting-text">
                  {" "}
                  <img
                    className="bag-chooser__loader"
                    src={LoadingBeerSmall}
                    alt="animated beer gass"
                  />
                  Getting your location...
                </p>
              </>
            )}
            {this.state.status !== "getting" && this.state.location && (
              <p className="bag-chooser__location-found">
                Location found and set
              </p>
            )}
            {this.state.status === "error" && <p>error</p>}
          </div>
        )}
        {this.state.locationType === "choose" && (
          <div className="bag-chooser__choose-location-wrapper"></div>
        )}
        {beerOptions && foodOptions && (
          <>
            <h4 className="bag-chooser__dropdown-label">
              Select your beer and food preference:
            </h4>
            <div className="bag-chooser__dropdowns">
              <SearchSelect
                options={beerOptions}
                name="beerSelection"
                defaultText="Choose your beer"
                handleSelect={this.handleSelect}
                isDeployed={
                  this.state.deployed === "beerSelection" ? true : false
                }
                selection={this.state.beerSelection}
                handleDeploy={this.handleDeploy}
              />
              <SearchSelect
                options={foodOptions}
                name="foodSelection"
                isDeployed={
                  this.state.deployed === "foodSelection" ? true : false
                }
                defaultText="Choose your food"
                handleSelect={this.handleSelect}
                selection={this.state.foodSelection}
                handleDeploy={this.handleDeploy}
              />
              <Button
                text="Submit"
                onClick={this.handleSubmission}
                className="ter-button--primary--2"
              />
            </div>
          </>
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
