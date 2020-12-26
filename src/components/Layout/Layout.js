import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";
import "./TypeStyles.css";

class Layout extends Component {
  state = { sideDrawerOpen: false };

  sideDrawerToggleHandler = () => {
    this.setState({ sideDrawerOpen: !this.state.sideDrawerOpen });
  };

  render() {
    return (
      <Aux>
        <Toolbar clicked={this.sideDrawerToggleHandler} />
        {this.state.sideDrawerOpen ? (
          <SideDrawer
            toggleDrawer={this.sideDrawerToggleHandler}
            show={this.state.sideDrawerOpen}
          />
        ) : null}
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
