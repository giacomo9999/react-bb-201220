import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../src/hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

// import * as actionTypes from "../../store/actions/actionTypes";
import * as actions from "../../store/actions/actionIndex";

class BurgerBuilder extends Component {
  state = {
    checkingOut: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  checkOut = () => {
    this.setState({ checkingOut: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({
      checkingOut: false,
    });
  };

  continuePurchaseHandler = () => {
    this.props.history.push("/checkout");
  };

  updatePurchaseState = (ingredArray) => {
    let purchaseable = false;
    for (let i in ingredArray) {
      if (ingredArray[i] >= 1) {
        purchaseable = true;
      }
    }
    return purchaseable;
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients Can't Be Loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.updatePurchaseState(this.props.ingredients)}
            checkOut={this.checkOut}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          ingredients={this.props.ingredients}
          cancelClick={this.cancelPurchaseHandler}
          continueClick={this.continuePurchaseHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.checkingOut}
          clicked={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) =>
      dispatch(actions.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) =>
      dispatch(actions.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
