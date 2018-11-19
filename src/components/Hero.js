import React from "react";

//Hvor kommer subtitle fra? Stripe? "description"?Svar:  Ja

const Hero = ({ title, subtitle, size = "medium", children }) => (
  <header className={`hero is-${size} is-light`}>
    <div className="hero-body">
      <div className="container has-text-centered">
        <img
          src="https://studio5dekor.no/wp-content/uploads/2013/08/Ny-logo-45-mm.png"
          alt="studio5dekor, studio 5 dekor, Susanne Schwarz Hoset"
        />

        {subtitle && <p className="subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  </header>
);

//  {title && <h1 className="title is-2">{title}</h1>}
// deleted from line 13

export default Hero;
