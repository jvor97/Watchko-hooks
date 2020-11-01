import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../Input/Input";
import GeneralBtn from "../Buttons/GeneralBtn/GeneralBtn";
import "./SignUp.css";
import * as actions from "../../store/actions/index";

class SignUp extends Component {
  state = {
    loginForm: {
      firstName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "John"
        },
        value: "",
        label: "First Name"
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Smith"
        },
        value: "",
        label: "Last Name"
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "john.smith@example.com"
        },
        value: "",
        label: "Email"
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        label: "Password"
      }
    }
  };

  onChangeHandler = (e, id) => {
    let updatedLoginForm = { ...this.state.loginForm };
    let updatedFormElement = { ...updatedLoginForm[id] };
    updatedFormElement.value = e.target.value;
    updatedLoginForm[id] = updatedFormElement;
    this.setState({
      loginForm: updatedLoginForm
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // let data = {};
    // for (const formEl in this.state.loginForm) {
    //   data[formEl] = this.state.loginForm[formEl].value;
    // }

    this.props.onSignUp(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      "signUp"
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
      <form className="SignUp" onSubmit={this.handleSubmit}>
        {formElementsArray.map(input => (
          <Input
            key={input.id}
            elementType={input.config.elementType}
            value={input.config.value}
            config={input.config.elementConfig}
            label={input.config.label}
            onChange={event => this.onChangeHandler(event, input.id)}
          />
        ))}
        <GeneralBtn
          type="submit"
          id="signingBtn"
          style={{ width: "100%", fontSize: "1.25rem" }}
          clicked={this.handleSubmit}
          value="Sign Up"
        />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (email, password, loginMethod) =>
      dispatch(actions.login(email, password, loginMethod))
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
