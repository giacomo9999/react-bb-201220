import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];

const controlArray = controls.map((elem, index) => (
  <BuildControl key={`bc_${index}`} label={elem.label} type={elem.type} />
));

const buildControls = (props) => {
  return <div className={classes.BuildControls}>{controlArray}</div>;
};

export default buildControls;
