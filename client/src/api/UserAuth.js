import Axios from "axios";

let BASE_URL = process.env.REACT_APP_SERVER_URL;
BASE_URL = BASE_URL + "/user";

export const UserSignIn = async (body) => {
  const URL = BASE_URL + "/signin";

  return await Axios.post(URL, body);
};

export const UserSignUp = async (body) => {
  console.info(body);
  const URL = BASE_URL + "/signup";

  return await Axios.post(URL, body);
};
