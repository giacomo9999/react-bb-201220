import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolBar = (props) => (
  <header className={classes.Toolbar}>
    <div>
      <DrawerToggle clicked={props.clicked} />
    </div>
    <div className={classes.Logo}>
      <Logo clicked={props.clicked} />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolBar;
