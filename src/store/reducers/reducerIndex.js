import { combineReducers } from "redux";

import bBReducer from "./bBReducer";
import orderReducer from "./orderReducer";
import fetchOrdersReducer from "./fetchOrdersReducer";

const rootReducer = combineReducers({
  burgerBuilder: bBReducer,
  orders: orderReducer,
  fetchOrders: fetchOrdersReducer,
});

export default rootReducer;
