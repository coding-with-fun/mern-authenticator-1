import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import validateEmail from "../shared/validateEmail";

const Profile = () => {
  const localToken = localStorage.getItem("token");
  const { userData } = useContext(UserContext);
  const data = userData.user?.body;

  const { UpdateUser } = useContext(UserContext);
  const history = useHistory();

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

  useEffect(() => {
    setUserDisplayName(data?.displayName);
    setUserEmail(data?.email);
  }, [data]);

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
          if (!validateEmail(userEmail)) {
            setErrorEmailMessage("Invalid email address.");
          } else {
            if (userPassword && userPassword.length < 5) {
              setErrorPasswordMessage(
                "Password needs to be at least 5 characters long."
              );
            } else {
              if (userConfirmPassword && userConfirmPassword.length < 5) {
                setErrorConfirmPasswordMessage(
                  "Password needs to be at least 5 characters long."
                );
              } else {
                if (
                  userPassword &&
                  userConfirmPassword &&
                  userPassword !== userConfirmPassword
                ) {
                  setErrorConfirmPasswordMessage("Password does not match.");
                } else {
                  let body = {
                    displayName: userDisplayName,
                    email: userEmail,
                  };

                  if (userPassword && userConfirmPassword) {
                    body.password = userPassword;
                  }

                  UpdateUser(body, history);
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
    <div className="update_form">
      {!localToken ? (
        <Redirect to="/404" />
      ) : !data ? null : (
        <>
          <div className="form__content">
            <div className="form__header">Update Account</div>
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
                Update
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
