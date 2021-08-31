import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 25px 10px;
  width: 100%;
`;

const IFrame = styled.iframe`
  width: 100%;
  height: 70%;
  border: none;
  border-radius: 3px;
`;

const Content = styled.div`
  padding-top: 5px;
  font-weight: 500;
  color: black;
`;

const Name = styled.div`
    padding-bottom: 3px;
`;

const Date = styled.div`
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3)
`;

const Video = ({ video }) => (
  <Container>
    <IFrame src={"https://www.youtube.com/embed/".concat(video.key)}></IFrame>
    <Content>
      <Name>
        {video.name.length > 25
          ? `${video.name.substring(0, 25)}...`
          : video.name}
      </Name>
      <Date>
        {video.published_at.substring(0, 10)}
      </Date>
    </Content>
  </Container>
);

export default Video;
