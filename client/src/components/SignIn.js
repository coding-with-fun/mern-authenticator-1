import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignIn extends Component {
  render() {
    return (
      <div className="signin_form">
        <div className="form__content">
          <div className="form__header">Please Sign In</div>
          <form autoComplete="off">
            <div className="form-group">
              <label htmlFor="userEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="userEmail"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="userPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="userPassword"
                autoComplete="off"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>
        </div>
        <div className="path_to_signup">
          Don't have a account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}

export default SignIn;
