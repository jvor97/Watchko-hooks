import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Movie from "../../components/Movie/Movie";
import * as actionCreators from "../../store/actions/actions";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  movieList: {
    width: "100%",
    margin: 0
  }
});

const MovieList = ({
  apiQuery,
  loadMovies,
  movies,
  handleApiQueryChange,
  ...props
}) => {
  // componentDidMount() {
  //   console.log(this.props);
  //   this.props.onLoadMovies(null, null);
  // }
  // tracking on which page we currently are
  // starting with 2 to prevent double render of 1st page
  const [page, setPage] = useState(
    apiQuery.get("page") ? Number(apiQuery.get("page")) : 2
  );
  const classes = useStyles();
  // add loader refrence
  const loader = useRef(null);
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  // useEffect(() => {
  //   // here we simulate adding new posts to List
  //   const newList = postList.list.concat([1, 1, 1, 1]);
  //   setPostList({
  //     list: newList
  //   });
  // }, [page]);
  useEffect(() => {
    console.log(apiQuery.toString());
    loadMovies(apiQuery);
  }, [apiQuery]);

  // insert page to apiQuery ehich will execute useEffect with lodMovies
  useEffect(() => {
    const copyApiUrl = apiQuery;
    // console.log(copyApiUrl);
    // const updatedUrl =
    apiQuery.set("page", page);
    // apiQuery.set("with_genres", 12);

    // console.log(updatedUrl);
    handleApiQueryChange(apiQuery);
  }, [page]);

  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = entities => {
    console.log("aaaaaaaaaaaaaaaaa");
    const target = entities[0];
    if (target.isIntersecting) {
      setPage(page => page + 1);
    }
  };

  // componentDidUpdate() {
  //   let genre = this.props.match.params.genre;
  //   let query = this.props.query;
  //   console.log(this.props.previousQuery);
  //   console.log(this.props.query);

  //   if (query !== null && query.length > 0 && query !== undefined) {
  //     if (this.props.previousQuery != query) {
  //       console.log("q update");
  //       this.props.onLoadMovies(null, query);
  //       //ak g z url je iny ako g v state take update a set g v state na ten z url
  //     }
  //   }

  //   if (genre !== null && genre !== undefined) {
  //     if (genre != this.props.genre) {
  //       this.props.onLoadMovies(genre, null);
  //       //ak g z url je iny ako g v state take update a set g v state na ten z url
  //     }

  const fullPostHandler = id => {
    props.history.push("/movies/" + id);
    apiQuery.delete("page");
    handleApiQueryChange(apiQuery);
  };
  // console.log(movies);

  // render() {
  //   const style = {
  //     display: "flex",
  //     flexDirection: "row",
  //     flexWrap: "wrap",
  //     justifyContent: "flex-start",
  //     alignItems: "stretch",
  //     alignContent: "stretch"
  //   };

  //   let movies = <p>Something went wrong</p>;
  //   if (this.props.loading) {
  //     movies = <p>Loading ...</p>;
  //   }
  //   if (this.props.movies) {
  //     movies = this.props.movies.map(movie => {
  //       return (
  //         <Movie
  //           title={movie.title}
  //           img={movie.poster_path}
  //           key={movie.id}
  //           clicked={() => this.fullPostHandler(movie.id)}
  //         />
  //       );
  //     });
  //   }

  return (
    <Grid container spacing={2} className={classes.movieList}>
      {movies &&
        movies.map(movie => (
          <Movie
            title={movie.title}
            img={movie.poster_path}
            key={movie.id}
            clickHandler={() => fullPostHandler(movie.id)}
            id={movie.id}
            voteAverage={movie.vote_average}
            {...props}
          />
        ))}
      <div ref={loader} />
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    movies: state.api.movies,
    loading: state.api.loading,
    genre: state.api.genre,
    previousQuery: state.api.previousQuery,
    apiQuery: state.api.apiQuery
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMovies: apiQuery => dispatch(actionCreators.loadMovies(apiQuery)),
    handleApiQueryChange: apiQuery =>
      dispatch({ type: "UPDATE_APIURL", apiQuery })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
