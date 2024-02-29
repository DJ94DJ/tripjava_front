import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../styles/style.scss";

// 임시 이미지 URL
// const placeholderImage = "https://via.placeholder.com/80";
const placeholderImage = "../static/noimage.gif"

const PlannerLine = ({ planner_no }) => {
  // plannerId가 없어서 오류납니당
  const [plannerData, setPlannerData] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/planner/trip-route/${planner_no}`)
      .then((response) => {
        // console.log("컴포넌트~여행 정보 요청 응답: ", response.data);
        setPlannerData(response.data); // 응답에서 받아온 데이터를 상태에 저장합니다.
      })
      .catch((error) => {
        console.error("여행 정보를 가져오는 동안 오류 발생: ", error);
      });
  }, [planner_no]);

  const handleScroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="PlannerLine">
      <div className="scrollContainer" ref={scrollRef}>
        <div className="scrollContent">
          {plannerData &&
            plannerData.plans.map((item, index) => (
              <div key={index} className="item">
                <div className="dot" />
                {item.tourist && item.tourist.firstimage ? (
                  <img src={item.tourist.firstimage} alt="관광지 이미지" />
                ) : (
                  <img className="defaultImg" src={placeholderImage} alt="임시 이미지" />
                )}
                <h2>
                  {item.tourist ? item.tourist.title : "관광지 정보 없음"}
                </h2>
                <div>{item.type === 0 ? "숙소" : `${item.type}박`}</div>
              </div>
            ))}
        </div>
        {/* 데이터가 충분히 많을 때만 화살표 표시 */}
        {plannerData && plannerData.plans.length > 5 && (
          <>
            <div className="scrollArrow left" onClick={() => handleScroll(-900)}>
              {"<"}
            </div>
            <div className="scrollArrow right" onClick={() => handleScroll(900)}>
              {">"}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default PlannerLine;