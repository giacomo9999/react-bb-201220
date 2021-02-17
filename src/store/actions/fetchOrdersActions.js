import axios from "../../axios-orders";

import * as actionTypes from "./actionTypes";

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersFailed = (err) => {
  console.log("Fetch orders failed...", err);
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
  };
};

export const setOrders = (orders) => {
  return { type: actionTypes.SET_ORDERS, orders: orders };
};

export const initOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get("orders.json")
      .then((res) => dispatch(setOrders(res.data)))
      .catch((err) => dispatch(fetchOrdersFailed(err)));
  };
};
