import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import validateEmail from "../shared/validateEmail";

const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState(null);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState(null);

  const { SignInUser } = useContext(UserContext);
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.id === "userEmail") {
      setErrorEmailMessage(null);
      setErrorPasswordMessage(null);
      setUserEmail(e.target.value);
    }

    if (e.target.id === "userPassword") {
      setErrorEmailMessage(null);
      setErrorPasswordMessage(null);
      setUserPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!validateEmail(userEmail)) {
        setErrorEmailMessage("Invalid email address.");
      } else {
        if (userPassword.length < 5) {
          setErrorPasswordMessage(
            "Password needs to be at least 5 characters long."
          );
        } else {
          const body = {
            email: userEmail,
            password: userPassword,
          };

          SignInUser(body, history);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signin_form">
      <div className="form__content">
        <div className="form__header">Please Sign In</div>
        <form autoComplete="off">
          <div className="form-group">
            <label htmlFor="userEmail">Email address</label>
            <input
              type="text"
              className="form-control"
              value={userEmail}
              onChange={(e) => handleChange(e)}
              id="userEmail"
              autoComplete="off"
              aria-describedby="emailHelp"
              autoFocus
              required
            />
            <small
              id="emailHelp"
              className={`form-text text-muted ${
                errorEmailMessage ? "visible" : "invisible"
              }`}
            >
              {errorEmailMessage}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              className="form-control"
              value={userPassword}
              onChange={(e) => handleChange(e)}
              id="userPassword"
              autoComplete="off"
              aria-describedby="passwordHelp"
              required
            />
            <small
              id="passwordHelp"
              className={`form-text text-muted ${
                errorPasswordMessage ? "visible" : "invisible"
              }`}
            >
              {errorPasswordMessage}
            </small>
          </div>
          <div className="btn btn-primary" onClick={handleSubmit}>
            Sign In
          </div>
        </form>
      </div>
      <div className="path_to_signup">
        Don't have a account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
