import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Body = () => {
  const { userData, FetchDetails } = useContext(UserContext);

  const fetchUserDetails = () => {
    const localUserToken = localStorage.getItem("token");
    if (localUserToken) {
      FetchDetails(localUserToken);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return <div>{userData ? <h1>Body</h1> : <h1>Guest</h1>}</div>;
};

export default Body;
