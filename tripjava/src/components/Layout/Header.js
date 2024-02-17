import { Link, useLocation } from "react-router-dom";
import "../../styles/style.scss";
import axios from "axios";

export default function Header() {
  return (
    <>
      <header id="header" role="banner">
        <nav className="header_menu">
          <img src="/static/logo_trip_java.svg" alt="logo" className="logo" />
          <ul className="menu">
            <li>둘러보기</li>
            <li>로그인</li>
          </ul>
        </nav>
      </header>
    </>
  );
}
