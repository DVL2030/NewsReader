import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "./Card";
import { getIcon } from "../utils";
import { Link } from "react-router-dom";

export default function FeedCol(props) {
  const { data, topic } = props;
  return (
    <Container className="crd feed-col p-4 m-2">
      <Row>
        <Col>
          <div className="main-news-card-sm">
            {data.map((feed, idx) => (
              <Container key={idx}>
                <Row>
                  <Col xs={8}>
                    <Card topic={topic} cardData={feed} size="md"></Card>
                  </Col>
                  <Col xs={4}>
                    <Link to={`/topics/${topic}/entry/${feed.source.id}`}>
                      <div className="img-sm">
                        <img className="round" src={feed.urlToImage}></img>
                      </div>
                    </Link>
                  </Col>
                </Row>
                <hr></hr>
              </Container>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
