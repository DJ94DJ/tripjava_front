import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlannerId } from '../../store/actions/plannerid';

function UserMyPage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({}); // 닉네임을 저장할 상태를 만듭니다.
  const [userPlanner, setUserPlanner] = useState([]); // planner를  저장
  const navigate = useNavigate();
  const fullState = useSelector((state) => state);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/user?id=${auth.id}`)
      .then((response) => {
        setUserInfo(response.data); // 응답에서 사용자 정보를 가져와 저장합니다.
        console.log('마이페이지 요청', response.data);

        // planner 정보를 가져와서 userPlanner에 저장
        axios
          // .get(`http://localhost:8080/planner/mypage?userid=${auth.id}`)
          .get(`${process.env.REACT_APP_HOST}/planner/mypage?userid=${auth.id}`)
          .then((response) => {
            setUserPlanner(response.data);
            console.log('플래너 정보 요청', response.data);
          })
          .catch((error) => {
            console.error('플래너 정보를 가져오는 동안 오류 발생: ', error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth.id]);

  const handlePlannerClick = (plannerId) => {
    console.log('디스패치 전:', plannerId, fullState); // 디스패치 전 상태를 출력합니다.

    dispatch(setPlannerId(plannerId));

    console.log('디스패치 후:', plannerId, fullState); // 디스패치 후 상태를 출력합니다.

    navigate(`/planner`);
  };

  const deletePlanner = (plannerId) => {
    axios
      .delete(`${process.env.REACT_APP_HOST}/planner?planner_no=${plannerId}`)
      .then((response) => {
        console.log(response);
        // 성공적으로 삭제했다면 상태에서 해당 계획을 제거합니다.
        setUserPlanner(
          userPlanner.filter((planner) => planner.planner_no !== plannerId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <br></br> <br></br>
      <div className="wrap">
        <div className="myPage-form mypage">
          <div className="box">
            <h2>계정정보</h2>
            <div>ID: {userInfo.id}</div>
            <div>Password: ⦁⦁⦁⦁⦁⦁⦁⦁</div>
            <div>Email: {userInfo.email}</div>
            <div>Nickname: {userInfo.nickname}</div>
            <button
              className="button_Edit"
              type="button"
              onClick={() => {
                navigate('/edit');
              }}
            >
              회원정보 수정
            </button>
            <button
              className="button_Leave"
              type="button"
              onClick={() => {
                navigate('/leave');
              }}
            >
              탈퇴하기
            </button>
          </div>
        </div>
        <div className="myPage-form tours">
          <h2>나의 여행계획</h2>
          <div className="tourlist">
            {userPlanner &&
              userPlanner.map((value) => (
                <div key={value.planner_no} className="delete-part">
                  <h3
                    key={value.planner_no}
                    onClick={() => handlePlannerClick(value.planner_no)}
                  >
                    {value.planner_title}
                  </h3>
                  <button
                    onClick={() => deletePlanner(value.planner_no)}
                    className="delete-btn"
                  >
                    삭제
                  </button>
                </div>
              ))}
            <div className="container_map_img"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserMyPage;
