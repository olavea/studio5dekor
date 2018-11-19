import React from "react";

//Hvor kommer subtitle fra? Stripe? "description"?Svar:  Ja

const Hero = ({ title, subtitle, size = "medium", children }) => (
  <header className={`hero is-${size} is-light`}>
    <div className="hero-body">
      <div className="container has-text-centered">
        <img
          src="http://stories.olavea.com/static/olaveap%C3%A5FbogTwitterSmalere.7b0a4de6.png"
          alt="Ola Vea Shop, Benedicte Raae"
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
