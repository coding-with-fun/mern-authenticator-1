import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { userData } = useContext(UserContext);

  return (
    <div className="container">
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
