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
export const fetchAllProfilesApi = async () => {
  return await axios.get(`${serverUrl}/api/profile/all-profiles`, {
    headers: authHeader(),
  });
};

// Accounts APIs
export const fetchAccountTypes = async () => {
  return await axios.get(`${serverUrl}/api/accounts/categories`, {
    headers: authHeader(),
  });
};

export const fetchMainAccounts = async () => {
  return await axios.get(`${serverUrl}/api/accounts/all-accounts`, {
    headers: authHeader(),
  });
};

export const createAccountApi = async (account) => {
  return await axios.post(`${serverUrl}/api/accounts/create`, account, {
    headers: authHeader(),
  });
};

// VAT APIs
export const saveVatDataApi = async (vat) => {
  return await axios.post(`${serverUrl}/api/vat/create`, vat, {
    headers: authHeader(),
  });
};

// Salaries APIs
export const createSalariesApi = async (salaries) => {
  return await axios.post(`${serverUrl}/api/salaries/create`, salaries, {
    headers: authHeader(),
  });
};

// expenses APIS
export const createExpenseApi = async (expense) => {
  return await axios.post(`${serverUrl}/api/expense/create`, expense, {
    headers: authHeader(),
  });
};

export const fetchAllExpensesApi = async () => {
  return await axios.get(`${serverUrl}/api/expenses/all-expenses`, {
    headers: authHeader(),
  });
};
