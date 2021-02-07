import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../src/hoc/withErrorHandler/withErrorHandler";

import * as actionTypes from "../../store/actions";

import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
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
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    queryParams.push("price=" + this.props.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  updatePurchaseState = (ingredArray) => {
    let purchaseable = false;
    for (let i in ingredArray) {
      if (ingredArray[i] >= 1) {
        purchaseable = true;
      }
    }
    this.setState({ purchaseable: purchaseable });
  };

  addIngredientHandler = (type) => {
    this.props.onAddIngredient(type);
    this.updatePurchaseState(this.props.ingredients);
  };

  removeIngredientHandler = (type) => {
    let adjIngredients = this.props.ingredients;
    if (adjIngredients[type] <= 0) {
      console.log("Nothing to remove");
    } else {
      this.props.onRemoveIngredient(type);
      this.updatePurchaseState(this.props.ingredients);
    }
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
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.state.purchaseable}
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
