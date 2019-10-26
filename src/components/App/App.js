import React, { Component } from "react";
import "./App.scss";
import submissionFetch from "../../utils/async/submissionFetch";

import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import Results from "../Results/Results";
import Chooser from "../Chooser/Chooser";

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      status: "start"
    };
  }

  handleSubmission = async (beer, food, location) => {
    this.setLoading();

    try {
      const data = await submissionFetch(beer, food, location);
      this.setSuccess(data);
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

  setSuccess = data => {
    this.setState({
      data,
      status: "success"
    });
  };

  render() {
    const { status, data } = this.state;
    return (
      <div className="App">
        <p>Beers and Grub</p>
        <Chooser handleSubmission={this.handleSubmission} />
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "results" && <Results data={data} />}
      </div>
    );
  }
}

export default App;
