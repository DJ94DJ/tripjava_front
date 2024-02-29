import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth, logout } from '../../store/actions/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token')); // 로컬 스토리지에 저장된 토큰을 상태로 설정합니다.

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem('token'); // 로컬 스토리지에 저장된 토큰을 가져옵니다.
    if (tokenInLocalStorage) {
      axios
        // .get(`http://localhost:8080/user?id=${localStorage.getItem("id")}`)
        .get(
          `${process.env.REACT_APP_HOST}/user?id=${localStorage.getItem('id')}`
        )
        .then((response) => {
          dispatch(
            setAuth(
              localStorage.getItem('token'),
              localStorage.getItem('id'),
              response.data.nickname
            )
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setToken(tokenInLocalStorage); // 로컬 스토리지에 저장된 토큰을 상태로 설정합니다.
  }, []);

  const onLogout = () => {
    dispatch(logout()); // 로그아웃 액션을 디스패치합니다.
    localStorage.removeItem('token'); // localStorage에서 토큰을 제거합니다.
    localStorage.removeItem('id'); // localStorage에서 아이디를 제거합니다.
    navigate('/'); // 메인 페이지로 이동합니다.
  };

  return (
    <>
      <header id="header" role="banner">
        <nav className="header_menu">
          <img
            className="logo"
            src="/static/logo_trip_java.svg"
            alt="logo"
            onClick={() => navigate('/')}
          />
          <ul className="menu">
            {/* <li onClick={() => navigate("/date")}>둘러보기</li> */}
            {localStorage.getItem('token') && auth.nickname ? ( // 토큰과 닉네임 모두 있는 경우
              <>
                <li onClick={() => navigate('/mypage')}>
                  {auth.nickname}님, 환영합니다! 💖
                </li>
                <li onClick={onLogout}>로그아웃</li>
              </>
            ) : (
              <li onClick={() => navigate('/login')}>로그인</li> // 로그인하지 않은 경우 또는 닉네임이 없는 경우
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
