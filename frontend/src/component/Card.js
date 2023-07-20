import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calcTimeDiff, getIcon } from "../utils";
import { useDispatch, useSelector } from "react-redux";

export default function Card(props) {
  const dispatch = useDispatch();

  const { cardData, size } = props;

  return (
    <div className="crd border-none">
      {size == "lg" && (
        <div className="crd-image">
          <Link to={`/entry/${cardData.id}`}>
            <img
              className="round"
              src={cardData.urltoimage}
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
        <Link to={`/source/${cardData.source}`} className="d-inline-block">
          <span>{cardData.source}</span>
        </Link>
      </div>
      <div className="crd-title">
        <Link to={`/entry/${cardData.id}`} className="text-secondary">
          <h5>
            {size == "lg" || size == "md"
              ? `${cardData.title.substring(0, 100)}...`
              : cardData.title}
          </h5>
        </Link>
      </div>

      <div className="m-0">
        <small className="text-secondary">
          {calcTimeDiff(cardData.publishedat)}
        </small>
      </div>
    </div>
  );
}
