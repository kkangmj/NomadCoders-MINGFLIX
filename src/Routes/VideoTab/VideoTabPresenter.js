import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Video from "../../Components/Video";

const Container = styled.div`
  margin-top: 10px;
  width: ${(props) =>
    props.videoNum === 1 ? "33.33%" : props.videoNum === 2 ? "66.66%" : "100%"};
  grid-template-columns: ${(props) =>
    props.videoNum === 1
      ? "repeat(1, 1fr)"
      : props.videoNum === 2
      ? "repeat(2, 1fr)"
      : "repeat(3, 1fr)"};
  /* width: 100%; */
  height: 45%;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  display: grid;
  /* grid-template-columns: repeat(3, 1fr); */
`;

const Error = styled.div`
  padding-top: 90px;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  text-align: center;
`;

const VideoTabPresenter = ({ videoKeys, error, loading }) => (
  <Container videoNum={videoKeys.length}>
    {error ? (
      <Error>{error}</Error>
    ) : (
      videoKeys.map((video, index) =>
        index < 3 ? <Video key={index} video={video} /> : ""
      )
    )}
  </Container>
);

VideoTabPresenter.propTypes = {
  videoKeys: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default VideoTabPresenter;
