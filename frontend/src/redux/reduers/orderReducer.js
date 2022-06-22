import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    error: "",
    loading: true,
    loadingPay: true,
    successPay: false,
  },

  reducers: {
    FETCH_REQUEST: (state, action) => {
      return { ...state, loading: true, error: "" };
    },
    FETCH_SUCCESS: (state, action) => {
      return { ...state, order: action.payload, loading: false, error: "" };
    },
    FETCH_FAILED: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    PAY_REQUEST: (state, action) => {
      return { ...state, loadingPay: true };
    },
    PAY_SUCCESS: (state, action) => {
      return { ...state, loadingPay: false, successPay: true };
    },
    PAY_RESET: (state, action) => {
      return { ...state, loadingPay: false, successPay: false };
    },
    PAY_FAILED: (state, action) => {
      return { ...state, loadingPay: false };
    },
  },
});

export const {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED,
  PAY_REQUEST,
  PAY_SUCCESS,
  PAY_RESET,
  PAY_FAILED,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
