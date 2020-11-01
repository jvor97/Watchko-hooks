import React, { Component } from "react";

import { IoIosCart } from "react-icons/io";
import { connect } from "react-redux";

class CartIcon extends Component {
  render() {
    const style = {
      position: "absolute",
      backgroundColor: "#847f12"
    };
    return (
      <div>
        <IoIosCart />
        <span class="badge badge-pill" style={style}>
          {this.props.counter}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.order.counter
  };
};

export default connect(mapStateToProps)(CartIcon);
