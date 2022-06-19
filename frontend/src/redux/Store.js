import { sessionReducer } from "redux-react-session";
import fetchReducer from "./reduers/fetchReducer.js";
import productReducer from "./reduers/fetchData.js";
import { configureStore } from "@reduxjs/toolkit";
import { sessionService } from "redux-react-session";
import { cartReducer } from "./reduers/cartReducer";
const Store = configureStore({
  reducer: {
    session: sessionReducer,
    fetchReducer,
    product: productReducer,
    myCart: cartReducer,
  },
});

sessionService.initSessionService(Store);

export default Store;
