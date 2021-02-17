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

export const fetchOrdersSuccess = (data) => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, orders: data };
};

export const initOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get("orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => dispatch(fetchOrdersFailed(err)));
  };
};
