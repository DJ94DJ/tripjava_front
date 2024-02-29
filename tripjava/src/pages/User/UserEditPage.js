import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../store/actions/auth';
import axios from 'axios';

function UserEditPage() {
  const auth = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({});
  const [password, setPassword] = useState(''); // 패스워드를 저장할 상태를 만듭니다.
  const [confirmPassword, setConfirmPassword] = useState(''); // 패스워드 확인을 저장할 상태를 만듭니다.
  const [isMatching, setIsMatching] = useState(true); // 패스워드 일치 여부를 저장할 상태를 만듭니다.
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/user?id=${auth.id}`)
      .then((response) => {
        setUserInfo(response.data);
        console.log('수정페이지 요청', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth.id]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsMatching(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsMatching(password === e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isMatching) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    // 패스워드가 비어 있지 않은 경우에만 userInfo에 포함합니다.
    const updatedUserInfo = password
      ? { ...userInfo, password }
      : { ...userInfo };

    const url = password
      ? `${process.env.REACT_APP_HOST}/user`
      : `${process.env.REACT_APP_HOST}/user/nickname-email`;

    axios
      .patch(url, updatedUserInfo)
      .then((response) => {
        console.log(response);
        const { id, nickname, token } = response.data; // 'response.data'로 접근합니다.
        dispatch(setAuth(token, id, nickname)); // 새로운 토큰과 사용자 정보를 리덕스에 저장합니다.
        console.log('수정된 정보:', { id, nickname, token }); // 수정된 정보를 콘솔에 출력합니다.
        navigate('/mypage'); // 마이페이지로 이동합니다.
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <br />
      <br />
      <div className="backdrop">
        <div className="container_edit">
          <h2>계정정보 수정하기</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </label>
            {!isMatching && <p>패스워드가 일치하지 않습니다.</p>}
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Nickname:
              <input
                type="text"
                name="nickname"
                value={userInfo.nickname}
                onChange={handleChange}
              />
            </label>
            <button type="submit">저장</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserEditPage;
