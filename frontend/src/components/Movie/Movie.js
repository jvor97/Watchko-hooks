import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

import Rater from "../Rater/Rater";

const useStyles = makeStyles({
  poster: {
    maxWidth: "100%",
    height: "fit-content",
    borderRadius: "10%"
  },
  gridItem: {
    flex: 1,
    flexBasis: "12rem",
    color: "white",
    position: "relative",
    "&:hover > img": {
      opacity: "0.1"
      // "& $movieTitle": {
      //   background: "yellow"
      // }
    },
    "&:hover > span": {
      opacity: 1
    }
  },
  movieTitle: {
    position: "absolute",
    top: "40%",
    left: "50%",
    color: "white",
    transform: "translate(-50%, -50%)",
    opacity: 0,
    transition: "opacity 0.7s",
    textTransform: "uppercase",
    textAlign: "center"
  }
});

const Movie = ({ title, img, voteAverage, id, ...props }) => {
  const classes = useStyles();

  const fullPostHandler = () => {
    console.log(props);
    props.history.push("/movies/" + id);
  };

  return (
    <Grid item className={classes.gridItem} onClick={() => fullPostHandler()}>
      <img
        src={"https://image.tmdb.org/t/p/w200/" + img}
        alt="movie poster"
        className={classes.poster}
      />
      <span className={classes.movieTitle}>
        <h5>{title}</h5>
        <Rater voteAverage={voteAverage} />
      </span>
    </Grid>
  );
};

export default Movie;
