import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { streamFeed } from "../slice/subSlice";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { Col, Container, Row } from "react-bootstrap";
import FeedRow from "../component/FeedRow";

export default function StreamPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const subState = useSelector((state) => state.sub);
  const { stream, loading, error } = subState;

  useEffect(() => {
    dispatch(streamFeed());
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variants="danger">{error}</MessageBox>
  ) : stream && stream.length > 0 ? (
    <Container>
      <div className="main-message">
        <h4>Your Streaming</h4>
        <span className="text-secondary">based on your subscrition</span>
      </div>
      <Row>
        <Col xs={9}>
          <div className="crd p-4">
            {stream.map((s, idx) => (
              <FeedRow key={idx} data={[s]}></FeedRow>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container>
      <Row>
        <Col>
          <div>
            <img src="/imgs/nothing.png" alt="nothing"></img>
          </div>
          <div className="my-4 text-center">
            <h3 className="text-secondary">
              You do not have any feeds in your subscrition yet.. <br></br>
              Please search a feed and add it to your subscription
            </h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
