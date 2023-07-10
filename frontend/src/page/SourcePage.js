import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import FeedRow from "../component/FeedRow";
import { getSource } from "../slice/newsSlice";
import Card from "../component/Card";
export default function SourcePage() {
  const dispatch = useDispatch();
  const param = useParams();
  const { source } = param;

  const newsState = useSelector((state) => state.news);
  const { newsSource, loading, error } = newsState;

  useEffect(() => {
    dispatch(getSource(source));
  }, []);

  return loading ? (
    <LoadingBox />
  ) : (
    <div>
      {newsSource && newsSource.length > 0 ? (
        <Container id="topic-container" className="py-5">
          <div className="main-message">
            <h4>{source}</h4>
          </div>
          <Row>
            <Col>
              <div className="crd p-4">
                {[...Array(Number(10)).keys()].map((x) => (
                  <FeedRow
                    key={x}
                    data={newsSource.slice(4 * (x - 1), 4 * x)}
                  ></FeedRow>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        error && <MessageBox variants="danger">{error}</MessageBox>
      )}
    </div>
  );
}
