import React, { createContext, useEffect, useState } from "react";
import { UserSignIn, UserSignUp } from "../api/UserAuth";
import { UserDetails } from "../api/UserData";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    FetchDetails(localToken);
  }, []);

  const SignInUser = async (body, history) => {
    UserSignIn(body)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUserData({
          token: res.data.token,
        });

        FetchDetails(res.data.token);
        history.push("/");
      })
      .catch((error) => console.error(error.response));
  };

  const SignUpUser = async (body, history) => {
    UserSignUp(body)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUserData({
          token: res.data.token,
        });

        FetchDetails(res.data.token);
        history.push("/");
      })
      .catch((error) => console.error(error.response));
  };

  const SignOutUser = (history) => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.removeItem("token");
    history.push("/");
  };

  const FetchDetails = async (token) => {
    if (token) {
      UserDetails(token)
        .then((res) => {
          setUserData({
            user: res.data,
          });
        })
        .catch((error) => console.error(error.response));
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, SignInUser, SignUpUser, SignOutUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
