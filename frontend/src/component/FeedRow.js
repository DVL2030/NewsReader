import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Card from "./Card";

export default function FeedRow(props) {
  const { data } = props;
  return (
    <Container
    //   data-aos="fade-up"
    //   data-aos-duration="1000"
    //   data-aos-anchor-placement="top-bottom"
    >
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
                      <Link to={`/entry/${feed.id}`}>
                        <div className="img-md">
                          <img className="round" src={feed.urltoimage}></img>
                        </div>
                      </Link>
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
