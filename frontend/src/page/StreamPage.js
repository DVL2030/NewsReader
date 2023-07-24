import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscription, streamFeed } from "../slice/subSlice";
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
  const { subscription, stream, loading, error } = subState;

  const [data, setData] = useState();

  const filterStream = (source) => {
    if (source === "all") setData(stream);
    else {
      const filtered = stream.filter((s) => s.source === source);
      setData(filtered);
    }
  };

  useEffect(() => {
    if (!subscription) dispatch(getSubscription());
    if (!stream) dispatch(streamFeed());
    else if (!data) setData(stream);
  }, [data]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variants="danger">{error}</MessageBox>
  ) : data && data.length > 0 ? (
    <Container>
      <div className="main-message">
        <h4>Your Streaming</h4>
        <span className="text-secondary">based on your subscrition</span>
      </div>
      <Row>
        <Col xs={12} lg={9}>
          <div className="crd p-4">
            {data.map((s, idx) => (
              <FeedRow key={idx} data={[s]}></FeedRow>
            ))}
          </div>
        </Col>
        {subscription && (
          <Col lg={3} className="d-none d-lg-block">
            <ul className="stream-sub-list no-list-style">
              <li onClick={() => filterStream("all")}>
                <div className="text-center">
                  <b>Select All</b>
                </div>
              </li>
              {subscription.map((s, idx) => (
                <li key={idx} onClick={() => filterStream(s.title)}>
                  <div className="d-flex gap-4">
                    <div className="img-xxs">
                      <img
                        src={s.visualurl ? s.visualurl : "/imgs/no-image.png"}
                      ></img>
                    </div>
                    <div>
                      <b>{s.title}</b>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Col>
        )}
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
