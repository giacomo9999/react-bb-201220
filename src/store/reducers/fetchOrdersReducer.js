import * as actionTypes from "../actions/actionTypes";

const initialState = { orders: [], loading: false, error: false };

const fetchOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_FAILURE:
      return { ...state, error: true, loading: false };
    case actionTypes.FETCH_ORDERS_START:
      return { ...state, loading: true };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      console.log("Reducer setting orders...");
      return { ...state, orders: action.orders, loading: false, error: false };
    default:
      return state;
  }
};

export default fetchOrdersReducer;
