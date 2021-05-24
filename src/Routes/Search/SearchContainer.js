import { moviesApi, tvApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class Search extends React.Component{
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null,
        loading: false
    };
    
    handleSubmit = (event) => {
        event.preventDefault();
        const {searchTerm} = this.state;
        if (searchTerm !== ""){
            this.searchByTerm(searchTerm);
        }
    }

    updateTerm = (event) => {
        const {target: {value}} = event;
        this.setState({
            searchTerm: value 
        })
    };

    searchByTerm = async (term) => {
        this.setState({
            loading: true,
        })
        try{
            const {data: {results: movieResults}} = await moviesApi.search(term);
            const {data: {results: tvResults}} = await tvApi.search(term);
            this.setState({
                movieResults,
                tvResults,
                loading: true
            })
        } catch{
            this.setState({
                error: "Can't find results.",
            })
        } finally{
            this.setState({
                loading: false,
            })
        }
    }

    render() {
        const { movieResults, tvResults, searchTerm, error, loading } = this.state;
        return <SearchPresenter movieResults={movieResults} tvResults={tvResults} searchTerm={searchTerm} error={error} loading={loading} handleSubmit={this.handleSubmit} updateTerm={this.updateTerm} />
    }
}