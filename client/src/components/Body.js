import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Body = () => {
  const { FetchDetails } = useContext(UserContext);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      FetchDetails(token);
    }
  }, []);
  return (
    <div>
      <h1>Body</h1>
    </div>
  );
};

export default Body;
