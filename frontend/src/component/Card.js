import React from "react";
import { Link } from "react-router-dom";
import { calcTimeDiff } from "../utils";
export default function Card(props) {
  const { image, icon, pubDate, title, source, size } = props;
  return (
    <div className="crd border-none">
      {size == "lg" && (
        <div className="crd-image">
          <img className="round" src={image} alt="feed-image"></img>
        </div>
      )}
      <div className="crd-source mb-1">
        {icon && (
          <div className="img-icon">
            <img className="source-icon d-inline-block" src={icon}></img>
          </div>
        )}
        <Link to={`/source/${source}`} className="d-inline-block">
          <span>{source}</span>
        </Link>
      </div>
      <div className="crd-title">
        <Link to="/article/" className="text-secondary">
          <h5>
            {size == "lg" || size == "md"
              ? `${title.substring(0, 100)}...`
              : title}
          </h5>
        </Link>
      </div>

      <div className="m-0">
        <small className="text-secondary">{calcTimeDiff(pubDate)}</small>
      </div>
    </div>
  );
}
