import React, { Component } from "react";
import { connect } from "react-redux";
import Counter from "../Counter/Counter";
import CloseBtn from "../Buttons/CloseBtn/CloseBtn";

class CartItem extends Component {
  render() {
    return (
      <tr className="card">
        <td className="card-body">
          <h5>{this.props.title}</h5>
        </td>
        <td className="card-body">
          <div>{this.props.typeOfOrder}</div>
        </td>
        <td className="card-body">
          <Counter id={this.props.id} numOfOrders={this.props.numOfOrders} />
        </td>
        <td className="card-body">
          <div>{this.props.updatedPrice} $</div>
        </td>
        <td className="card-body">
          <CloseBtn clicked={() => this.props.onDelete(this.props.id)} />
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => dispatch({ type: "DELETE_CARTITEM", id: id })
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
