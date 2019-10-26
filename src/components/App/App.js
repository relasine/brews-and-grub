import React, { Component } from "react";
import "./App.scss";
import submissionFetch from "../../utils/async/submissionFetch";
import getFoodAndBeer from "../../utils/async/getFoodAndBeer";
import logo from "../../images/logo.png";

import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import Results from "../Results/Results";
import Chooser from "../Chooser/Chooser";

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      status: "start",
      results: null
    };
  }

  componentDidMount() {
    this.getFoodAndBeer();
  }

  getFoodAndBeer = async () => {
    this.setLoading();

    try {
      const data = await getFoodAndBeer();
      this.setSuccess(data);
    } catch (error) {
      console.log(error);
      this.setError();
    }
  };

  handleSubmission = async (beer, food, location) => {
    this.setLoading();

    try {
      const data = await submissionFetch(beer, food, location);
      console.log(data);
      this.setResults(data);
    } catch (error) {
      this.setError();
      console.log(error);
    }
  };

  setLoading = () => {
    this.setState({ status: "loading" });
  };

  setError = () => {
    this.setState({ status: "error" });
  };

  setResults = data => {
    this.setState({
      results: data,
      status: "results"
    });
  };

  setSuccess = data => {
    window.setTimeout(() => {
      this.setState({
        data,
        status: "success"
      });
    }, 3000);
  };

  searchAgain = () => {
    this.setState({
      results: null,
      status: "success"
    });
  };

  render() {
    const { status, data } = this.state;
    return (
      <div className="App">
        {this.state.data && this.state.status !== "results" && (
          <Chooser
            handleSubmission={this.handleSubmission}
            foodOptions={this.state.data.foodOptions}
            beerOptions={this.state.data.beerOptions}
          />
        )}

        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "results" && (
          <Results data={this.state.results} searchAgain={this.searchAgain} />
        )}
        {status !== "results" && (
          <img
            src={logo}
            alt="brews and grub logo"
            className="bag-loading__logo"
          />
        )}
      </div>
    );
  }
}

export default App;
