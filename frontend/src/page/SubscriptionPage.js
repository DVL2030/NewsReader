import React, { useEffect } from "react";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSubscription } from "../slice/subSlice";

export default function SubscriptionPage() {
  const dispatch = useDispatch();
  const subState = useSelector((state) => state.subscription);
  const { subscription, loading, error } = subState;

  const deleteSubHandler = () => {};

  useEffect(() => {
    dispatch(getSubscription());
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variants="danger">{error}</MessageBox>
  ) : subscription && subscription.length > 0 ? (
    <div>
      {subscription.map((s, idx) => (
        <Container>
          <Row>
            <Col>
              <div className="sub-avatar img-sm">
                <img className="avatar" src={s.visualurl}></img>
              </div>
              <div>
                <span className="sub-title">{s.title}</span>
              </div>
              <div>
                <Button
                  type="button"
                  className="delete-sub"
                  onClick={deleteSubHandler}
                >
                  Delete
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      ))}
    </div>
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
