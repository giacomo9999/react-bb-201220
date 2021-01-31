import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";

import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "Gern Blanston",
    email: "gern@blanston.com",
    address: { street: "123 Main St", postalCode: "12345" },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    // console.log(this.props);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderTime: Date.now(),
      customer: {
        name: this.state.name,
        address: {
          street: this.state.address.street,
          zipCode: this.state.address.postalCode,
          country: "Utopia",
        },
        email: this.state.email,
        deliveryMethod: "fastest",
      },
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
        console.log(response);
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="E-Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalcode"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          Place Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
