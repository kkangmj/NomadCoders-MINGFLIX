import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import VideoTab from "Routes/VideoTab";
import ProductionTab from "Routes/ProductionTab";

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
  width: 100%;
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

const TabContainer = styled.div`
  display: flex;
  margin-top: 30px;
  width: 80%;
  height: 42px;
`;

const Tab = styled.div`
  text-align: center;
  padding: 5px;
  margin-right: 10px;
  width: 160px;
  font-weight: 500;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  background-color: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.3)"};
  cursor: pointer;
  z-index: 1;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  &.video {
    padding-top: 12px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const TabName = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const DetailPresenter = withRouter(
  ({ result, isMovie, error, loading, location: { pathname } }) =>
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
            {result.original_title
              ? result.original_title
              : result.original_name}{" "}
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
              <Overview>
                {result.overview.length > 400
                  ? `${result.overview.substring(0, 400)}...`
                  : `${result.overview}`}
              </Overview>
              <TabContainer>
                {result.videos.results.length > 0 && (
                  <Tab active={pathname.includes("/video")} className="video">
                    <Link
                      to={
                        isMovie
                          ? `/movie/${result.id}/video`
                          : `/show/${result.id}/video`
                      }
                    >
                      <TabName>Video</TabName>
                    </Link>
                  </Tab>
                )}
                {result.production_companies.length > 0 &&
                  result.production_countries.length > 0 && (
                    <Tab active={pathname.includes("/production")}>
                      <Link
                        to={
                          isMovie
                            ? `/movie/${result.id}/production`
                            : `/show/${result.id}/production`
                        }
                      >
                        <TabName>Production Companies & Countries</TabName>
                      </Link>
                    </Tab>
                  )}
              </TabContainer>
              <Route path="/movie/:id/video" component={VideoTab} />
              <Route path="/show/:id/video" component={VideoTab} />
              <Route path="/movie/:id/production" component={ProductionTab} />
              <Route path="/show/:id/production" component={ProductionTab} />
            </Data>
          </Content>
        </Container>
      </>
    )
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
