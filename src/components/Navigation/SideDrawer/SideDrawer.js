import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";
import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  const output =
    window.innerWidth < 501 ? (
      <Aux>
        <Backdrop show={props.show} clicked={props.toggleDrawer} />
        <div className={attachedClasses.join(" ")}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav>
            <NavigationItems />
          </nav>
        </div>
      </Aux>
    ) : null;

  return output;
};

export default sideDrawer;
