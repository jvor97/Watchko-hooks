import React, { Component } from "react";
import { connect } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
// import { IoIosSearch } from "react-icons/io";
// import * as actions from "../../store/actions/index";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { displaySearch: false, value: " " };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ displaySearch: false });
    }
  }

  displaySearch = () => {
    return this.setState({
      ...this.state,
      displaySearch: true
    });
  };

  onChangeHandler = event => {
    return this.setState({
      value: event.target.value
    });
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.updateQuery(this.state.value);
  // };

  render() {
    const style = {
      position: "relative",
      zIndex: 10,
      background: "transparent",
      paddingRight: 0,
      paddingLeft: "25px",
      color: "#707171",
      border: "1px solid #707171",
      borderRadius: ".25rem"
    };
    const iconStyle = {
      position: "absolute",
      top: "50%",
      transform: "translate(0, -50%)",
      margin: " 0 5px"
    };

    let input = null;
    if (this.state.displaySearch) {
      input = (
        <input
          type="text"
          placeholder="Search"
          style={style}
          value={this.state.value}
          onChange={event => this.onChangeHandler(event)}
        />
      );
    }
    return (
      <form
        style={{ display: "flex", position: "relative" }}
        ref={this.setWrapperRef}
        // onSubmit={event => this.handleSubmit(event)}
      >
        {input}
        <SearchIcon onClick={this.displaySearch} style={iconStyle} />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuery: query => dispatch({ type: "UPDATE_QUERY", query: query })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
