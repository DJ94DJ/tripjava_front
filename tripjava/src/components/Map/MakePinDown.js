import React, { useRef } from "react";
import { HomePinSvg, MealPinSvg, PlacePinSvg } from "../Map/PinSvg";
import {
  Num1PinSvg,
  Num2PinSvg,
  Num3PinSvg,
  Num4PinSvg,
  Num5PinSvg,
  Num6PinSvg,
  Num7PinSvg,
  Num8PinSvg,
} from "../Map/NumSvg";
import domtoimage from "dom-to-image";

const pinComponents = {
  home: HomePinSvg,
  meal: MealPinSvg,
  place: PlacePinSvg,
};

const numComponents = {
  1: Num1PinSvg,
  2: Num2PinSvg,
  3: Num3PinSvg,
  4: Num4PinSvg,
  5: Num5PinSvg,
  6: Num6PinSvg,
  7: Num7PinSvg,
  8: Num8PinSvg,
};

export const MakePindown = ({ pinType, num, color }) => {
  const PinComponent = pinComponents[pinType];
  const NumComponent = numComponents[num];

  const svgRef = useRef();

  const handleDownload = () => {
    if (svgRef.current) {
      domtoimage
        .toPng(svgRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "download.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error while converting SVG to PNG:", error);
        });
    } else {
      console.error("svgRef.current is null or undefined");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef}>
        <PinComponent />
        <g transform="translate(45, -20)">
          <NumComponent color={color} />
        </g>
      </svg>
      <button onClick={handleDownload}>Download PNG</button>
    </div>
  );
};

export default MakePindown;
