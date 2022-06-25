import axios from "axios";
import authHeader from "services/authHeader";
axios.defaults.withCredentials = true;

const serverUrl = "http://localhost:8080"; // change to http://annual-accounts.co.ke before running build file.

export const registerUserApi = async (regData) => {
  return await axios.post(`${serverUrl}/api/auth/signup`, regData);
};

export const signinUserApi = async (loginData) => {
  return await axios.post(`${serverUrl}/api/auth/signin`, loginData);
};

// Profile APIs
export const createProfileApi = async (profile) => {
  return await axios.post(`${serverUrl}/api/profile/create`, profile, {
    headers: authHeader(),
  });
};
