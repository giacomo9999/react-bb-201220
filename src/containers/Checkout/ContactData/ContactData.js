import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import classes from "./ContactData.module.css";

import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Name" },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Street" },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Zip Code" },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Country" },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "E-mail" },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElemId in this.state.orderForm) {
      formData[formElemId] = this.state.orderForm[formElemId].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderTime: Date.now(),
      orderData: formData,
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

  handleChange = (e, inputId) => {
    e.preventDefault();
    const updatedOrderForm = this.state.orderForm;
    const updatedFormElem = { ...updatedOrderForm[inputId] };
    updatedFormElem.value = e.target.value;
    updatedOrderForm[inputId] = updatedFormElem;
    this.setState({ orderForm: updatedOrderForm });
    console.log("Handling change...", inputId, e.target.value);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((elem) => (
          <Input
            changed={(e) => this.handleChange(e, elem.id)}
            key={elem.id}
            elementType={elem.config.elementType}
            elementConfig={elem.config.elementConfig}
            value={elem.config.value}
          />
        ))}
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
