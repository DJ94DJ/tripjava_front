import React, { useState } from 'react';
import '../../styles/style.scss';
import { BiSolidLeftArrow } from 'react-icons/bi';
import { BiSolidRightArrow } from 'react-icons/bi';

const MapSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true); // 사이드바의 펼침/접힘 상태

  // 사이드바 펼치기/접기
  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`side_menu ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar_content">
        사이드바
        <div className="toggle_button" onClick={toggleMenu}>
          {isExpanded ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
        </div>
      </div>
    </div>
  );
};

export default MapSidebar;
