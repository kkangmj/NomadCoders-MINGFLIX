import { moviesApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class Detail extends React.Component{
    constructor(props){
        super(props);
        const {location: {pathname}} = this.props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }

    async componentDidMount(){
        const {match: {params: {id}}, history: {push}} = this.props;
        const { isMovie } = this.state;
        // this.isMovie = pathname.includes("/movie/");
        const parsedId = parseInt(id);
        if (isNaN(parsedId)){
            return isMovie ? push("/") : push("/tv");
        }
        let result = null;
        try{
            if (isMovie){
                ({data: result} = await moviesApi.movieDetail(parsedId));
            } else{
                ({data: result} = await tvApi.showDetail(parsedId));
            }
        } catch{
            this.setState({
                error: "Can't find anything."
            })
        } finally {
            this.setState({
                loading: false,
                result,
            })
        }
    }

    render() {
        const { result, isMovie, error, loading} = this.state;
        return <DetailPresenter result={result} isMovie={isMovie} error={error} loading={loading} />
    }
}