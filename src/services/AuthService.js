import httpClient from "../utils/httpClient";
import { api } from "../Constants";

const authSingIn = (data) => {
  return httpClient.post(api.SIGN_IN_URL, data);
};

const authSingUp = (data) => {
  return httpClient.post(api.SIGN_UP_URL, data);
};

const AuthService = {
  authSingIn,
  authSingUp,
};

export default AuthService;
