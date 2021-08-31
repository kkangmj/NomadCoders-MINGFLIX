import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Video from "Components/Video";

const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 45%;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Error = styled.div`
  padding-top: 90px;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  text-align: center;
`;

const VideoTabPresenter = ({ videoKeys, error, loading }) => (
  <Container>
    {error ? (
      <Error>{error}</Error>
    ) : (
        
      videoKeys.map((video, index) =>
        index < 3 ? <Video key={index} video={video} /> : ""
      )
    )}
  </Container>
);

// 3개만 보여주기
// 컴포넌트 따로 또 만들기

VideoTabPresenter.propTypes = {
  videoKeys: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default VideoTabPresenter;
