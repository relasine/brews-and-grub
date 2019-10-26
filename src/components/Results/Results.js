import React from "react";
import "./Results.scss";
import Card from "../Card/Card";

const Results = ({ data }) => {
  const renderCard = card => {
    return <Card card={card} />;
  };

  return (
    <main className="bag-Results">
      <p className="bag-Results__header">
        Your ideal pairing of food and drink:
      </p>
      <div className="bag-Results__cards">
        {renderCard(data[0].food_truck)}
        {renderCard(data[0].brewery)}
      </div>
    </main>
  );
};

export default Results;
