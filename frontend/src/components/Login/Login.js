import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { ToggleButtonGroup } from "react-bootstrap";
import { ToggleButton } from "react-bootstrap";
import { ButtonToolbar } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";

import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "./Login.css";
// import Spinner from '../Spinner/Spinner';

class Login extends Component {
  state = {
    displaySignUp: false
  };

  handleDisplaySignUp = () => {
    this.setState({
      ...this.state,
      displaySignUp: true
    });
  };

  handleHideSignUp = () => {
    this.setState({
      ...this.state,
      displaySignUp: false
    });
  };

  render() {
    const spinnerStyle = {
      margin: " 0 45%"
    };

    return (
      //   <div className="Login">
      //     <div>Sign in</div>
      //     <div>Sign up</div>
      //     {/* //sign in comp */}
      //   </div>

      <>
        <style type="text/css">
          {`
      .btn-group {
          width: 100%;
      }
      `}
        </style>

        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          className="Login"
          centered
        >
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton
                value={1}
                onClick={this.props.handleHideSignUp}
                className="loginBtn"
              >
                Sign in
              </ToggleButton>
              <ToggleButton
                value={2}
                onClick={this.props.handleDisplaySignUp}
                className="loginBtn"
              >
                Sign up
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          <Modal.Header>
            <Modal.Title>
              {this.props.displaySignUp ? "Sign Up" : "Sign In"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.error ? this.props.error.message : null}
            {this.props.loading ? (
              <Spinner animation="border" style={spinnerStyle} />
            ) : this.props.displaySignUp ? (
              <SignUp />
            ) : (
              <SignIn />
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    show: state.login.openLogin,
    displaySignUp: state.login.displaySignUp,
    loading: state.login.loading,
    error: state.login.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => dispatch({ type: "TOGGLE_LOGIN" }),
    handleDisplaySignUp: () => dispatch({ type: "DISPLAY_SIGNUP" }),
    handleHideSignUp: () => dispatch({ type: "HIDE_SIGNUP" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
