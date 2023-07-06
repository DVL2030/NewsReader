import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getToday, getIcon } from "../utils";

import { Button } from "react-bootstrap";

import { getHomePage } from "../slice/newsSlice";

import LoadingBox from "../component/LoadingBox";
import Card from "../component/Card";
import FeedRow from "../component/FeedRow";

export default function HomePage() {
  const dispatch = useDispatch();

  const signInHandler = () => {};

  const newsState = useSelector((state) => state.news);
  const { newsHome, loading, error } = newsState;

  useEffect(() => {
    if (!newsHome) dispatch(getHomePage());
  }, []);

  return loading ? (
    <LoadingBox />
  ) : (
    <Container id="main-container" className="py-5">
      <div className="main-message">
        <h4>Your briefing</h4>
        <span className="text-secondary">{getToday()}</span>
      </div>
      <Row>
        <Col xs={12} md={8}>
          <div className="crd p-4">
            <div>
              <Link to="/topics/world" className="topic-navigator">
                Top stories <i className="fa fa-angle-right "></i>
              </Link>
            </div>
            <FeedRow data={newsHome.slice(0, 4)}></FeedRow>
            <FeedRow data={newsHome.slice(4, 8)}></FeedRow>
          </div>
        </Col>
        <Col md={4} className="d-none d-md-block">
          <div className="crd p-4">
            <div className="text-primary">
              <h5>Picks for you</h5>
            </div>
            <hr></hr>
            <div>
              <div className="mb-2">
                <span>
                  Sign in for personalized stories in your briefing & news feed
                </span>
              </div>

              <Button
                variant="primary"
                className="home-sign-in w-100"
                onClick={signInHandler}
              >
                Sign in
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
