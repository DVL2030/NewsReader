import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "./Card";
import { getIcon } from "../utils";

export default function FeedCol(props) {
  const { data } = props;
  return (
    <Container className="crd feed-col p-4 m-2">
      <Row>
        <Col>
          <div className="main-news-card-sm">
            {data.map((feed, idx) => (
              <>
                <Container key={idx}>
                  <Row>
                    <Col xs={9}>
                      <Card
                        idx={idx}
                        image={feed.urlToImage}
                        icon={getIcon(feed.url)}
                        pubDate={feed.publishedAt}
                        title={feed.title}
                        source={feed.source.name}
                        size={"md"}
                      ></Card>
                    </Col>
                    <Col xs={3}>
                      <div className="img-sm">
                        <img className="round" src={feed.urlToImage}></img>
                      </div>
                    </Col>
                  </Row>
                </Container>
                <hr></hr>
              </>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
