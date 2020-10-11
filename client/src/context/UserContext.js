import React, { createContext, useEffect, useState } from "react";
import { UserSignIn } from "../api/UserAuth";
import { UserDetails } from "../api/UserData";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState(null);

  let token = localStorage.getItem("token");

  useEffect(() => {
    setUserToken(token);
  }, [token]);

  const SignInUser = async (body, history) => {
    UserSignIn(body)
      .then((res) => {
        if (!token) {
          localStorage.setItem("token", res.data.token);
          setUserToken(res.data.token);
        } else {
          setUserToken(token);
        }
        history.push("/");
      })
      .catch((error) => console.error(error.response));
  };

  const FetchDetails = async (token) => {
    console.info("object");
    UserDetails(token)
      .then((res) => {
        console.info(res);
        setUserData(res.data);
      })
      .catch((error) => console.error(error.response));
  };

  return (
    <UserContext.Provider
      value={{ userToken, userData, setUserToken, SignInUser, FetchDetails }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
