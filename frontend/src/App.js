import React, { Suspense } from "react";
import thunk from "redux-thunk";

import { Route } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import MovieList from "./pages/MovieList/MovieList";
import ApiReducer from "./store/reducers/APIdata";
import DisplayReducer from "./store/reducers/displayEl";
import LoginReducer from "./store/reducers/login";
import OrderReducer from "./store/reducers/order";
import Nav from "./components/Nav/Nav";
const FullMovie = React.lazy(() => import("./pages/FullMovie/FullMovie"));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
  api: ApiReducer,
  displayEl: DisplayReducer,
  login: LoginReducer,
  order: OrderReducer
});
let store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Nav />
        <Route path="/" exact component={MovieList}></Route>
        {/* <Route path="/genre/:genre" exact component={MovieList}></Route> */}
        {/* <Route path="/logout" component={Logout}></Route> */}
        <Suspense fallback={<div>Loading...</div>}>
          <Route
            path="/movies/:id"
            exact
            render={props => <FullMovie {...props} />}
          />
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
