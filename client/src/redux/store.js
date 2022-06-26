import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice";
import authSlice from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";
import vatSlice from "./slices/vatSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    accounts: accountSlice,
    vat: vatSlice,
  },
});
