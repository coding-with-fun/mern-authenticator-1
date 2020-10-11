import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import Logo from "../assets/authentication.png";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { userToken } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
  };

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
              {userToken ? (
                <>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link
                    to="/home"
                    className="dropdown-item"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <div className="dropdown-divider"></div>
                  <Link to="/signin" className="dropdown-item">
                    Sign In
                  </Link>
                  <Link to="/signup" className="dropdown-item">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
