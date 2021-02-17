import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../store/actions/actionIndex";

class Orders extends Component {
  // state = { orders: [], loading: true };
  componentDidMount() {
    this.props.onInitOrders();
    // axios
    //   .get("orders.json")
    //   .then((res) => {
    //     const fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({ ...res.data[key], id: key });
    //     }
    //     console.log("Fetched orders: ", fetchedOrders);
    //     this.setState({ loading: false, orders: fetchedOrders });
    //   })
    //   .catch((err) => {
    //     console.log("Orders caught an error: ", err);
    //     this.setState({ loading: false });
    //   });
  }
  render() {
    console.log(this.props.orders);
    return (
      <div>
        {/* {this.props.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { orders: state.fetchOrders.orders, error: state.fetchOrders.error };
};

const mapDispatchToProps = (dispatch) => {
  return { onInitOrders: () => dispatch(actions.initOrders()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
