import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenses: [] };

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    createExpense: (state, { payload }) => {
      state.expenses = [...payload];
    },
    fetchExpenses: (state, { payload }) => {
      state.expenses = [...payload];
    },
  },
});

export const { createExpense, fetchExpenses } = expenseSlice.actions;

export default expenseSlice.reducer;
