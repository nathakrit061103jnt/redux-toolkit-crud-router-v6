import axios from "axios";
import { getCookie } from "./cookie";
import { API_URL } from "../Constants";

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token != null) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(JSON.stringify(error, undefined, 2));
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject({
        code: "NOT_CONNECT_NETWORK",
        message: "NETWORK_CONNECTION_MESSAGE",
      });
    }
    return Promise.reject(error);
  }
);

export default httpClient;
