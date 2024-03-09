// Trong file transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    list: [],
    consumptionLimit: null, 
    consumptionLimitWeek: null,
    consumptionLimitMonth: null,
    consumptionLimitYear: null,
  },
  reducers: {
    addTransaction: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.list.splice(action.payload, 1); // Xoá mục dữ liệu tại index được chỉ định
    },
    setConsumptionLimit: (state, action) => {
      state.consumptionLimit = action.payload; // Đặt giá trị hạn mức chi tiêu Day từ action payload
    },
    setConsumptionLimitWeek: (state, action) => {
      state.consumptionLimitWeek = action.payload; // Đặt giá trị hạn mức chi tiêu Week từ action payload
    },
    setConsumptionLimitMonth: (state, action) => {
      state.consumptionLimitMonth = action.payload; // Đặt giá trị hạn mức chi tiêu Month từ action payload
    },
    setConsumptionLimitYear: (state, action) => {
      state.consumptionLimitYear = action.payload; // Đặt giá trị hạn mức chi tiêu Month từ action payload
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  setConsumptionLimit,
  setConsumptionLimitWeek,
  setConsumptionLimitMonth,
  setConsumptionLimitYear,
} = transactionSlice.actions;

export default transactionSlice.reducer;
