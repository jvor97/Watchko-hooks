import { LOADING, GET_MOVIES, GET_FULLMOVIE } from "../actions/actionTypes";

/* eslint-disable default-case */
const url = new URL(
  "https://api.themoviedb.org/3/discover/movie?api_key=65777f92529c3462f958232f137b357f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
);

let initialState = {
  loading: false,
  movies: [],
  selectedMovie: null,
  previousID: null,
  genres: null,
  apiUrl: new URLSearchParams(url.search.slice(1)),
  previousQuery: null
  // genre: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case GET_MOVIES:
      return {
        ...state,
        movies: state.movies.concat(action.movies)
      };
    case GET_FULLMOVIE:
      return {
        ...state,
        selectedMovie: action.selectedMovie
      };
    case "LOAD_GENRES":
      console.log(action.genres);
      console.log(state.genres);
      return {
        ...state,
        genres: action.genres
      };
    case "UPDATE_APIURL":
      console.log(action.apiUrl);
      return {
        ...state,
        apiUrl: new URLSearchParams(action.apiUrl)
      };
  }
  console.log(state.genres);
  return state;
};

export default reducer;
