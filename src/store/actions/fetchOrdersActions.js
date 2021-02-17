import axios from "../../axios-orders";

import * as actionTypes from "./actionTypes";

export const setOrders = (orders) => {
  return { type: actionTypes.SET_ORDERS, orders: orders };
};

export const fetchOrdersFailed = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
  };
};

export const initOrders = () => {
  return (dispatch) => {
    axios
      .get("orders.json")
      .then((res) => dispatch(setOrders(res.data)))
      .catch((err) => dispatch(fetchOrdersFailed()));
  };
};
