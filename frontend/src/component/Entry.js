import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { calcTimeDiff, extractURLParam, getIcon } from "../utils";
import { Link } from "react-router-dom";

export default function Entry(props) {
  const { entry } = props;
  return (
    <Container>
      <Row>
        <Col>
          <div className="entry-header mb-3">
            <h1>{entry.title}</h1>
          </div>
          <div className="entry-description mb-4">
            <h5 className="text-muted">{entry.description}</h5>
          </div>
          <div className="entry-info d-flex justify-content-between">
            <div className="entry-info-left ">
              <div className="entry-author">
                <span>
                  By <b>{entry.author}</b>
                </span>
              </div>
              <div className="entry-pubDate">
                <span className="text-secondary">
                  {calcTimeDiff(entry.publishedAt)}
                </span>
              </div>
            </div>
            <div className="entry-info-right ">
              <div className="entry-source">
                <div className="img-icon">
                  <img
                    className="source-icon d-inline-block"
                    src={getIcon(entry.url)}
                  ></img>
                </div>
                <Link
                  to={`/source/${entry.source.name}`}
                  className="d-inline-block"
                >
                  <span>{entry.source.name}</span>
                </Link>
              </div>
            </div>
          </div>

          <hr></hr>
          <div className="entry-image">
            <img src={entry.urlToImage} alt="entry-image"></img>
          </div>

          <div className="entry-content m-5 p-2">
            {entry.content && (
              <p>
                {entry.content.substring(
                  0,
                  entry.content.search(/\[\+\d+ chars\]/m)
                )}
              </p>
            )}
            {entry.url && entry.url.includes("youtube") && (
              <div>
                <iframe
                  width="800"
                  height="500"
                  src={`https://www.youtube.com/embed/${extractURLParam(
                    entry.url,
                    "v"
                  )}?autoplay=1&mute=1`}
                ></iframe>
              </div>
            )}
            {entry.url && (
              <div>
                <p>
                  To read more, visit <a href={entry.url}>{entry.url}</a>
                </p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
