import React from "react";
import "./Card.scss";
import { ButtonLink } from "terra-component-lib";

const Card = ({ card, beers }) => {
  const {
    image_url,
    name,
    street,
    city,
    phone,
    url,
    price_range,
    rating,
    review_count,
    zip_code,
    state,
    food_truck_type
  } = card;

  const backgroundImage = {
    backgroundImage: `url(${image_url ||
      "https://fpoimg.com/300x200?text=No%20Image"})`
  };

  const renderBeers = () => {
    return beers.map((beer, index) => {
      if (beers.length > index + 1) {
        return (
          <span className="bag-card__beer" key={beer}>
            {`${beer.name}, `}
          </span>
        );
      } else {
        return (
          <span className="bag-card__beer" key={beer}>
            {`${beer.name}`}
          </span>
        );
      }
    });
  };

  return (
    <article className="bag-card" style={url && { paddingBottom: "60px" }}>
      <div className="bag-card__image" style={backgroundImage} />
      <section className="bag-card__content">
        {name && <h5 className="bag-card__name">{name}</h5>}
        {food_truck_type && (
          <p className="bag-card__food-truck-type">
            <span>Truck type:</span> {food_truck_type}
          </p>
        )}
        {beers && (
          <>
            <p className="bag-card__beer-label">beers:</p>
            <p className="bag-card__beers">{renderBeers()}</p>
          </>
        )}
        {street && <p className="bag-card__location top-loc">{street}</p>}
        {city && state && zip_code && (
          <p className="bag-card__location bottom-loc">
            {city}, {state} {zip_code}
          </p>
        )}
        {phone && <p className="bag-card__phone">{phone}</p>}
        {price_range && (
          <p className="bag-card__price-range">
            <span>price range:</span> {price_range}
          </p>
        )}
        {rating && (
          <p className="bag-card__rating">
            <span>rating:</span> {rating}
          </p>
        )}
        {review_count && (
          <p className="bag-card__review-count">
            <span>review count:</span> {review_count}
          </p>
        )}
        {url && (
          <ButtonLink
            className="ter-button--secondary--1"
            text="Website"
            url={url}
          />
        )}
      </section>
    </article>
  );
};

export default Card;
