import React from "react";
import Aux from "../../../hoc/Aux";

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
      <div>
        <h3>YOUR ORDER</h3>
        <p>A Burger With The Following Ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Continue To Checkout?</p>
      </div>
    </Aux>
  );
};

export default orderSummary;
