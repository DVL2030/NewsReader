import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { calcTimeDiff, extractURLParam, getIcon, parseDOM } from "../utils";
import { Link } from "react-router-dom";
import {
  addToBookmark,
  getBookmark,
  removeFromBookmark,
} from "../slice/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Entry(props) {
  const { entry, type, bookmarked } = props;

  const dispatch = useDispatch();

  const bookmarkState = useSelector((state) => state.bookmark);
  const { loadingAdd, loadingRemove } = bookmarkState;

  const updateDom = (id) => {
    const e = id.includes("content") ? entry.content : entry.description;
    if (!e.includes("</")) return;
    else {
      const feedlyDiv = document.getElementById(id);
      if (feedlyDiv && !feedlyDiv.hasChildNodes()) {
        const dom = parseDOM(e);
        dom.style.backgroundColor = "inherit";
        feedlyDiv.appendChild(dom);
      }
    }
  };

  const bookmarkHandler = (e) => {
    e.preventDefault();

    if (loadingAdd || loadingRemove) return;
    if (!bookmarked) {
      dispatch(addToBookmark(entry));
    } else {
      dispatch(removeFromBookmark(entry.id));
    }
  };

  useEffect(() => {
    dispatch(getBookmark());

    if (type === "feedly") {
      updateDom("feedly-description");
      updateDom("feedly-content");
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <div className="entry-header mb-3">
            <h1>{entry.title}</h1>
          </div>
          {entry.description && !entry.description.includes("</") ? (
            <div className="entry-description mb-4">
              <h5 className="text-muted">{entry.description}</h5>
            </div>
          ) : (
            <div className="entry-description mb-4">
              <div className="text-muted">
                <h5 id="feedly-description"></h5>
              </div>
            </div>
          )}

          <div className="entry-info d-flex justify-content-between">
            <div className="entry-info-left ">
              {entry.author && (
                <div className="entry-author">
                  <span>
                    By <b>{entry.author}</b>
                  </span>
                </div>
              )}

              <div className="entry-pubDate">
                <span className="text-secondary">
                  {calcTimeDiff(entry.publishedat)}
                </span>
                <div
                  className="d-inline-block"
                  onClick={(e) => bookmarkHandler(e)}
                >
                  <span className="bookmark-icon-container">
                    <i
                      className={`${
                        bookmarked ? "fa-solid" : "fa-regular"
                      } fa-heart fa-lg`}
                    ></i>
                  </span>
                </div>
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
                <Link to={`/source/${entry.source}`} className="d-inline-block">
                  <span>{entry.source}</span>
                </Link>
              </div>
            </div>
          </div>

          <hr></hr>
          {entry.urltoimage && (
            <div className="entry-image">
              <img src={entry.urltoimage} alt="entry-image"></img>
            </div>
          )}

          <div className="entry-content m-5 p-2">
            {type === "home" && entry.content && <p>{entry.content}</p>}
            {type === "feedly" && (entry.content || entry.description) && (
              <div id="feedly-content"></div>
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
