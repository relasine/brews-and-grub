import React from "react";
import "./Loading.scss";
import beerGif from "../../images/beer.gif";

const Loading = () => {
  return (
    <main className="bag-loading">
      <h4 className="bag-loading__header">
        Connecting you with your food and beverage experience...
      </h4>
      <img
        className="bag-loading__image"
        src={beerGif}
        alt="animated beer glasses with faces"
      />
    </main>
  );
};

export default Loading;
