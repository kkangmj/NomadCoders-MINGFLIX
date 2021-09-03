import React from "react";
import { moviesApi, tvApi } from "api";
import VideoTabPresenter from "./VideoTabPresenter";

export default class VideoTab extends React.Component {
  state = {
    videoKeys: [],
    isMovie: true,
    error: null,
    loading: true,
  };

  getVideoKeys = async (id) => {
    try {
      if (this.state.isMovie) {
        const {
          data: {
            videos: { results: videoKeys },
          },
        } = await moviesApi.movieDetail(id);
        this.setState({ videoKeys });
      }
      else {
        const {
          data: {
            videos: { results: videoKeys },
          },
        } = await tvApi.showDetail(id);
        this.setState({ videoKeys });
      }
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
        url,
      },
    } = this.props;
    if (url.includes("/show")) {
      await this.setState({ isMovie: false });
    }
    this.getVideoKeys(id);
  }

  render() {
    return <VideoTabPresenter {...this.state} />;
  }
}
