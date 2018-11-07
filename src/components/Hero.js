import React from "react";

const Hero = ({ title, subtitle, size = "medium", children }) => (
  <header className={`hero is-${size} is-light`}>
    <div className="hero-body">
      <div className="container has-text-centered">
        {title && <h1 className="title is-2">{title}</h1>}
        {subtitle && <p className="subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  </header>
);

export default Hero;
