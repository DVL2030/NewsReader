import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { searchFeeds } from "../slice/feedSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getSubscription,
  subscribeFeed,
  unSubscribeFeed,
} from "../slice/subSlice";

export default function FeedSearchResultPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const { keyword } = param;

  const [selectIdx, setSelectIdx] = useState(0);

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const feedState = useSelector((state) => state.feed);
  const { feedSearched, loading, error } = feedState;

  const subState = useSelector((state) => state.sub);
  const {
    subscription,
    subscribeLoading,
    unsubscribeLoading,
    loading: subLoading,
    success,
    error: subError,
  } = subState;

  const subScribeHandler = (feed, idx) => {
    if (!userInfo) navigate(`/signin?redirect=/feed/search/${keyword}`);
    else {
      setSelectIdx(idx);
      dispatch(subscribeFeed(feed));
    }
  };

  const UnSubscribeHandler = (id, idx) => {
    setSelectIdx(idx);
    dispatch(unSubscribeFeed(id));
  };

  useEffect(() => {
    dispatch(searchFeeds(keyword));
    dispatch(getSubscription());
  }, []);

  return loading ? (
    <LoadingBox />
  ) : (
    <Container>
      {error && <MessageBox variants="danger">{error}</MessageBox>}
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
              {subscription && subscription.find((s) => s.id === feed.id) ? (
                <Button
                  type="button"
                  onClick={() => UnSubscribeHandler(feed.id, idx)}
                >
                  {unsubscribeLoading && selectIdx === idx ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <span>Unsubscribe</span>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => subScribeHandler(feed, idx)}
                >
                  {subscribeLoading && selectIdx === idx ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </Button>
              )}
            </Col>
          </Row>
        ))}
    </Container>
  );
}
