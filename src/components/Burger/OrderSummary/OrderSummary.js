import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    let ingredientSummary = Object.keys(this.props.ingredients).map(
      (elem, index) => {
        return (
          <li key={index}>
            <span style={{ textTransform: "capitalize" }}>
              {elem} : {this.props.ingredients[elem]}
            </span>
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>YOUR ORDER</h3>
        <p>A Burger With The Following Ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <h3>{`TOTAL PRICE: ${this.props.totalPrice.toFixed(2)}`}</h3>
        <p>Continue To Checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancelClick}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continueClick}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
