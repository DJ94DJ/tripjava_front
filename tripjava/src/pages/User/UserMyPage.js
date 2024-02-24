import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlannerId } from "../../store/actions/plannerid";

function UserMyPage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({}); // 닉네임을 저장할 상태를 만듭니다.
  const [userPlanner, setUserPlanner] = useState([]); // planner를  저장
  const navigate = useNavigate();
  const fullState = useSelector((state) => state);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user?id=${auth.id}`)
      .then((response) => {
        setUserInfo(response.data); // 응답에서 사용자 정보를 가져와 저장합니다.
        console.log("마이페이지 요청", response.data);

        // planner 정보를 가져와서 userPlanner에 저장
        axios
          .get(`http://localhost:8080/planner/mypage?userid=${auth.id}`)
          .then((response) => {
            setUserPlanner(response.data);
            console.log("플래너 정보 요청", response.data);
          })
          .catch((error) => {
            console.error("플래너 정보를 가져오는 동안 오류 발생: ", error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth.id]);

  const handlePlannerClick = (plannerId) => {
    console.log("디스패치 전:", plannerId, fullState); // 디스패치 전 상태를 출력합니다.

    dispatch(setPlannerId(plannerId));

    console.log("디스패치 후:", plannerId, fullState); // 디스패치 후 상태를 출력합니다.

    navigate(`/planner`);
  };

  return (
    <>
      <br></br> <br></br>
      <div className="wrap">
        <div className="myPage-form">
          <h2>계정정보</h2>
          <div>ID: {userInfo.id}</div>
          <div>Password: ⦁⦁⦁⦁⦁⦁⦁⦁</div>
          <div>Email: {userInfo.email}</div>
          <div>Nickname: {userInfo.nickname}</div>
          <button
            className="button_Edit"
            type="button"
            onClick={() => {
              window.location.href = "/edit";
            }}
          >
            회원정보 수정
          </button>
          <button
            className="button_Leave"
            type="button"
            onClick={() => {
              window.location.href = "/leave";
            }}
          >
            탈퇴하기
          </button>
        </div>
        <div className="myPage-form">
          <h2>나의 여행계획</h2>
          <div className="tourlist">
            {userPlanner &&
              userPlanner.map((value) => (
                <h3
                  key={value.planner_no}
                  onClick={() => handlePlannerClick(value.planner_no)} // 여기에서 handlePlannerClick 함수를 호출하며, planner_no를 인자로 전달합니다.
                >
                  {value.planner_title}
                </h3>
              ))}
            <h3>그냥 넣어둔 리스트1</h3>
            <h3>그냥 넣어둔 리스트2</h3>
            <h3>그냥 넣어둔 리스트3</h3>
          </div>
          <div className="container_map_img"></div>
        </div>
      </div>
    </>
  );
}

export default UserMyPage;
