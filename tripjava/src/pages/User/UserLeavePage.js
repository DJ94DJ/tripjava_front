import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/actions/auth";

function UserLeavePage() {
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState(""); // 원본 이메일을 저장할 상태를 만듭니다.
  const [isMatching, setIsMatching] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 컴포넌트가 렌더링될 때 사용자 정보를 조회합니다.
  useEffect(() => {
    axios
      .get(`http://localhost:8080/user?id=${auth.id}`)
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
      alert("이메일이 일치하지 않습니다.");
      return;
    }

    axios
      .delete(`http://localhost:8080/user`, { data: { id: auth.id, email } })
      .then((response) => {
        console.log(response);
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="userLeavePage">
      <h2 className="title">계정 삭제하기</h2>
      <p className="description">
        계정을 삭제하시려면 하단에 기입된 귀하의 이메일을 직접 입력하세요.
      </p>
      <p>{userEmail}</p>
      <form className="userLeaveForm" onSubmit={handleSubmit}>
        <label className="emailInput">
          <input type="email" value={email} onChange={handleChange} />
        </label>

        <button className="deleteButton" type="submit" disabled={!isMatching}>
          계정 삭제
        </button>
      </form>
    </div>
  );
}

export default UserLeavePage;
