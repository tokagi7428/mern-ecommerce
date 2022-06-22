import { sessionReducer } from "redux-react-session";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import fetchReducer from "./reduers/fetchReducer.js";
import productReducer from "./reduers/fetchData.js";
import { configureStore } from "@reduxjs/toolkit";
import { sessionService } from "redux-react-session";
import { cartReducer } from "./reduers/cartReducer";
// import { orderReducer } from "./reduers/orderReducer";
const middlewares = [thunk];
const Store = configureStore(
  {
    reducer: {
      session: sessionReducer,
      fetchReducer,
      product: productReducer,
      myCart: cartReducer,
    },
  },
  compose(applyMiddleware(...middlewares))
);

sessionService.initSessionService(Store);

export default Store;
