import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import { sessionService } from "redux-react-session";
import rootReducer from "./reduers/rootReducer";

const initialState = {};
const middlewares = [thunk];
const Store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);

sessionService.initSessionService(Store);

export default Store;
