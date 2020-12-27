import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("Order summary did update.");
  }

  ingredientSummary = Object.keys(this.props.ingredients).map((elem, index) => (
    <li key={index}>
      <span style={{ textTransform: "capitalize" }}>
        {elem} : {this.props.ingredients[elem]}
      </span>
    </li>
  ));

  render() {
    return (
      <Aux>
        <h3>YOUR ORDER</h3>
        <p>A Burger With The Following Ingredients:</p>
        <ul>{this.ingredientSummary}</ul>
        <h3>{`TOTAL PRICE: ${this.props.totalPrice.toFixed(2)}`}</h3>
        <p>Continue To Checkout?</p>
        <Button btnType="Success" clicked={this.props.cancelClick}>
          CANCEL
        </Button>
        <Button btnType="Danger" clicked={this.props.continueClick}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
