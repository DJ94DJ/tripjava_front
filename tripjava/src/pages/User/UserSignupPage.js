import React from "react";
import axios from "axios";
import { useState } from "react";
import "../../styles/style.scss";

function UserSignupPage() {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
    email: "",
    nickname: "",
  });

  const [idDuplicated, setIdDuplicated] = useState(false);

  const { id, password, email, nickname } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const checkDuplicateId = async (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 막음
    // 아이디 중복확인 로직
    try {
      const response = await axios.post(`http://localhost:8080/user/check-id`, {
        id: id,
      });
      // 중복된 아이디가 없는 경우
      if (response.data) {
        alert("사용 가능한 아이디입니다.");
        setIdDuplicated(false);
      }
      // 중복된 아이디가 있는 경우
      else {
        alert("중복된 아이디입니다. 다른 아이디를 입력하세요.");
        setIdDuplicated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const confirmPassword = e.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    if (idDuplicated) {
      alert("아이디 중복확인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user", inputs);
      console.log(response.data);
      window.location = "/";
      // 회원가입 성공 처리
    } catch (error) {
      console.error(error);
      // 회원가입 실패 처리
    }
  };

  return (
    <>
      <div>UserSignupPage</div>
      <div className="form-wrap">
        <form className="signup-form" onSubmit={onSubmit}>
          <div className="input-wrap">
            <input
              name="id"
              value={id}
              onChange={onChange}
              placeholder="아이디"
            />
            <button className="duplicate-button" onClick={checkDuplicateId}>
              중복확인
            </button>
            <div className="guide">영어와 숫자 조합, 8~16자</div>
            <br />
            <input
              name="password"
              value={password}
              onChange={onChange}
              placeholder="패스워드"
              type="password"
            />
            <div className="guide">특수문자 포함, 8~16자</div>
            <br />
            <input
              name="confirmPassword"
              placeholder="패스워드 확인"
              type="password"
            />
            <br />
            <input
              name="email"
              value={email}
              onChange={onChange}
              placeholder="이메일"
            />
            <div className="guide">예: example@example.com</div>
            <br />
            <input
              name="nickname"
              value={nickname}
              onChange={onChange}
              placeholder="닉네임"
            />
            <br />
            <button className="submit-button" type="submit">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserSignupPage;
