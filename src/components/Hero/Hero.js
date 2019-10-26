import React from "react";
import "./Hero.scss";
import HeroImage from "../../images/hero-img.png";

const Hero = () => {
  const styles = {
    backgroundImage: `url(${HeroImage})`
  };
  return <section style={styles} className="bag-hero"></section>;
};

export default Hero;
