import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = { salad: 1, bacon: 1.5, meat: 2, cheese: 1.5 };

class BurgerBuilder extends Component {
  state = {
    ingredients: { salad: 0, bacon: 0, meat: 0, cheese: 0 },
    totalPrice: 8,
    purchaseable: false,
    checkingOut: false,
  };

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
    alert("YOU CONTINUE!");
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
    let adjIngredients = this.state.ingredients;
    let adjPrice = this.state.totalPrice;

    adjIngredients[type] += 1;
    adjPrice += INGREDIENT_PRICES[type];

    this.setState({ ingredients: adjIngredients, totalPrice: adjPrice });
    this.updatePurchaseState(adjIngredients);
  };

  removeIngredientHandler = (type) => {
    let adjIngredients = this.state.ingredients;
    let adjPrice = this.state.totalPrice;
    if (adjIngredients[type] <= 0) {
      console.log("Nothing to remove");
    } else {
      adjIngredients[type] -= 1;
      adjPrice -= INGREDIENT_PRICES[type];
      this.setState({ ingredients: adjIngredients, totalPrice: adjPrice });
      console.log("Removing ingredient...", type, this.state);
      this.updatePurchaseState(adjIngredients);
    }
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.checkingOut}
          clicked={this.cancelPurchaseHandler}
        >
          <OrderSummary
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            cancelClick={this.cancelPurchaseHandler}
            continueClick={this.continuePurchaseHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          checkOut={this.checkOut}
        />
      </Aux>
    );
  }
}
export default BurgerBuilder;
