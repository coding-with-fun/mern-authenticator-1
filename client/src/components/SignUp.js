import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import validateEmail from "../shared/validateEmail";

const SignUp = () => {
  const [userDisplayName, setUserDisplayName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  const [errorDisplayNameMessage, setErrorDisplayNameMessage] = useState(null);
  const [errorEmailMessage, setErrorEmailMessage] = useState(null);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState(null);
  const [
    errorConfirmPasswordMessage,
    setErrorConfirmPasswordMessage,
  ] = useState(null);

  const { SignUpUser } = useContext(UserContext);
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.id === "userDisplayName") {
      setErrorDisplayNameMessage(null);
      setErrorEmailMessage(null);
      setErrorPasswordMessage(null);
      setErrorConfirmPasswordMessage(null);
      setUserDisplayName(e.target.value);
    }

    if (e.target.id === "userEmail") {
      setErrorDisplayNameMessage(null);
      setErrorEmailMessage(null);
      setErrorPasswordMessage(null);
      setErrorConfirmPasswordMessage(null);
      setUserEmail(e.target.value);
    }

    if (e.target.id === "userPassword") {
      setErrorDisplayNameMessage(null);
      setErrorEmailMessage(null);
      setErrorPasswordMessage(null);
      setErrorConfirmPasswordMessage(null);
      setUserPassword(e.target.value);
    }

    if (e.target.id === "userConfirmPassword") {
      setErrorDisplayNameMessage(null);
      setErrorEmailMessage(null);
      setErrorPasswordMessage(null);
      setErrorConfirmPasswordMessage(null);
      setUserConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = () => {
    try {
      if (!userDisplayName) {
        setErrorDisplayNameMessage("Please fill in display name");
      } else {
        if (!userEmail) {
          setErrorEmailMessage("Please fill in email address.");
        } else {
          if (!userPassword) {
            setErrorPasswordMessage("Please fill in password.");
          } else {
            if (!userConfirmPassword) {
              setErrorConfirmPasswordMessage(
                "Please fill in confirm password."
              );
            } else {
              if (!validateEmail(userEmail)) {
                setErrorEmailMessage("Invalid email address.");
              } else {
                if (userPassword.length < 5) {
                  setErrorPasswordMessage(
                    "Password needs to be at least 5 characters long."
                  );
                } else {
                  if (userConfirmPassword.length < 5) {
                    setErrorConfirmPasswordMessage(
                      "Password needs to be at least 5 characters long."
                    );
                  } else {
                    if (userPassword !== userConfirmPassword) {
                      setErrorConfirmPasswordMessage(
                        "Password does not match."
                      );
                    } else {
                      const body = {
                        displayName: userDisplayName,
                        email: userEmail,
                        password: userPassword,
                        confirmPassword: userConfirmPassword,
                      };

                      SignUpUser(body, history);
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup_form">
      <div className="form__content">
        <div className="form__header">Please Sign Up</div>
        <form autoComplete="off">
          <div className="form-group">
            <label htmlFor="userDisplayName">Name</label>
            <input
              type="text"
              className="form-control"
              value={userDisplayName}
              onChange={(e) => handleChange(e)}
              id="userDisplayName"
              autoComplete="off"
              aria-describedby="displayNameHelp"
              autoFocus
              required
            />
            <small
              id="displayNameHelp"
              className={`form-text text-muted ${
                errorDisplayNameMessage ? "visible" : "invisible"
              }`}
            >
              {errorDisplayNameMessage}
            </small>
          </div>
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
          <div className="form-group">
            <label htmlFor="userConfirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={userConfirmPassword}
              id="userConfirmPassword"
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              aria-describedby="confirmPasswordHelp"
              required
            />
            <small
              id="confirmPasswordHelp"
              className={`form-text text-muted ${
                errorConfirmPasswordMessage ? "visible" : "invisible"
              }`}
            >
              {errorConfirmPasswordMessage}
            </small>
          </div>
          <div className="btn btn-primary" onClick={handleSubmit}>
            Sign Up
          </div>
        </form>
      </div>
      <div className="path_to_signin">
        Already have a account? <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
