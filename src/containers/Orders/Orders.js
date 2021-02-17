import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../store/actions/actionIndex";

class Orders extends Component {
  componentDidMount() {
    this.props.onInitOrders();
  }

  render() {
    let ordersDisplay;
    if (this.props.orders.length > 0) {
      ordersDisplay = (
        <div>
          {this.props.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      );
    } else if (this.props.error) {
      ordersDisplay = <p>Orders Can't Be Loaded</p>;
    } else {
      ordersDisplay = <Spinner />;
    }
    return ordersDisplay;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.fetchOrders.orders,
    loading: state.fetchOrders.loading,
    error: state.fetchOrders.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { onInitOrders: () => dispatch(actions.initOrders()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
