import React from "react";
import { Link } from "react-router-dom";
import { calcTimeDiff, getIcon } from "../utils";

export default function Card(props) {
  const { cardData, size } = props;

  return (
    <div className="crd border-none">
      {size == "lg" && (
        <div className="crd-image">
          <Link to="/article/">
            <img
              className="round"
              src={cardData.urlToImage}
              alt="feed-image"
            ></img>
          </Link>
        </div>
      )}
      <div className="crd-source mb-1">
        {cardData.url && (
          <div className="img-icon">
            <img
              className="source-icon d-inline-block"
              src={getIcon(cardData.url)}
            ></img>
          </div>
        )}
        <Link to={`/source/${cardData.source.name}`} className="d-inline-block">
          <span>{cardData.source.name}</span>
        </Link>
      </div>
      <div className="crd-title">
        <Link to="/article/" className="text-secondary">
          <h5>
            {size == "lg" || size == "md"
              ? `${cardData.title.substring(0, 100)}...`
              : cardData.title}
          </h5>
        </Link>
      </div>

      <div className="m-0">
        <small className="text-secondary">
          {calcTimeDiff(cardData.publishedAt)}
        </small>
      </div>
    </div>
  );
}
