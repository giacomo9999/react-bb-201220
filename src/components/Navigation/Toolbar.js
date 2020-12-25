import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";

const toolBar = (props) => (
  <header className={classes.Toolbar}>
    <div>
      <h3>MENU</h3>
    </div>
    <Logo />
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default toolBar;
