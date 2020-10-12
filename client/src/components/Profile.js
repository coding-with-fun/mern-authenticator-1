import React from "react";
import { Redirect } from "react-router-dom";

const Profile = () => {
  const localToken = localStorage.getItem("token");

  return (
    <div className="">
      {!localToken ? (
        <Redirect to="/404" />
      ) : (
        <>
          <h1>Profile</h1>
        </>
      )}
    </div>
  );
};

export default Profile;
