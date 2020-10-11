import Axios from "axios";

let BASE_URL = process.env.REACT_APP_SERVER_URL;
BASE_URL = "/user";

export const UserSignIn = async (body) => {
  const URL = BASE_URL + "/signin";

  return await Axios.post(URL, body);
};
