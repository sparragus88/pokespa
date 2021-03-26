import React from "react";
import "./Capture.css";

function CaptureFailed(props) {
  return (
    <div className="wrapper-capture-failed">
      <h1>
        Oooopppsss.. ! <br /> {props.name} Failed to captured!!
      </h1>

      <button
        className="btn btn__primary btn__medium"
        id="btn-back"
        onClick={props.handlerClickBack}
      >
        Back
      </button>
    </div>
  );
}

export default CaptureFailed;
