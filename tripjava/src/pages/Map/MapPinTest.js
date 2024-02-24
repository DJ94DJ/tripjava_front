import React from "react";
import "../../styles/style.scss";
import {
  HomePinSvg,
  MealPinSvg,
  PlacePinSvg,
} from "../../components/Map/PinSvg";
import {
  Num1PinSvg,
  Num2PinSvg,
  Num3PinSvg,
  Num4PinSvg,
  Num5PinSvg,
  Num6PinSvg,
  Num7PinSvg,
  Num8PinSvg,
} from "../../components/Map/NumSvg";
import MakePin from "../../components/Map/MakePin";
import MakePindown from "../../components/Map/MakePinDown";
import "../../styles/style.scss";

const MapPinTest = () => {
  const pinTypes = ["home", "meal", "place"];
  const nums = [1, 2, 3, 4, 5, 6, 7, 8];
  const colors = [
    "col1",
    "col2",
    "col3",
    "col4",
    "col5",
    "col6",
    "col7",
    "col8",
  ];
  return (
    <>
      <div className="pintest" style={{ display: "flex", flexWrap: "wrap" }}>
        {pinTypes.map((pinType) =>
          nums.map((num) =>
            colors.map((color) => (
              <div style={{ margin: "10px" }}>
                <MakePindown
                  key={`${pinType}-${num}-${color}`}
                  pinType={pinType}
                  num={num}
                  color={color}
                />
              </div>
            ))
          )
        )}
      </div>
      {/* <HomePinSvg />
      <MealPinSvg />
      <PlacePinSvg />
      <Num1PinSvg />
      <Num2PinSvg />
      <Num3PinSvg />
      <Num4PinSvg />
      <Num5PinSvg />
      <Num6PinSvg />
      <Num7PinSvg />
      <Num8PinSvg /> */}
      {/* <h1>여기에 MakePin 컴포넌트를 사용합니다:</h1>
      <div className="test" style={{ display: "flex", flexWrap: "wrap" }}>
        <MakePin pinType="home" num={7} color="col5" />
        <div>{"- - -"} </div>
        <MakePin pinType="home" num={2} color="col8" />
        <div>{"- - -"} </div>
        <MakePin pinType="home" num={2} color="col7" />
        <div>{"- - -"} </div>
        <MakePin pinType="meal" num={1} color="col1" />
        <div>{"- - -"} </div>
        <MakePin pinType="meal" num={6} color="col2" />
        <div>{"- - -"} </div>
        <MakePin pinType="meal" num={5} color="col3" />
        <MakePin pinType="place" num={3} color="col4" />
        <MakePin pinType="place" num={4} color="col5" />
        <MakePin pinType="place" num={8} color="col6" />
      </div> */}
    </>
  );
};

export default MapPinTest;
