import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes good!</h1>
      <div
        className="Enclosing"
        style={{
          width: "350px",
          margin: "auto",
        }}
      >
        <Burger ingredients={props.ingredients} isSmall={true} />
      </div>
      <Button
        btnType="Danger"
        clicked={() => {
          console.log("Button clicked");
        }}
      >
        CANCEL
      </Button>
      <Button
        btnType="Success"
        clicked={() => {
          console.log("Button clicked");
        }}
      >
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
