import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "./Card";
import { getIcon } from "../utils";

export default function FeedRow(props) {
  const { data } = props;
  return (
    <Container>
      <hr></hr>
      <Row>
        <Col xs={12} md={5}>
          <div className="main-news-card-lg">
            <Card
              image={data[0].urlToImage}
              icon={getIcon(data[0].url)}
              pubDate={data[0].publishedAt}
              title={data[0].title}
              source={data[0].source.name}
              size={"lg"}
            ></Card>
          </div>
        </Col>
        <Col xs md={7}>
          <div className="main-news-card-sm">
            {data.slice(1, 4).map((feed, idx) => (
              <Card
                idx={idx}
                image={feed.urlToImage}
                icon={getIcon(feed.url)}
                pubDate={feed.publishedAt}
                title={feed.title}
                source={feed.source.name}
                size={"md"}
              ></Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
