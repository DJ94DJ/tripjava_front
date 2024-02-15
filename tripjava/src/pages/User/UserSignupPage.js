import React from "react";
import { useState } from "react";

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

  const onSubmit = (e) => {
    e.preventDefault();
    const confirmPassword = e.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }
    console.log(inputs);
    // 회원가입 로직 추가
  };

  return (
    <>
      <div>UserSignupPage</div>
      <form onSubmit={onSubmit}>
        <input name="id" value={id} onChange={onChange} placeholder="아이디" />
        <input
          name="password"
          value={password}
          onChange={onChange}
          placeholder="패스워드"
          type="password"
        />
        <input
          name="confirmPassword"
          placeholder="패스워드 확인"
          type="password"
        />
        <input
          name="email"
          value={email}
          onChange={onChange}
          placeholder="이메일"
        />
        <input
          name="nickname"
          value={nickname}
          onChange={onChange}
          placeholder="닉네임"
        />
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}

export default UserSignupPage;
