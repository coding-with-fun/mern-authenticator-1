import Axios from "axios";

let BASE_URL = process.env.REACT_APP_SERVER_URL;

export const UserDetails = async (token) => {
  const URL = BASE_URL + "/details";
  const headers = {
    "x-auth-token": token,
  };

  return await Axios.get(URL, { headers: headers });
};
