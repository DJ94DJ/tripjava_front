import React from "react";
import { useState, useEffect } from "react";

const PlannerPins = () => {
  const [index, setIndex] = useState(0); // 현재 이미지의 인덱스를 상태로 관리합니다.
  const images = [
    // 이미지들의 경로를 배열로 저장합니다.
    "/static/seoul.jpg",
    "/static/busan.jpg",
    "/static/jejudo.jpg",
    // 여기에 더 많은 이미지들을 추가할 수 있습니다.
  ];

  useEffect(() => {
    // 이미지를 일정 시간마다 변경하기 위해 타이머를 설정합니다.
    const intervalId = setInterval(() => {
      // 다음 이미지의 인덱스로 변경합니다. 마지막 이미지일 경우 0으로 돌아갑니다.
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 이미지를 변경하는 간격을 설정합니다. 여기서는 3초로 설정했습니다.

    // 컴포넌트가 unmount될 때 타이머를 정리합니다.
    return () => clearInterval(intervalId);
  }, []); // useEffect가 최초 렌더링 시에만 실행되도록 빈 배열을 전달합니다.

  return (
    <div className="test_PlannerPins">
      <img className="test_PlannerPins" src={images[index]} alt="slideshow" />
    </div>
  );
};

export default PlannerPins;
