import React from "react";
import axios from "axios";
import { useState } from "react";

function UserLoginPage() {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
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
        "http://localhost:8080/user/login",
        inputs
      );
      console.log(response.data);
      // 로그인 성공 처리
    } catch (error) {
      console.error(error);
      // 로그인 실패 처리
    }
  };

  return (
    <>
      <div>UserLoginPage</div>
      <form onSubmit={onSubmit}>
        <input name="id" value={id} onChange={onChange} placeholder="아이디" />
        <input
          name="password"
          value={password}
          onChange={onChange}
          placeholder="패스워드"
          type="password"
        />
        <button type="submit">로그인</button>
      </form>
    </>
  );
}

export default UserLoginPage;
