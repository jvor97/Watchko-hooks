import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
// import Rater from "react-rater";

import FullMovieButtons from "../../components/FullMovieButtons/FullMovieButtons";
// import Counter from "../../components/Counter/Counter";
// import "react-rater/lib/react-rater.css";
import "./FullMovie.css";
import * as actionCreators from "../../store/actions/actions";
// import OrderBtn from "../../components/Buttons/OrderBtn/OrderBtn";

const FullMovie = ({ loadFullMovie, fullMovie, ...props }) => {
  // componentDidMount() {
  //   if (this.props.match.params.id) {
  //     if (this.props.match.params.id != this.props.previousID) {
  //       this.props.onMount(this.props.match.params.id);
  //     }
  //   }
  // }

  const { id } = props.match.params;
  useEffect(() => {
    loadFullMovie(id);
  }, [id]);
  console.log(fullMovie);

  const goBackHandler = () => {
    props.history.push("/");
  };

  const getRating = voteAverage => {
    let rating;
    if (voteAverage <= 2) {
      rating = 1;
    } else if (voteAverage <= 4) {
      rating = 2;
    } else if (voteAverage <= 6) {
      rating = 3;
    } else if (voteAverage <= 8) {
      rating = 4;
    } else {
      rating = 5;
    }
    return rating;
  };

  let movie = <p>Please select a movie</p>;
  if (props.loading) {
    movie = <p>Loading please wait...</p>;
  }
  if (fullMovie) {
    let genres = fullMovie.genres.map(genre => genre.name + " | ");

    console.log(getRating(fullMovie.vote_average));
    movie = (
      <div>
        <div className="card bg-dark">
          <img
            className="bg-image"
            src={
              "https://image.tmdb.org/t/p/original/" + fullMovie.backdrop_path
            }
          />
          <div className="card-img-overlay" style={{ paddingTop: "2.2rem" }}>
            <div className="main-info">
              <h3 className="FM-title">{fullMovie.title}</h3>
              <h5 className="tagline">{fullMovie.tagline}</h5>
              <div className="card-text">{fullMovie.overview}</div>
            </div>
            {/* <Rater
              total={5}
              rating={getRating(fullMovie.vote_average)}
              interactive={false}
            /> */}
            <div className="genres">
              <h6>{genres}</h6>
            </div>
            {/* <OrderBtn
              title={fullMovie.title}
              rentPrice={fullMovie.rentPrice}
              buyPrice={fullMovie.buyPrice}
            /> */}
            <div className="release-date">
              <div className="date">
                <div>{fullMovie.release_date.split("-")[2]}</div>
                <div>{fullMovie.release_date.split("-")[1]}</div>
              </div>
              <div className="year">{fullMovie.release_date.split("-")[0]}</div>
            </div>
            <div className="runtime">{fullMovie.runtime + " min"}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="FullMovie">
      {movie}
      <FullMovieButtons onGoBack={goBackHandler} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    fullMovie: state.api.selectedMovie,
    previousID: state.api.previousID,
    loading: state.api.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadFullMovie: id => dispatch(actionCreators.loadFullMovie(id))
  };
};

// export default connect(mapStateToProps,mapDispatchToProps)(FullMovie);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMovie);
