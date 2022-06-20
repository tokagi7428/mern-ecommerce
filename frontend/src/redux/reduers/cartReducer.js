import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingAddress: localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : [],
      paymentMethod: localStorage.getItem("paymentMethod")
        ? localStorage.getItem("paymentMethod")
        : "",
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
    SAVE_SHIPPING_ADDRESS: (state, action) => {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    },
    SAVE_PAYMENT_METHOD: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    },
  },
});

export const {
  cartAddItem,
  cartRemoveItem,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
