import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {},
  profiles: [],
  message: {},
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    createProfile: (state, { payload }) => {
      state.profile = payload;
      state.profiles.push(payload);
      state.message = payload.message;
    },
    fetchProfile: (state, { payload }) => {
      state.profile = payload;
    },
    fetchProfiles: (state, { payload }) => {
      state.profiles = payload;
    },
  },
});

export const { createProfile, fetchProfile, fetchProfiles } =
  profileSlice.actions;

export default profileSlice.reducer;
