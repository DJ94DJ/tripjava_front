import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/style.scss";

const MapAuth = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!auth.token) {
      console.log("비회원 상태입니다."); // 콘솔에 메시지 출력
      setShowAlert(true);
    }
  }, [auth]);

  const closeAlert = () => {
    setShowAlert(false);
  };

  return showAlert ? (
    <Draggable>
      <div className="alert">
        <button className="close_alert" onClick={closeAlert}>
          ✖
        </button>
        <br />
        현재 비회원으로 작업하고 있습니다. <br />
        일정을 저장하려면 로그인을 해주세요.
        <br />
        <br />
        <button className="login_alert" onClick={() => navigate("/login")}>
          로그인
        </button>
        <br />
      </div>
    </Draggable>
  ) : null;
};

export default MapAuth;
