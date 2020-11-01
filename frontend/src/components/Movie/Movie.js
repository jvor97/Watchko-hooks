import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

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
    "& :hover": {
      opacity: "0.3"
    }
  }
});

const Movie = ({ id, ...props }) => {
  const classes = useStyles();

  const fullPostHandler = () => {
    console.log(props);
    props.history.push("/movies/" + id);
  };

  return (
    <Grid item className={classes.gridItem} onClick={() => fullPostHandler()}>
      <img
        src={"https://image.tmdb.org/t/p/w200/" + props.img}
        alt="movie poster"
        className={classes.poster}
      />
      <h5 className="card-title list-movie-title">{props.title}</h5>
    </Grid>
  );
};

export default Movie;
