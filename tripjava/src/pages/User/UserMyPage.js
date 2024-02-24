import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function UserMyPage() {
  const auth = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({}); // 닉네임을 저장할 상태를 만듭니다.
  const [userPlanner, setUserPlanner] = useState([]); // planner를  저장

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
                  onClick={() => {
                    window.location.href = "/planner";
                  }}
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
