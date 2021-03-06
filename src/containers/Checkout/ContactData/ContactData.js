import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import classes from "./ContactData.module.css";

import * as actions from "../../../store/actions/actionIndex";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Name" },
        value: "",
        validation: { required: true },
        valid: false,
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Street" },
        value: "",
        validation: { required: true },
        valid: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Zip Code" },
        value: "",
        validation: { required: true, inputLength: 5 },
        valid: false,
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Country" },
        value: "",
        validation: { required: true },
        valid: false,
      },
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "E-mail" },
        value: "",
        validation: { required: true },
        valid: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: { required: false },
        valid: true,
      },
    },
    formIsValid: false,
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
      price: this.props.totalPrice,
      orderTime: Date.now(),
      orderData: formData,
    };

    this.props.onSubmitOrder(order);
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  handleChange = (e, inputId) => {
    e.preventDefault();
    const updatedOrderForm = this.state.orderForm;
    const updatedFormElem = { ...updatedOrderForm[inputId] };
    updatedFormElem.value = e.target.value;
    updatedFormElem.valid = this.checkValidity(
      updatedFormElem.value,
      updatedFormElem.validation
    );
    updatedFormElem.touched = true;
    updatedOrderForm[inputId] = updatedFormElem;

    let formIsValid = true;
    for (let inputID in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputID].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
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
            invalid={!elem.config.valid}
            shouldValidate={elem.config.validation}
            touched={elem.config.touched}
          />
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
        >
          Place Order
        </Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.orders.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { onSubmitOrder: (order) => dispatch(actions.submitOrder(order)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
