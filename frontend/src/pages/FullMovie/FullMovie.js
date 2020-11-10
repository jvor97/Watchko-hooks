import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// import Rater from "react-rater";

import FullMovieButtons from "../../components/FullMovieButtons/FullMovieButtons";
import { makeStyles } from "@material-ui/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import Counter from "../../components/Counter/Counter";
// import "react-rater/lib/react-rater.css";
// import "./FullMovie.css";
import * as actionCreators from "../../store/actions/actions";
import Rater from "../../components/Rater/Rater";
import Trailer from "../../components/Trailer/Trailer";
import { Typography } from "@material-ui/core";
// import OrderBtn from "../../components/Buttons/OrderBtn/OrderBtn";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    position: "relative",
    backgroundColor: "rgb(0,0,0)",
    zIndex: 1,
    position: "fixed"
  },
  bgImage: {
    objectFit: "cover",
    opacity: "0.8",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1
  },
  circle: {
    backgroundColor: "rgba(0,0,0, 50%)",
    height: "110%",
    width: "50%",
    borderRadius: "0 50% 50% 0",
    position: "absolute",
    borderRight: "3px solid #847f12",
    top: "-2rem",
    owerflow: "hidden"
  },
  content: {
    padding: "4rem 0 0 4rem",
    height: "85%"
  },
  movieInfo: {
    marginLeft: "0.5rem",
    paddingLeft: "0.5rem",
    borderLeft: "0.1rem solid #696429",
    maxWidth: "50%",
    position: "relative",
    color: "#b2b2b2"
  },
  releaseDate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#847f12",
    fontFamily: "'Raleway', sans-serif",
    float: " left",
    paddingLeft: " 25%"
  },
  date: {
    fontSize: "5vw"
  },
  year: {
    fontSize: "2vw"
  },
  overview: {
    fontSize: "130%",
    "@media (min-width: 2560px)": {
      fontSize: "180%"
    }
  },
  playBtn: {
    position: "absolute",
    left: "1rem",
    bottom: "0.5rem",
    color: "black"
  },
  backBtn: {
    left: "10px",
    bottom: "74px",
    color: "#b2b2b2",
    position: "absolute",
    "&:hover": {
      color: "#847f12"
    }
  }
});

const FullMovie = ({ loadFullMovie, fullMovie, loading, ...props }) => {
  const classes = useStyles();
  const { id } = props.match.params;

  useEffect(() => {
    loadFullMovie(id);
  }, [id]);

  // @TODO:
  // - loading icon
  // - genres
  // - trailer title
  // - play time
  
  const goBackHandler = () => {
    props.history.push("/");
  };

  if (loading) {
    return <div>Loading please wait...</div>;
  }

  return fullMovie ? (
    <div className={classes.root}>
      <img
        className={classes.bgImage}
        src={"https://image.tmdb.org/t/p/original/" + fullMovie.backdrop_path}
      />
      <div className={classes.circle} />
      {/* <ArrowBackIcon fontSize="large" className={classes.backBtn} /> */}
      <Grid container className={classes.content} spacing={2}>
        <Grid container item sm={9} style={{ display: "flex" }}>
          <Grid item style={{ zIndex: 1 }}>
            <Rater voteAverage={fullMovie.vote_average} direction="column" />
          </Grid>
          <Grid item xs={11} className={classes.movieInfo}>
            <Typography variant="h3">{fullMovie.title}</Typography>
            <Typography
              variant="h4"
              color="secondary"
              style={{ padding: "0.5rem 0" }}
            >
              {fullMovie.tagline}
            </Typography>
            <Typography variant="body" className={classes.overview}>
              {fullMovie.overview}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.playBtn}
              startIcon={<PlayArrowIcon />}
            >
              Watch
            </Button>
          </Grid>
        </Grid>
        <Grid container item sm={3}>
          <div className={classes.releaseDate}>
            <div className={classes.date}>
              <div>{fullMovie.release_date.split("-")[2]}</div>
              <div>{fullMovie.release_date.split("-")[1]}</div>
            </div>
            <div className={classes.year}>
              {fullMovie.release_date.split("-")[0]}
            </div>
          </div>
          <Grid item xs={12} style={{ alignSelf: "flex-end" }}>
            <Trailer
              posterPath={fullMovie.poster_path}
              videos={fullMovie.videos}
            />
          </Grid>
        </Grid>
      </Grid>
      <ArrowBackIcon
        fontSize="large"
        className={classes.backBtn}
        onClick={goBackHandler}
      />
    </div>
  ) : null;
};

const mapStateToProps = state => {
  return {
    fullMovie: state.api.selectedMovie,
    loading: state.api.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadFullMovie: id => dispatch(actionCreators.loadFullMovie(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMovie);
