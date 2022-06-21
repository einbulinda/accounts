import axios from "axios";
axios.defaults.withCredentials = true;

const serverUrl = "http://localhost:8080/api/";

export const registerUserApi = async (regData) => {
  return await axios.post(`${serverUrl}auth/signup`, regData);
};

export const signinUserApi = async (loginData) => {
  return await axios.post(`${serverUrl}auth/signin`, loginData);
};
