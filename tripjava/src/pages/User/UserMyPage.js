import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function UserMyPage() {
  const auth = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({}); // 닉네임을 저장할 상태를 만듭니다.

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user?id=${auth.id}`)
      .then((response) => {
        setUserInfo(response.data); // 응답에서 사용자 정보를 가져와 저장합니다.
        console.log("마이페이지 요청", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth.id]);

  return (
    <>
      <br></br> <br></br>
      <div className="container_1">
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
      <div className="container_2">
        <h2>나의 여행계획</h2>
        <div className="tourlist">
          <h3>그냥 넣어둔 리스트1</h3>
          <h3>그냥 넣어둔 리스트2</h3>
          <h3>그냥 넣어둔 리스트3</h3>
        </div>
        <div className="container_map_img"></div>
      </div>
    </>
  );
}

export default UserMyPage;
