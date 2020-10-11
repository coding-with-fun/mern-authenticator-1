import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/authentication.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand fixed-top navbar-dark">
      <Link to="/" className="navbar-brand">
        <img src={Logo} alt="" />
      </Link>
      <div className="navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user"></i>
            </div>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to="/" className="dropdown-item">
                Home
              </Link>
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="/" className="dropdown-item">
                Sign Out
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
