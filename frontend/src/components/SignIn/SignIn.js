import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../Input/Input";
import * as actions from "../../store/actions/index";
import GeneralBtn from "../Buttons/GeneralBtn/GeneralBtn";

class SignIn extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "User email"
        },
        validation: {
          require: true,
          minLength: 5,
          number: false,
          specChar: true
        },
        valid: false,
        touched: false,
        value: "",
        label: "Email"
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        validation: {
          require: true,
          minLength: 7,
          number: true,
          specChar: true
        },
        valid: false,
        touched: false,
        value: "",
        label: "Password"
      }
    },
    valid: true
  };

  validateValue = (rule, value) => {
    let isValid = true;
    if (rule.require && isValid) {
      value.trim() !== "" ? (isValid = true) : (isValid = false);
    }
    if (rule.minLength && isValid) {
      value.length >= rule.minLength ? (isValid = true) : (isValid = false);
    }
    if (rule.number && isValid) {
      const patt = /[0-9]/g;
      patt.test(value) ? (isValid = true) : (isValid = false);
    }
    if (rule.specChar && isValid) {
      const patt = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      patt.test(value) ? (isValid = true) : (isValid = false);
    }
    return isValid;
  };

  onChangeHandler = (e, id) => {
    let updatedForm = { ...this.state.loginForm };
    let updatedFormEl = { ...updatedForm[id] };
    updatedFormEl.value = e.target.value;
    updatedFormEl.valid = this.validateValue(
      updatedFormEl.validation,
      updatedFormEl.value
    );

    this.setState({
      loginForm: updatedForm
    });

    updatedFormEl.touched = true;

    let validForm = true;
    for (let formElement in updatedForm) {
      validForm = updatedForm[formElement].valid && validForm;
    }

    updatedForm[id] = updatedFormEl;
    console.log(updatedFormEl);
    this.setState({
      contactForm: updatedForm,
      valid: validForm
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSignIn(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      "signIn"
    );
  };

  render() {
    const formElementsArray = [];
    for (let i in this.state.loginForm) {
      formElementsArray.push({
        id: i,
        config: this.state.loginForm[i]
      });
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {formElementsArray.map(input => (
          <Input
            key={input.id}
            elementType={input.config.elementType}
            value={input.config.value}
            config={input.config.elementConfig}
            label={input.config.label}
            invalid={!input.config.valid}
            touched={input.config.touched}
            onChange={event => this.onChangeHandler(event, input.id)}
          />
        ))}
        <GeneralBtn
          type="submit"
          id="signingBtn"
          style={{ width: "100%", fontSize: "1.25rem" }}
          clicked={this.handleSubmit}
          value="Sign In"
        />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (email, password, loginMethod) =>
      dispatch(actions.login(email, password, loginMethod))
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
