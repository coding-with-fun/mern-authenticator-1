import React from "react";

const Footer = () => {
  return (
    <nav className="navbar footer fixed-bottom navbar-dark d-flex justify-content-center">
      <div className="navbar-brand">
        Made with{" "}
        <span>
          <i className="fas fa-heart"></i>
        </span>{" "}
        and{" "}
        <span>
          <i className="fas fa-mug-hot"></i>
        </span>{" "}
        by <a href="https://github.com/harsh2124/">Harsh Patel</a>
      </div>
    </nav>
  );
};

export default Footer;
