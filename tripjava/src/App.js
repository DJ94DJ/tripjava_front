import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Header from './components/Layout/Header';
import Main from './pages/Main/Main';
import UserEditPage from './pages/User/UserEditPage';
import UserLeavePage from './pages/User/UserLeavePage';
import UserLoginPage from './pages/User/UserLoginPage';
import UserSignupPage from './pages/User/UserSignupPage';
import UserMyPage from './pages/User/UserMyPage';
import MapDatePage from './pages/Map/MapDatePage';
import MapMainPage from './pages/Map/MapMainPage';
import MainButton from './components/Main/MainButton';
import PlannerPage from './pages/Planner/PlannerPage';
import MapPinTest from './pages/Map/MapPinTest';
import PlannerModal from './components/Planner/PlannerModal';

// Header 조건부로 렌더링! (planner 페이지에선 헤더 제외)
const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/map' && <Header />}
      <Main>
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<MainButton />} />
          {/* 로그인/마이페이지 */}
          <Route path="/date" element={<MapDatePage />} />
          <Route path="/edit" element={<UserEditPage />} />
          <Route path="/leave" element={<UserLeavePage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/mypage" element={<UserMyPage />} />
          <Route path="/register" element={<UserSignupPage />} />
          {/* 지도 페이지 */}
          <Route path="/map" element={<MapMainPage />} />
          <Route path="/date" element={<MapDatePage />} />
          <Route path="/test" element={<MapPinTest />} />
          {/* 일정 페이지 */}
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/plannerModal" element={<PlannerModal />} />
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
