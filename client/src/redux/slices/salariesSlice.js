import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salaries: {},
  allSalaries: [],
};

export const salariesSlice = createSlice({
  name: "salaries",
  initialState,
  reducers: {
    postSalaries: (state, { payload }) => {
      state.salaries = payload;
      state.allSalaries = [...payload];
    },
    fetchAllSalaries: (state, payload) => {
      state.allSalaries = [...payload];
    },
    companySalaries: (state, { payload }) => {
      state.salaries = payload;
    },
  },
});

export const { postSalaries, fetchAllSalaries, companySalaries } =
  salariesSlice.actions;
export default salariesSlice.reducer;
