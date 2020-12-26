import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem>Check Out</NavigationItem>
  </ul>
);

export default navigationItems;
