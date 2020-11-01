import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { MovieList } from "./MovieList";
import Movie from "../../components/Movie/Movie";

configure({ adapter: new Adapter() });

describe("<MovieList />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MovieList onLoadMovies={() => {}} />);
  });

  it("should display 100 <Movie /> elements ", () => {
    wrapper.setProps({ movies: [{ title: "Joker" }] });
    expect(wrapper.find(Movie)).toHaveLength(1);
  });
});
