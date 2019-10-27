import React from "react";
import "./Hero.scss";
import HeroImage from "../../images/hero-img.png";
import logo from "../../images/logo.png";

const Hero = () => {
  const styles = {
    backgroundImage: `url(${HeroImage})`
  };
  return (
    <section style={styles} className="bag-hero">
      <img src={logo} alt="logo" />
    </section>
  );
};

export default Hero;
