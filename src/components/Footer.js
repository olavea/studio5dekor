import React from "react";
//import Link from "link";

const Footer = ({ children }) => (
  <footer className="footer has-text-centered">
    {children}

    <p>
      <a href="https://lillylabs.no">www.lillylabs.no,</a>
    </p>
  </footer>
);
//<p>'Vi gjør andre ting også, se:'</p>
//Hvordan får jeg mellomrom?
//const linkToWebsite = () => {
// "https://studio5dekor.no/" https://studio5dekor.no/
//};

//const linkToFacebook = () => {
// "studio5dekor på facebook" https://fb.com/studio5dekor.no/
//};
// was at line 7
//    <p>
//      <a href="https://www.facebook.com/Studio-5-Dekor-as-290884624375196/">
//        Studio 5 Dekor as på facebook
//      </a>
//    </p>


export default Footer;
