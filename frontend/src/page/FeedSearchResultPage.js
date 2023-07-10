import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { searchFeeds } from "../slice/feedSlice";
import { useParams } from "react-router-dom";

export default function FeedSearchResultPage() {
  const dispatch = useDispatch();
  const param = useParams();
  const { keyword } = param;

  const subState = useSelector((state) => state.feed);
  const { feedSearched, loading, error } = subState;

  const subScribeHandler = () => {};

  useEffect(() => {
    dispatch(searchFeeds(keyword));
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variants="danger">{error}</MessageBox>
  ) : (
    <Container>
      {feedSearched &&
        feedSearched.map((feed, idx) => (
          <Row key={idx} className="feeds-search-container">
            <Col xs="auto">
              <div className="feed-img">
                <img
                  className="avatar"
                  alt={feed.title}
                  src={feed.visualurl ? feed.visualurl : ""}
                ></img>
              </div>
            </Col>
            <Col className="feeds-search-content mx-2">
              <h5>{feed.title}</h5>
              <div>{feed.description}</div>
            </Col>
            <Col xs="auto">
              <Button type="button" onClick={subScribeHandler}>
                Subscribe
              </Button>
            </Col>
          </Row>
        ))}
    </Container>
  );
}
