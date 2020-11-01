import React, { Component } from "react";
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import { connect } from "react-redux";

import "./OrderBtn.css";
import * as actions from "../../../store/actions/index";
import { toggleLogin } from "../../../store/actions/displayEl";

class OrderBtn extends Component {
  render() {
    const onClickDecision = value => {
      if (this.props.userId === null) {
        this.props.toggleLogin();
      } else if (value === "buy") {
        this.props.handleOrder(this.props.title, this.props.buyPrice, "buy");
      } else {
        this.props.handleOrder(this.props.title, this.props.rentPrice, "rent");
      }
    };
    return (
      <ButtonToolbar className="OrderBtn">
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <button
            className="loginBtn btn btn-primary"
            type="radio"
            autoComplete="off"
            value="buy"
            onClick={() => onClickDecision("buy")}
          >
            {"Buy | " + this.props.buyPrice + " $"}
          </button>
          <button
            className="loginBtn btn btn-primary"
            type="radio"
            autoComplete="off"
            value="rent"
            onClick={() => onClickDecision("rentt")}
          >
            {"Rent | " + this.props.rentPrice + " $"}
          </button>
          {/* <ToggleButton
            value={2}
            onClick={this.props.handleOrder}
            className="loginBtn"
          >
            Rent
          </ToggleButton> */}
        </ToggleButtonGroup>
      </ButtonToolbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.login.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // handleOrder: (title, price, typeOfOrder) =>
    //   dispatch({
    //     type: "REGISTER_ORDER",
    //     orderData: { title: title, price: price, typeOfOrder: typeOfOrder }
    //   }),
    handleOrder: (title, price, typeOfOrder) =>
      dispatch(actions.registerOrder(title, price, typeOfOrder)),
    toggleLogin: () => dispatch({ type: "TOGGLE_LOGIN" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBtn);
