import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import Card from "../component/Card";
import { Col, Container, Row } from "react-bootstrap";
import FeedRow from "../component/FeedRow";
import { getBookmarkEntries } from "../slice/bookmarkSlice";

export default function BookmarkPage() {
  const dispatch = useDispatch();
  const bookmarkState = useSelector((state) => state.bookmark);
  const { bookmarkEntries, loading, error } = bookmarkState;

  useEffect(() => {
    dispatch(getBookmarkEntries());
  }, []);
  return loading ? (
    <LoadingBox />
  ) : (
    <div>
      {bookmarkEntries ? (
        bookmarkEntries.length > 0 ? (
          <Container>
            <div className="main-message">
              <h4>Your Bookmark</h4>
            </div>
            <Row>
              <Col xs={12} lg={9}>
                <div className="crd p-4">
                  {bookmarkEntries.map((b, idx) => (
                    <FeedRow key={idx} data={[b]}></FeedRow>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          <div>
            <div>
              <img src="/imgs/nothing.png" alt="nothing"></img>
            </div>
            <div className="my-4 text-center">
              <h3 className="text-secondary">
                You do not have any feeds in your subscrition yet.. <br></br>
                Please search a feed and add it to your subscription
              </h3>
            </div>
          </div>
        )
      ) : error ? (
        <MessageBox variants="danger">{error}</MessageBox>
      ) : (
        <MessageBox variants="danger">
          <span>Unexpected error occurred... Please refresh this page.</span>
        </MessageBox>
      )}
    </div>
  );
}
