import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Body = () => {
  const { userData } = useContext(UserContext);

  return (
    <div>
      {userData.user ? (
        <h1>{userData.user.body.displayName}</h1>
      ) : (
        <h1>Welcome Guest</h1>
      )}
    </div>
  );
};

export default Body;
