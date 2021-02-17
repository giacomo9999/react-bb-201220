import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "E-mail" },
        value: "",
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: { type: "password", placeholder: "Password" },
        value: "",
        validation: { required: true, minLength: 6 },
        valid: false,
        touched: false,
      },
    },
  };

  handleInputChange = (e, inputId) => {
    e.preventDefault();
    const updatedControls = this.state.controls;
    const updatedFormElem = { ...updatedControls[inputId] };
    updatedFormElem.value = e.target.value;
    updatedFormElem.valid = this.checkValidity(
      updatedFormElem.value,
      updatedFormElem.validation
    );
    updatedFormElem.touched = true;
    updatedControls[inputId] = updatedFormElem;

    let formIsValid = true;
    for (let inputID in updatedControls) {
      formIsValid = updatedControls[inputID].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handling submit.");
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

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({ id: key, config: this.state.controls[key] });
    }
    const form = formElementsArray.map((elem) => (
      <Input
        changed={(e) => this.handleInputChange(e, elem.id)}
        key={elem.id}
        elementType={elem.config.elementType}
        elementConfig={elem.config.elementConfig}
        value={elem.config.value}
        invalid={!elem.config.valid}
        shouldValidate={elem.config.validation}
        touched={elem.config.touched}
      />
    ));
    return (
      <div className={classes.Login}>
        <form>
          {form}
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}
            clicked={this.handleSubmit}
          >
            Submit
          </Button>
        </form>
        <Button
          btnType="Success"
          onClick={() => console.log("Button clicked.")}
        >
          Click Me!
        </Button>
      </div>
    );
  }
}

export default Auth;
