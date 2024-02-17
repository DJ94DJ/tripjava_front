import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Main from "./pages/Main/Main";
import UserEditPage from "./pages/User/UserEditPage";
import UserLeavePage from "./pages/User/UserLeavePage";
import UserLoginPage from "./pages/User/UserLoginPage";
import UserSignupPage from "./pages/User/UserSignupPage";
import UserMyPage from "./pages/User/UserMyPage";
import MapDatePage from "./pages/Map/MapDatePage";
import MapMainPage from "./pages/Map/MapMainPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Main>
          <Routes>
            {/* 로그인/마이페이지 관련 */}
            <Route path="/find" element={<UserEditPage />}></Route>
            <Route path="/leave" element={<UserLeavePage />}></Route>
            <Route path="/login" element={<UserLoginPage />}></Route>
            <Route path="/mypage" element={<UserMyPage />}></Route>
            <Route path="/signup" element={<UserSignupPage />}></Route>

            {/* 지도 게시판 */}
            <Route path="/planner" element={<MapMainPage />}></Route>
            <Route path="/date" element={<MapDatePage />}></Route>
          </Routes>
        </Main>
      </Router>
    </>
  );
}

export default App;
