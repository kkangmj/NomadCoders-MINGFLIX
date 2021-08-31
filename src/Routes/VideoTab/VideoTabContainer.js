import React from "react";
import { moviesApi } from "api";
import VideoTabPresenter from "./VideoTabPresenter"

export default class VideoTab extends React.Component {

  state = {
    videoKeys: [],
    error: null,
    loading: true,
  };

  getVideoKeys = async (id) => {
    try {
      const {
        data: {
          videos: { results: videoKeys },
        },
      } = await moviesApi.movieDetail(id);
      this.setState({ videoKeys });
    } catch {
      this.setState({
        error: "Can't get videos😅",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.getVideoKeys(id);
  }

  render() {
    return <VideoTabPresenter {...this.state} />;
  }
}
