import "../../styles/style.scss";

import React from "react";
import { useEffect } from "react";

function Main({ children }) {
  useEffect(() => {
    const gridSize = 200; // 모눈의 크기

    const bodyStyle = document.body.style;
    bodyStyle.backgroundImage = `
     
      linear-gradient(to right,#ded0c8 2px, transparent 1px), 
      linear-gradient(to right,#ebe8e6 15px, transparent 1px), 
      linear-gradient(to left,#ebe8e6 15px, transparent 1px), 
      linear-gradient(to bottom, #ded0c8 2px, transparent 1px)
      `;
    bodyStyle.backgroundSize = `${gridSize}px ${gridSize}px`;
    bodyStyle.backgroundPosition = "center center"; // 배경 이미지 위치를 중앙으로 설정
    bodyStyle.backgroundAttachment = "fixed";
    bodyStyle.backgroundColor = "#ebe8e6"; // 배경 색상 설정
  }, []);

  return (
    <div className="main_body">
      <main>{children}</main>
    </div>
  );
}

export default Main;
