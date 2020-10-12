import React, { createContext, useEffect, useState } from "react";
import { UpdateUserDetails, UserSignIn, UserSignUp } from "../api/UserAuth";
import { FetchUserDetails } from "../api/UserData";

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
      .catch((error) => {
        console.error(error.response);
      });
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
      .catch((error) => {
        console.error(error.response);
      });
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
      FetchUserDetails(token)
        .then((res) => {
          setUserData({
            user: res.data,
          });
        })
        .catch((error) => {
          console.error(error.response);
          localStorage.removeItem("token");
        });
    }
  };

  const UpdateUser = async (body, history) => {
    const localToken = localStorage.getItem("token");
    UpdateUserDetails(body, localToken)
      .then((res) => {
        FetchDetails(localToken);
        history.push("/");
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  return (
    <UserContext.Provider
      value={{ userData, SignInUser, SignUpUser, SignOutUser, UpdateUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
