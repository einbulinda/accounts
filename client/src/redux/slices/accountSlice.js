import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
  categories: [],
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    createAccount: (state, { payload }) => {
      state.accounts.push(payload);
      allCategories();
    },
    allCategories: (state, { payload }) => {
      state.categories = [...payload];
    },
    allAccounts: (state, { payload }) => {
      state.accounts = [...payload];
    },
  },
});

export const { allCategories, allAccounts, createAccount } =
  accountSlice.actions;
export default accountSlice.reducer;
