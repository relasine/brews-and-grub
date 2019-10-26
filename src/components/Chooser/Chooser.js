import React, { Component } from "react";
import "./Chooser.scss";

class Chooser extends Component {
  constructor() {
    super();

    this.state = {
      location: null,
      food: null,
      beer: null
    };
  }

  render() {
    return <main className="bag-chooser"></main>;
  }
}

export default Chooser;
