import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get("/api/products");
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoading: false,
    error: "",
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer;
