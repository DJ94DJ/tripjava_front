import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/style.scss";

const PlannerLine = ({ planner_no }) => {
  // plannerId가 없어서 오류납니당
  const [plannerData, setPlannerData] = useState(null);

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

  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/planner/trip-route/${plannerId}`
  //       );
  //       setData(response.data);
  //     } catch (error) {
  //       setError("데이터를 불러오는데 실패하였습니다.");
  //     }
  //   };
  //   fetchData();
  // }, []);

  // 이건 테스트용 데이터 코드입니당
  // const [data, setData] = useState({
  //   plans: [
  //     { contentid: "12345", type: 1 },
  //     { contentid: "67890", type: 0 },
  //     { contentid: "23542", type: 2 },
  //     { contentid: "42654", type: 3 },
  //     { contentid: "75164", type: 3 },
  //   ],
  // });

  return (
    <div className="PlannerLine">
      {plannerData &&
        plannerData.plans.map((item, index) => (
          <div key={index} className="item">
            <div className="dot" />
            {/* contentid로 장소 이름 뽑기... 어떻게.. 하나요.......ㅠ..... */}
            <h2>{item.tourist.title}</h2>{" "}
            <div>{item.type === 0 ? "숙소" : `${item.type}박`}</div>
          </div>
        ))}
    </div>
  );
};

export default PlannerLine;
