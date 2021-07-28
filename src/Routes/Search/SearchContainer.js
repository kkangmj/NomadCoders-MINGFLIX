import { moviesApi, tvApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class Search extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    updatedTerm: "",
    error: null,
    loading: false,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.setSearchTerm();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm(searchTerm);
    }
  };

  setSearchTerm = async () => {
    const { updatedTerm } = this.state;
    this.setState({
      searchTerm:updatedTerm,
    });
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      updatedTerm: value,
    });
  };

  searchByTerm = async (term) => {
    this.setState({
      loading: true,
    });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(term);
      const {
        data: { results: tvResults },
      } = await tvApi.search(term);
      this.setState({
        movieResults,
        tvResults,
      });
    } catch {
      this.setState({
        error: "Can't find results.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
