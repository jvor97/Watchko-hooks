import React, { Component } from "react";
import Collapse from "react-bootstrap/Collapse";
import { connect } from "react-redux";
import "./Genres.css";
import * as actionCreators from "../../store/actions/actions";

class Genres extends Component {
  componentDidMount() {
    this.props.onMount();
    console.log(this.props.genres);
  }

  displayMoviesByGenreHandler = genre => {
    return (window.location.href = "http://localhost:3000/genre/" + genre);
    // this.props.history.push("/genre");
  };

  render() {
    // function Example() {
    //     const [open, setOpen] = useState(false);

    let genres = <p>Something went wrong</p>;

    if (this.props.loading) {
      genres = <p>Loading ...</p>;
    }

    if (this.props.genres) {
      console.log(this.props.genres);
      genres = this.props.genres.map(genre => {
        return (
          <li
            key={genre.id}
            className="genre"
            id={genre.id}
            onClick={() => this.displayMoviesByGenreHandler(genre.id)}
          >
            {genre.name}
          </li>
        );
      });
    }

    return (
      <>
        {/* <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          click
        </Button> */}
        <div className="Genres">
          <Collapse in={this.props.open}>
            <div id="collapse-content">
              <ul>{genres}</ul>
            </div>
          </Collapse>
        </div>
      </>
    );
  }
}

//na click naloadujem nove movies a v movie liste checknem ci prrevious movies = movies ak nie tak update

//na click iba zmenim zaner a v movieliste checknem v cmpdidUpd ci min gan je taky isty ako gan z url (nejak cez props sa tam dostat) a ak nie tak updatujem

const mapStateToProps = state => {
  return {
    open: state.displayEl.openGenres,
    genres: state.api.genres
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => dispatch(actionCreators.loadGenres())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Genres);
