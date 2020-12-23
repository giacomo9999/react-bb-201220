import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];

const buildControls = (props) => {
  const controlArray = controls.map((elem, index) => (
    <BuildControl
      key={elem.type + index}
      label={elem.label}
      addIngredient={() => props.addIngredient(elem.type)}
      removeIngredient={() => props.removeIngredient(elem.type)}
      disabled={props.disabled[elem.type]}
    />
  ));
  return <div className={classes.BuildControls}>{controlArray}</div>;
};

export default buildControls;
