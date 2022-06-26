import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyVat: {},
  allVat: [],
  created: "",
};

export const vatSlice = createSlice({
  name: "vat",
  initialState,
  reducers: {
    createVatData: (state, { payload }) => {
      state.companyVat = payload;
      state.allVat = [...payload];
    },
    fetchAllVatData: (state, { payload }) => {
      state.allVat = [...payload];
    },
    fetchVatByPin: (state, { payload }) => {
      state.companyVat = payload;
    },
  },
});

export const { createVatData, fetchAllVatData, fetchVatByPin } =
  vatSlice.actions;

export default vatSlice.reducer;
