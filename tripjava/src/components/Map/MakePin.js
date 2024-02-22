import React from "react";
import { HomePinSvg, MealPinSvg, PlacePinSvg } from "./PinSvg";
import {
  Num1PinSvg,
  Num2PinSvg,
  Num3PinSvg,
  Num4PinSvg,
  Num5PinSvg,
  Num6PinSvg,
  Num7PinSvg,
  Num8PinSvg,
} from "./NumSvg";

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

export const MakePin = ({ pinType, num, color }) => {
  const PinComponent = pinComponents[pinType];
  const NumComponent = numComponents[num];

  return (
    <div style={{ position: "relative" }}>
      <PinComponent />
      <div style={{ position: "absolute", top: -20, left: 45 }}>
        <NumComponent color={color} />
      </div>
    </div>
  );
};

export default MakePin;
