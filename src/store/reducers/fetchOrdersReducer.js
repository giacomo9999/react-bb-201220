import * as actionTypes from "../actions/actionTypes";

const initialState = { orders: [], error: false };

const fetchOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_FAILURE:
      return { ...state, error: true };
    case actionTypes.SET_ORDERS:
      return { ...state, orders: action.orders, error: false };
    default:
      return state;
  }
};

export default fetchOrdersReducer;
