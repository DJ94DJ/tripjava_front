import './App.css';
import Header from './components/Layout/Header';
import Main from './pages/Main/Main';
import UserLoginPage from './pages/User/UserLoginPage';
import UserSignupPage from './pages/User/UserSignupPage';
import UserMyPage from './pages/User/UserMyPage';
import UserFindPage from './pages/User/UserFindPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          {/* 로그인/마이페이지 관련 */}
          <Route path="/login" element={<UserLoginPage />}></Route>
          <Route path="/signup" element={<UserSignupPage />}></Route>
          <Route path="/mypage" element={<UserMyPage />}></Route>
          <Route path="/find" element={<UserFindPage />}></Route>
          {/* 지도 게시판 */}
        </Routes>
      </Main>
    </>
  );
}

export default App;
