import React from "react";

export default function SorryBox(props) {
  const { header, message } = props;
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <span className="display-1 text-black-80">
        {header ? header : "SORRY"}
      </span>
      <br></br>
      <img src="/imgs/401.png" alt="401"></img>
    </div>
  );
}
