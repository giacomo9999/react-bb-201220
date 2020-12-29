import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = { salad: 1, bacon: 1.5, meat: 2, cheese: 1.5 };

class BurgerBuilder extends Component {
  state = {
    ingredients: { salad: 0, bacon: 0, meat: 0, cheese: 0 },
    totalPrice: 8,
    purchaseable: false,
    checkingOut: false,
    loading: false,
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
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Gern Blanston",
        address: {
          street: "123 Main St",
          zipCode: 12345,
          country: "Utopia",
        },
        email: "test@test.com",
        deliveryMethod: "fastest",
      },
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, checkingOut: false });
        console.log(response);
      })
      .catch((err) => {
        this.setState({ loading: false, checkingOut: false });
        console.log(err);
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
    let orderSummary = (
      <OrderSummary
        totalPrice={this.state.totalPrice}
        ingredients={this.state.ingredients}
        cancelClick={this.cancelPurchaseHandler}
        continueClick={this.continuePurchaseHandler}
      />
    );

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
