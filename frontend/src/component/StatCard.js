import React from "react";

export default function StatCard(props) {
  const { label, icon, stat, bg } = props;

  return (
    <div className="stat-card m-2">
      <div className="stat-card-icon img-sm">
        <img className="" alt={label} src={`/imgs/${icon}`}></img>
      </div>
      <div className={`${bg}`}>
        <div className="stat-card-label">
          <h4>{label}</h4>
        </div>
        <div className="stat-card-stat">
          <big>{stat}</big>
        </div>
      </div>
    </div>
  );
}
