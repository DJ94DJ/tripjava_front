import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../../styles/style.scss';

// 임시 이미지 URL
// const placeholderImage = "https://via.placeholder.com/80";
const placeholderImage = '../static/noimage.gif';

const PlannerLine = ({ planner_no }) => {
  // plannerId가 없어서 오류납니당
  const [plannerData, setPlannerData] = useState(null);
  const scrollRef = useRef(null);
  const rightArrowRef = useRef(null); // 오른쪽 화살표에 대한 ref
  const leftArrowRef = useRef(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/planner/trip-route/${planner_no}`)

      // .get(`http://localhost:8080/planner/trip-route/${planner_no}`)
      .then((response) => {
        // console.log("컴포넌트~여행 정보 요청 응답: ", response.data);
        setPlannerData(response.data); // 응답에서 받아온 데이터를 상태에 저장합니다.
      })
      .catch((error) => {
        console.error('여행 정보를 가져오는 동안 오류 발생: ', error);
      });
  }, [planner_no]);

  // const handleScroll = (scrollOffset) => {
  //   scrollRef.current.scrollLeft += scrollOffset;
  // };
  const handleScroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const handleScrollEvent = () => {
      if (!scrollContainer || !rightArrowRef.current) return;

      // 스크롤 컨테이너의 너비를 가져옵니다.
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainer;
      // 화살표의 위치를 조정합니다.
      // 예를 들어, 스크롤이 최대로 되어 있을 때 오른쪽 화살표를 숨기거나 위치를 조정할 수 있습니다.
      const isAtRightEnd = scrollWidth - clientWidth === scrollLeft;
      if (isAtRightEnd) {
        // 스크롤이 오른쪽 끝에 도달한 경우, 화살표를 숨깁니다.
        rightArrowRef.current.style.display = 'none';
      } else {
        // 그렇지 않은 경우, 화살표를 다시 표시합니다.
        rightArrowRef.current.style.display = 'flex';
      }
    };

    scrollContainer.addEventListener('scroll', handleScrollEvent);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);
  return (
    <div className="PlannerLine">
      <div className="scrollContainer" ref={scrollRef}>
        <div className="scrollContent">
          {plannerData &&
            plannerData.plans.map((item, index) => (
              <div key={index} className="item">
                <div className={`label type${item.type}`}>
                  {item.type === 0 ? '숙소' : `${item.type}일차`}
                </div>

                <div className="item_container">
                  <div className="date"></div>
                  {item.tourist && item.tourist.firstimage ? (
                    <img src={item.tourist.firstimage} alt="관광지 이미지" />
                  ) : (
                    <img
                      className="defaultImg"
                      src={placeholderImage}
                      alt="임시 이미지"
                    />
                  )}

                  <div className="tour_title">
                    {item.tourist ? item.tourist.title : '관광지 정보 없음'}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* 데이터가 충분히 많을 때만 화살표 표시 */}
        {plannerData && plannerData.plans.length > 5 && (
          <>
            <div
              className="scrollArrow left"
              onClick={() => handleScroll(-900)}
            >
              {'<'}
            </div>
            <div
              ref={rightArrowRef}
              className="scrollArrow right"
              onClick={() => handleScroll(900)}
            >
              {'>'}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default PlannerLine;
