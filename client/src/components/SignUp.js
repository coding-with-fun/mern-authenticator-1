import React, { Component } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="signup_form">
      <div className="form__content">
        <div className="form__header">Please Sign Up</div>
        <form autoComplete="off">
          <div className="form-group">
            <label htmlFor="displayName">Name</label>
            <input
              type="text"
              className="form-control"
              id="displayName"
              autoComplete="off"
              required
            />
          </div>
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
            Sign Up
          </button>
        </form>
      </div>
      <div className="path_to_signin">
        Already have a account? <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
