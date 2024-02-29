import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // 추가: useDispatch 가져오기
import { setAuth } from '../../store/actions/auth'; // 추가: setAuth 액션 가져오기
import { useState } from 'react';
import '../../styles/style.scss';
import Swal from 'sweetalert2';
import 'animate.css';
import { Link, useNavigate } from 'react-router-dom';

function UserLoginPage() {
  const dispatch = useDispatch(); // 추가: dispatch 함수 가져오기
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    id: '',
    password: '',
  });

  const { id, password } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/user/login`,
        inputs
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', id);
      console.log('저장된 토큰:', localStorage.getItem('token'));
      console.log(response.data);
      dispatch(setAuth(response.data.token, id)); // id는 사용자가 입력한 아이디
      navigate('/');

      // 로그인 성공 처리
    } catch (error) {
      console.error(error);
      Swal.fire({
        // 로그인 실패 처리
        icon: 'error',
        title: '로그인에 실패했어요.',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
        text: `아이디 혹은 비밀번호를 확인해주세요.`,
        customClass: {
          popup: 'login-fail',
        },
      });
    }
  };

  return (
    <>
      <div>UserLoginPage</div>
      <div className="form-wrap">
        <div className="login-form">
          <div className="input-wrap">
            <form className="input-wrap" onSubmit={onSubmit}>
              <input
                name="id"
                value={id}
                onChange={onChange}
                placeholder="아이디"
              />
              <br />
              <hr className="line"></hr>
              <br />
              <input
                name="password"
                value={password}
                onChange={onChange}
                placeholder="패스워드"
                type="password"
              />
              <br />
              <br />

              <button type="submit">로그인</button>
              <br />
              {/* <button
                className="button_signup"
                type="button"
                onClick={() => {
                  window.location.href = '/register';
                }}
              >
                회원가입
              </button> */}
              <Link
                to="/register"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                회원가입
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLoginPage;
