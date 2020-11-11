import axios from "axios";
import { LOADING, GET_MOVIES, GET_FULLMOVIE } from "./actionTypes";

// export const LOADMOVIES = 'LOADMOVIES';
// export const RELOADMOVIES = 'RELOADMOVIES';

export const loadMovies = apiUrl => {
  return async dispatch => {
    dispatch(loading(true));
    // let movies = [];
    const concatMovies = apiUrl.get("page") > 1;
    const movies = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?${apiUrl}`
    );
    dispatch(loadMoviesData(movies, concatMovies));
  };
};

export const loading = boolean => {
  return { type: LOADING, loading: boolean };
};

export const loadMoviesData = (movies, concatMovies) => {
  //concat all array to one
  // let allMovies = [].concat.apply([], movies);
  // console.log(allMovies);

  return {
    type: GET_MOVIES,
    movies: movies.data.results,
    concatMovies
  };
};

export const loadFullMovie = id => {
  return async dispatch => {
    dispatch(loading(true));
    const fullMovie = await axios.get(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=65777f92529c3462f958232f137b357f&language=en-US&page=1&fbclid=IwAR3WdGpp9ZHMyGn4Vyni4MFF0hpc-Kfvyyj9PLnyueheoQ0o3YIPcmSL5Dk&language=en-US&append_to_response=videos"
    );
    dispatch(loading(false));
    dispatch(loadMovie(fullMovie.data));
  };
};

export const loadMovie = selectedMovie => {
  // let rentRandom = Math.round((Math.random() * 8 * 100) / 100) + 1;
  // let buyRandom = Math.round((Math.random() * 15 * 100) / 100) + 7;

  // selectedMovie.rentPrice = rentRandom;
  // selectedMovie.buyPrice = buyRandom;
  return {
    type: "GET_FULLMOVIE",
    selectedMovie: selectedMovie
  };
};

export const loadGenres = () => {
  return async dispatch => {
    dispatch(loading(true));
    const genres = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=65777f92529c3462f958232f137b357f&language=en-US"
    );

    dispatch(loadGenresData(genres.data.genres));
  };
};

export const loadGenresData = genres => {
  console.log(genres);
  return {
    type: "GET_GENRES",
    genres: genres
  };
};

export const updateQuery = query => {
  return {
    type: "UPDATE_QUERY",
    query: query
  };
};
