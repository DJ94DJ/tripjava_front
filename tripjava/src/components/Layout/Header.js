import { Link, useLocation } from 'react-router-dom';
import '../../styles/style.scss';
import axios from 'axios';

export default function Header() {
  return (
    <>
      <header id="header" role="banner">
        <nav className="header_menu">
          <ul className="menu">
            <li>test</li>
            <li>test2</li>
            <li>test3</li>
          </ul>
        </nav>
      </header>
    </>
  );
}
