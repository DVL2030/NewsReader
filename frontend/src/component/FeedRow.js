import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "./Card";
import { getIcon } from "../utils";

export default function FeedRow(props) {
  const { data } = props;
  return (
    <Container>
      <Row>
        {data.length > 1 ? (
          <>
            <Col xs={12} md={5}>
              <div className="main-news-card-lg">
                <Card cardData={data[0]} size="lg"></Card>
              </div>
            </Col>
            <Col xs md={7}>
              <div className="main-news-card-sm">
                {data.slice(1, data.length).map((feed, idx) => (
                  <Card key={idx} cardData={feed} size="md"></Card>
                ))}
              </div>
            </Col>
          </>
        ) : (
          <Col>
            <div className="main-news-card-md">
              {data.map((feed, idx) => (
                <Container key={idx}>
                  <Row>
                    <Col xs={9}>
                      <Card key={idx} cardData={feed} size="md"></Card>
                    </Col>
                    <Col xs={3}>
                      <div className="img-sm">
                        <img className="round" src={feed.urlToImage}></img>
                      </div>
                    </Col>
                  </Row>
                </Container>
              ))}
            </div>
          </Col>
        )}
      </Row>
      <hr></hr>
    </Container>
  );
}
