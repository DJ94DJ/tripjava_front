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

  const { id, password, email, nickname } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const confirmPassword = e.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user", inputs);
      console.log(response.data);
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
            <br />
            <input
              name="password"
              value={password}
              onChange={onChange}
              placeholder="패스워드"
              type="password"
            />
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
            <br />
            <input
              name="nickname"
              value={nickname}
              onChange={onChange}
              placeholder="닉네임"
            />
            <br />
            <button className="button" type="submit">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserSignupPage;
