import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { IoIosCart } from "react-icons/io";
import { Redirect } from "react-router-dom";
// import Collapse from "react-bootstrap/Collapse";
// import Genres from "../Genres/Genres";

import "./Nav.css";
import logo from "./watchko-logo.png";
import * as actionCreators from "../../store/actions/displayEl";
import SearchBar from "../SearchBar/SearchBar";
// import CartIcon from "../UI/CartIcon/CartIcon";

const Nav1 = ({ ...props }) => {
  const displaySearch = () => {
    //ked nic nanpises tak sa schova a ked kliknes inde
  };
  // let login = (
  //   <p className="nav-link" onClick={this.props.toggleLogin}>
  //     Sign in/ up
  //   </p>
  // );
  // if (this.props.logout != null) {
  //   login = (
  //     <Link className="nav-link" to="/logout">
  //       Log out
  //     </Link>
  //   );
  // }

  return (
    <nav className="Nav navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {/* <div className="logo"> */}
          <img src={logo} alt="watchko-logo" />
          {/* </div> */}
        </Link>
        <div className="d-flex ml-auto">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto order-1">
            {/* <li className="nav-item">
                <Link className="nav-link" to="/">
                  Movies<span className="sr-only">(current)</span>
                </Link>
              </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <p
                className="nav-link"
                onClick={props.toggleGenres}
                // aria-controls="example-collapse-text"
                // aria-expanded={this.props.openGenres}
              >
                Genres
              </p>
            </li>
            {/* <li>
                <div className="my-2 my-lg-0 order-2">
                  <SearchBar />
                </div>
              </li> */}
          </ul>
          <ul className="navbar-nav mx-2 my-lg-0 order-2">
            <li className="nav-item px-2">
              <SearchBar />
            </li>
          </ul>
          {/* <ul className="navbar-nav d-none d-lg-flex order-3 mx-2">
            {this.props.logout !== null ? (
              <li className="nav-item" style={{ paddingRight: "1rem" }}>
                <Link to="/cart" className="nav-link" id="cartLink">
                  <CartIcon />
                </Link>
              </li>
            ) : null}
            <li className="nav-item">{login}</li>
          </ul> */}
          {/* <ul className="navbar-nav d-lg-none">
              <li className="nav-item-divider"></li>
              <li className="nav-item">
                <Link className="nav-link" to="/sign">
                  Sign in / Sign up
                </Link>
              </li>
            </ul> */}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    logout: state.login.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleGenres: () => dispatch({ type: "TOGGLE_GENRES" }),
    toggleLogin: () => dispatch({ type: "TOGGLE_LOGIN" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav1);
