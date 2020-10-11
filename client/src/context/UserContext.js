import React, { createContext, useState } from "react";
import { UserSignIn } from "../api/UserAuth";
import { UserDetails } from "../api/UserData";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userToken, setUserToken] = useState("");
  const token = localStorage.getItem("token");

  const SignInUser = async (body, history) => {
    UserSignIn(body)
      .then((res) => {
        if (!token) {
          localStorage.setItem("token", res.data.token);
          setUserToken(res.data.token);
        } else {
          setUserToken(token);
        }
        console.info(token);
        history.push("/");
      })
      .catch((error) => console.error(error.response));
  };

  const FetchDetails = async (token) => {
    UserDetails(token)
      .then((res) => {
        console.info(res);
      })
      .catch((error) => console.error(error.response));
  };

  return (
    <UserContext.Provider value={{ userToken, SignInUser, FetchDetails }}>
      {props.children}
    </UserContext.Provider>
  );
};
