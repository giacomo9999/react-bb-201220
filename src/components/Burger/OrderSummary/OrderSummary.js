import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (elem, index) => (
      <li key={index}>
        <span style={{ textTransform: "capitalize" }}>
          {elem} : {props.ingredients[elem]}
        </span>
      </li>
    )
  );

  return (
    <Aux>
      <h3>YOUR ORDER</h3>
      <p>A Burger With The Following Ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <h3>{`TOTAL PRICE: ${props.totalPrice.toFixed(2)}`}</h3>
      <p>Continue To Checkout?</p>
      <Button btnType="Success" clicked={props.cancelClick}>
        CANCEL
      </Button>
      <Button btnType="Danger" clicked={props.continueClick}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
