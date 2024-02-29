import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import '../../styles/style.scss';
import { Link, useNavigate } from 'react-router-dom';

function UserSignupPage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
    nickname: '',
  });

  const [isPasswordMatched, setIsPasswordMatched] = useState(null);

  const [validState, setValidState] = useState({
    id: null,
    password: null,
    email: null,
    nickname: null,
  });

  const {
    id: idValid,
    password: passwordValid,
    email: emailValid,
    nickname: nicknameValid,
  } = validState;

  const [idDuplicated, setIdDuplicated] = useState(null);

  const { id, password, confirmPassword, email, nickname } = inputs;

  let validationTimer;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

    if (name === 'confirmPassword') {
      setIsPasswordMatched(inputs.password === value);
    }

    if (validationTimer) clearTimeout(validationTimer);

    // 1초 후에 검증을 실행
    validationTimer = setTimeout(() => {
      switch (name) {
        case 'id':
          setValidState({
            ...validState,
            id: idValidation(value),
          });
          break;
        case 'password':
          setValidState({
            ...validState,
            password: passwordValidation(value),
          });
          break;
        case 'email':
          setValidState({
            ...validState,
            email: emailValidation(value),
          });
          break;
        case 'nickname':
          setValidState({
            ...validState,
            nickname: nicknameValidation(value),
          });
          break;
        default:
          break;
      }
    }, 0);
  };

  // 아이디 검증 (영어와 숫자만 가능)
  const idValidation = (id) => {
    const idReg = /^[A-Za-z0-9]+$/;
    return idReg.test(id);
  };

  // 패스워드 검증 (4~16자, 영어와 숫자 조합)
  const passwordValidation = (password, confirmPassword) => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d).{4,16}$/;
    return passwordReg.test(password);
  };

  // 이메일 검증
  const emailValidation = (email) => {
    const emailReg = /^\S+@\S+\.\S+$/;
    return emailReg.test(email);
  };

  // 닉네임 검증 (한글, 영문, 숫자 포함 3자 이상 10자 이하)
  const nicknameValidation = (nickname) => {
    const nicknameReg = /^[A-Za-z0-9가-힣]{3,10}$/;
    return nicknameReg.test(nickname);
  };

  const checkDuplicateId = async (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 막음
    // 아이디 중복확인 로직
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/user/check-id`,
        {
          id: id,
        }
      );
      // 중복된 아이디가 없는 경우
      if (response.data) {
        alert('중복된 아이디입니다. 다른 아이디를 입력하세요.');
        setIdDuplicated(true);
      }
      // 중복된 아이디가 있는 경우
      else {
        alert('사용 가능한 아이디입니다.');
        setIdDuplicated(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const confirmPassword = e.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    if (idDuplicated) {
      alert('아이디 중복확인이 필요합니다.');
      return;
    }

    if (!idValid) {
      alert('아이디는 영어와 숫자만 가능합니다.');
      return;
    }

    if (!passwordValid) {
      alert('비밀번호는 4~16자, 영어와 숫자 조합 필수, 특수문자 포함 가능');
      return;
    }

    if (!emailValid) {
      alert('이메일 형식에 맞지 않습니다. 예: example@example.com');
      return;
    }

    if (!nicknameValid) {
      alert('닉네임은 한글, 영문, 숫자 포함 3자 이상 10자 이하로 입력하세요.');
      return;
    }

    if (
      !nicknameValidation(nickname) ||
      !idValidation(id) ||
      !passwordValidation(password) ||
      !emailValidation(email)
    ) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/user`,
        inputs
      );
      console.log(response.data);
      navigate('/login');
      // 회원가입 성공 처리
    } catch (error) {
      console.error(error);
      // 회원가입 실패 처리
    }
  };

  const formWrapRef = useRef(null); // 참조 생성

  useEffect(() => {
    if (formWrapRef.current) {
      const scrollHeight = formWrapRef.current.scrollHeight;
      formWrapRef.current.scrollTop = scrollHeight / 4.5;
    }
  }, []);

  return (
    <>
      <div className="signup-scroll">
        <div className="form-wrap" ref={formWrapRef}>
          <form className="signup-form" onSubmit={onSubmit}>
            <div className="input-wrap">
              <input
                name="id"
                value={id}
                onChange={onChange}
                placeholder="아이디"
              />
              <div className={idValid === false ? 'guide error' : 'guide'}>
                {idValid === null
                  ? '영어와 숫자 조합의 아이디를 입력해주세요'
                  : idDuplicated === true
                  ? '중복된 아이디입니다. 다시 시도해주세요.'
                  : idValid && idDuplicated === null
                  ? '중복확인 버튼을 눌러주세요.'
                  : idValid && !idDuplicated
                  ? '형식에 일치합니다'
                  : '영어와 숫자 조합'}
              </div>
              <br />
              <button className="duplicate-button" onClick={checkDuplicateId}>
                중복확인
              </button>
              <br />
              <br />
              <br />
              <input
                name="nickname"
                value={nickname}
                onChange={onChange}
                placeholder="닉네임"
              />
              <div
                className={nicknameValid === false ? 'guide error' : 'guide'}
              >
                {nicknameValid === null ? (
                  <>
                    한글, 영문, 숫자 포함 <br />
                    3~10자 이내의 닉네임을 입력해주세요
                  </>
                ) : nicknameValid ? (
                  '형식에 일치합니다'
                ) : (
                  '한글, 영문, 숫자 포함, 3~10자'
                )}
              </div>
              <br />
              <br />
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
                value={confirmPassword} // 확인 패스워드 값 바인딩
                onChange={onChange}
                placeholder="패스워드 확인"
                type="password"
              />
              <div
                className={
                  passwordValid === false || !isPasswordMatched
                    ? 'guide error'
                    : 'guide'
                }
              >
                {passwordValid === null ? (
                  <>
                    영어, 숫자 필수, 특수문자 포함 가능 <br />
                    4~16자 이내의 패스워드를 입력해주세요
                  </>
                ) : passwordValid && isPasswordMatched ? (
                  '형식에 일치합니다'
                ) : (
                  <>
                    영어, 숫자 필수, 특수문자 포함 가능 4~16자
                    <br /> 패스워드가 일치하지 않습니다.
                  </>
                )}
              </div>
              <br />
              <br />
              <br />
              <input
                name="email"
                value={email}
                onChange={onChange}
                placeholder="이메일"
              />
              <div className={emailValid === false ? 'guide error' : 'guide'}>
                {emailValid === null
                  ? '형식에 맞는 이메일을 입력해주세요'
                  : emailValid
                  ? '형식에 일치합니다'
                  : '예: example@example.com'}
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <button className="submit-button" type="submit">
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserSignupPage;
