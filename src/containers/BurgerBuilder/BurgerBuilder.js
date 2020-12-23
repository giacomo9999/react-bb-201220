import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = { salad: 1, bacon: 1.5, meat: 2, cheese: 1.5 };

class BurgerBuilder extends Component {
  state = {
    ingredients: { salad: 0, bacon: 0, meat: 0, cheese: 0 },
    totalPrice: 8,
    purchaseable: false,
  };

  updatePurchaseState = () => {
    let purchaseable = false;
    let ingredArray = { ...this.state.ingredients };
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
    this.updatePurchaseState();
    // console.log("Adding ingredient...", type, this.state);
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
      this.updatePurchaseState();
    }
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />

        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
        />
      </Aux>
    );
  }
}
export default BurgerBuilder;
