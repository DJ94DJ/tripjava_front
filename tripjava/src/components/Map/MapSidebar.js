import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.scss';

// 날짜 포맷 변경 함수
function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  };
  const date = new Date(dateString);
  return date
    .toLocaleDateString('ko-KR', options)
    .replace('. ', '.')
    .replace('. ', '.');
}

function formatPeriod(startDate, endDate) {
  const startFormat = formatDate(startDate); // "2024.02.22(목)"
  const endFormat = formatDate(endDate); // "2024.02.24(토)"
  return `${startFormat} ~ ${endFormat}`;
}

const MapSidebar = ({ startDate, endDate, period }) => {
  console.log('sidebar/period 확인 : ', period);
  const navigate = useNavigate();
  navigate('/');
  const formattedPeriod = formatPeriod(startDate, endDate);

  return (
    <div className="side_menu">
      <div className="sidebar_content">
        <div className="sidebar_header">
          <img
            src="/static/logo_trip_java.svg"
            alt="logo"
            className="logo"
            onClick={() => navigate('/')}
          />
        </div>
        <div className="sidebar_date">{formattedPeriod}</div>
        <div className="sidebar_hotel"></div>
        <div className="sidebar_tourismApi"></div>
      </div>
    </div>
  );
};

export default MapSidebar;
