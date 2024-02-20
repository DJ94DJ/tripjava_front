import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../store/actions/auth";
import { logout } from "../../store/actions/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/style.scss";
import axios from "axios";

export default function Header() {
  const auth = useSelector((state) => state.auth); // 로그인 상태 가져오기
  const dispatch = useDispatch(); // dispatch를 가져옵니다.
  console.log("해더에 저장된 토큰", auth.token); // 로그인한 사용자의 토큰을 콘솔에 출력
  const navigate = useNavigate(); // navigate 함수를 가져옵니다.
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get(`http://localhost:8080/user?id=${localStorage.getItem("id")}`)
        .then((response) => {
          // console.log(response.data);
          dispatch(
            setAuth(
              localStorage.getItem("token"),
              localStorage.getItem("id"),
              response.data.nickname
            )
          ); // 닉네임도 저장
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const onLogout = () => {
    dispatch(logout()); // 로그아웃 액션을 디스패치합니다.
    localStorage.removeItem("token"); // localStorage에서 토큰을 제거합니다.
    localStorage.removeItem("id"); // localStorage에서 아이디를 제거합니다.
    navigate("/"); // 메인 페이지로 이동합니다.
  };

  return (
    <>
      <header id="header" role="banner">
        <nav className="header_menu">
          <img
            className="logo"
            src="/static/logo_trip_java.svg"
            alt="logo"
            onClick={() => navigate("/")}
          />
          <ul className="menu">
            <li onClick={() => navigate("/browse")}>둘러보기</li>
            {localStorage.getItem("token") ? (
              <>
                <li onClick={() => navigate("/profile")}>
                  {auth.nickname}님, 환영합니다! 💖
                </li>
                <li onClick={onLogout}>로그아웃</li>
              </>
            ) : (
              <li onClick={() => navigate("/login")}>로그인</li> // 로그인하지 않은 경우
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
