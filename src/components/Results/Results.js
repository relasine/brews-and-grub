import React from "react";
import "./Results.scss";
import Card from "../Card/Card";
import { Button } from "terra-component-lib";

const Results = ({ data, searchAgain }) => {
  const renderCard = (card, bool) => {
    if (bool) {
      return <Card card={card} beers={data[0].beers || []} />;
    } else {
      return <Card card={card} />;
    }
  };

  return (
    <main className="bag-Results">
      <p className="bag-Results__header">
        Your ideal pairing of food and drink:
      </p>
      <div className="bag-Results__cards">
        {data[0] && data[0].food_truck && renderCard(data[0].food_truck)}
        {data[0] && data[0].brewery && renderCard(data[0].brewery, true)}
        {!data[0] && <p>Sorry! No matching results for that combination!</p>}
      </div>
      <Button
        text="search again"
        onClick={() => searchAgain()}
        className="ter-button--primary--1"
      />
    </main>
  );
};

export default Results;
