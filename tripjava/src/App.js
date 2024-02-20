import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Layout/Header";
import Main from "./pages/Main/Main";
import UserEditPage from "./pages/User/UserEditPage";
import UserLeavePage from "./pages/User/UserLeavePage";
import UserLoginPage from "./pages/User/UserLoginPage";
import UserSignupPage from "./pages/User/UserSignupPage";
import UserMyPage from "./pages/User/UserMyPage";
import MapDatePage from "./pages/Map/MapDatePage";
import MapMainPage from "./pages/Map/MapMainPage";
import MainButton from "./components/Main/MainButton";

// Header 조건부로 렌더링! (planner 페이지에선 헤더 제외)
const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/planner" && <Header />}
      <Main>
        <Routes>
          {/* 로그인/마이페이지 관련 */}
          <Route path="/" element={<MainButton />} />
          <Route path="/date" element={<MapDatePage />} />
          <Route path="/find" element={<UserEditPage />} />
          <Route path="/leave" element={<UserLeavePage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/mypage" element={<UserMyPage />} />
          <Route path="/signup" element={<UserSignupPage />} />
          {/* 지도 게시판 */}
          <Route path="/planner" element={<MapMainPage />} />
          <Route path="/date" element={<MapDatePage />} />
        </Routes>
      </Main>
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <Layout />
      </Router>
    </>
  );
}

export default App;
