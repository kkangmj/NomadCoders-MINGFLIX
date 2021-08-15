import React from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import VideoTab from "Routes/DetailTab/VideoTab";
import ProductionTab from "Routes/DetailTab/ProductionTab";
import SeriesTab from "Routes/DetailTab/SeriesTab";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px 50px 0 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(2px);
  opacity: 0.3;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const CoverWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 25%;
  overflow: hidden;
`;

const Cover = styled.div`
  float: left;
  height: 0;
  width:100%;
  padding-top: 75%;
  padding-bottom: 75%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 8px;
`;

const Data = styled.div`
  width: 60%;
  margin-left: 50px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 15px;
`;

const ItemContainer = styled.div`
  margin: 20px 0px;
`;

const Item = styled.span``;

const IMDBLink = styled.a`
  position: relative;
  z-index: 1;
`;

const Divider = styled.span`
  margin: 0px 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 80%;
`;

const Tab = styled.div`
  display: flex;
  margin-top: 30px;
  width: 50%;
`;

const TabItem = styled.li`
  text-align: left;
  margin-right: 100px;
  display: flex;
  align-items: center;
  z-index: 1;
`;

const DetailPresenter = ({ result, isMovie, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <Message text={error} color="#e74c3c" />
    </>
  ) : (
    <>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | MINGFLIX
        </title>
      </Helmet>
      <Container>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <CoverWrapper>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../Assets/noPosterSmall.jpg")
            }
          />
          </CoverWrapper>
          <Data>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.release_date && result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time[0]}{" "}
                min
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
              <Divider>{result.imdb_id ? "•" : ""}</Divider>
              <Item>
                <IMDBLink
                  href={
                    result.imdb_id
                      ? `https://www.imdb.com/title/${result.imdb_id}`
                      : null
                  }
                  target="_blank"
                >
                  {result.imdb_id ? "IMDB »" : ""}{" "}
                </IMDBLink>
              </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
            <Tab>
              <TabItem>
                <Link
                  to={
                    isMovie
                      ? `/movie/${result.id}/video`
                      : `/show/${result.id}/video`
                  }
                >
                  Video
                </Link>
              </TabItem>
              <TabItem>
                <Link
                  to={
                    isMovie &&
                    (isMovie
                      ? `/movie/${result.id}/production`
                      : `/show/${result.id}/production`)
                  }
                >
                  Production Companies & Countries
                </Link>
              </TabItem>
              <TabItem>
                {!isMovie ? (
                  <Link to={`/show/${result.id}/series`}>Series</Link>
                ) : (
                  ""
                )}
              </TabItem>
            </Tab>
            <Route
              path={isMovie ? "/movie/:id/video" : "/show/:id/video"}
              component={VideoTab}
            />
            <Route
              path={isMovie ? "/movie/:id/production" : "/show/:id/production"}
              component={ProductionTab}
            />
            <Route path="/show/:id/series" component={SeriesTab} />
          </Data>
        </Content>
      </Container>
    </>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
