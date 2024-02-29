import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/actions/auth';

function UserLeavePage() {
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState(''); // 원본 이메일을 저장할 상태를 만듭니다.
  const [isMatching, setIsMatching] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 컴포넌트가 렌더링될 때 사용자 정보를 조회합니다.
  useEffect(() => {
    if (auth.id === null) {
      return;
    }
    axios
      .get(`${process.env.REACT_APP_HOST}/user?id=${auth.id}`)
      .then((response) => {
        setUserEmail(response.data.email); // 원본 이메일을 저장합니다.
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth.id]);

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsMatching(inputEmail === userEmail); // 입력한 이메일이 원본 이메일과 일치하는지 확인합니다.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isMatching) {
      alert('이메일이 일치하지 않습니다.');
      return;
    }

    const dataToSend = { id: auth.id, email: userEmail }; // 보낼 데이터를 상수로 선언
    console.log('Data to Send:', dataToSend); // 콘솔에 데이터 출력

    axios
      .delete(`${process.env.REACT_APP_HOST}/user`, {
        data: dataToSend,
      })
      .then((response) => {
        console.log('Response Status:', response.status); // 응답 상태 코드 출력
        console.log('Response Data:', response.data); // 응답 데이터 출력
        dispatch(logout());
        navigate('/');
      })
      .catch((error) => {
        console.error('Error Message:', error.message); // 에러 메시지 출력
      });
  };

  return (
    <div className="backdrop">
      <div className="userLeavePage">
        <div>
          <h2 className="title">계정 삭제하기</h2>
          <p className="description">
            계정삭제 확인을 위해 <br />
            하단에 기입된 귀하의 이메일을 직접 입력하세요.
          </p>
          <p>{userEmail}</p>
          <form className="userLeaveForm" onSubmit={handleSubmit}>
            <label className="emailInput">
              <input type="email" value={email} onChange={handleChange} />
            </label>

            <button
              className="deleteButton"
              type="submit"
              disabled={!isMatching}
            >
              계정 삭제
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLeavePage;
