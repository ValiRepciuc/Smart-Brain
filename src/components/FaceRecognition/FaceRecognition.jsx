import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="mt2" style={{ position: "relative" }}>
        <img
          id="inputimage"
          src={imageURL}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: `${box.topRow}px`,
            right: `${box.rightCol}px`,
            bottom: `${box.bottomRow}px`,
            left: `${box.leftCol}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
