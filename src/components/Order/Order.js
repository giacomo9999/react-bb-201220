import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }
  const ingredientOutput = ingredients.map((ing, index) => {
    return (
      <p
        key={index}
        style={{ fontWeight: "400", textTransform: "capitalize" }}
      >{` ${ing.name}: ${ing.amount}  `}</p>
    );
  });

  return (
    <div className={classes.Order}>
      {ingredientOutput}
      <h3>Price: {props.price}</h3>
    </div>
  );
};

export default order;
