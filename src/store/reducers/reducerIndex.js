import { combineReducers } from "redux";

import bBReducer from "./bBReducer";
import orderReducer from "./bBReducer";

const rootReducer = combineReducers({
  burgerBuilder: bBReducer,
  orders: orderReducer,
});

export default rootReducer;
