import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import FeedRow from "../component/FeedRow";

import { getTopic } from "../slice/newsSlice";

export default function TopicPage() {
  const dispatch = useDispatch();
  const param = useParams();
  const { topic } = param;

  const newsState = useSelector((state) => state.news);
  const { newsHome, loading, error } = newsState;

  useEffect(() => {
    if (!newsHome || !newsHome[topic]) {
      dispatch(getTopic(topic));
    }
  }, []);

  return loading ? (
    <LoadingBox />
  ) : (
    <div>
      {error && <MessageBox variants="danger">{error}</MessageBox>}
      {newsHome && (
        <Container id="topic-container" className="py-5">
          <div className="main-message">
            <h4>{topic}</h4>
          </div>
          <Row>
            <Col>
              <div className="crd p-4">
                {[...Array(Number(10)).keys()].map((x) => (
                  <FeedRow
                    key={x}
                    topic={topic}
                    data={newsHome.slice(4 * (x - 1), 4 * x)}
                  ></FeedRow>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
