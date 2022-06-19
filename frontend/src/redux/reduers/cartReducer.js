import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    },
  },
  reducers: {
    cartAddItem: (state, action) => {
      //add to cart
      const newItem = action.payload;
      const exitItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = exitItem
        ? state.cart.cartItems.map((item) =>
            item._id === exitItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      // เก็บข้อมูลลงใน localstorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    },
    cartRemoveItem: (state, action) => {
      const newCartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    },
  },
});

export const { cartAddItem, cartRemoveItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;