import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../src/hoc/withErrorHandler/withErrorHandler";

import * as actionTypes from "../../store/actions/actionTypes";

import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    checkingOut: false,
    loading: false,
    error: false,
  };

  // componentDidMount() {
  //   console.log(this.props);
  //   axios
  //     .get(
  //       "https://react-my-burger-b77e3-default-rtdb.firebaseio.com/ingredients.json"
  //     )
  //     .then((res) => {
  //       this.setState({ ingredients: res.data });
  //     })
  //     .catch((err) => {
  //       this.setState({ error: true });
  //     });
  // }

  checkOut = () => {
    console.log("Checking Out...");
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
    let burger = this.state.error ? (
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
            removeIngredient={this.props.onRmoveIngredient}
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

    if (this.state.loading) {
      orderSummary = <Spinner />;
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredient: ingredient }),
    onRemoveIngredient: (ingredient) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
