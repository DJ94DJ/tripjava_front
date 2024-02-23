import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.scss';
import { PiSealCheckFill } from 'react-icons/pi';

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
  // Redux 스토어에서 마커 정보 갖고오기!
  const routes = useSelector((state) => state.triproute.routes);
  console.log('스토어에서 가져온 마커 정보 로깅:', routes);
  console.log('sidebar/period 확인 : ', period);
  const navigate = useNavigate();
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
        <div className="sidebar_hotel">
          <h3>숙소</h3>
          <ul>
            {routes.map((route, index) => {
              // "[한국관광 품질인증/Korea Quality]" 문자열 제거
              const titleWithoutCertification = route.title
                .replace('[한국관광 품질인증/Korea Quality]', '')
                .trim();

              return (
                <li key={index}>
                  {titleWithoutCertification}
                  {/* 조건부 렌더링을 사용하여 특정 문자열이 있을 경우 아이콘 표시 */}
                  {route.title.includes(
                    '[한국관광 품질인증/Korea Quality]'
                  ) && (
                    <PiSealCheckFill />
                    // <img src="/static/mark.jpeg" alt="mark" className="mark" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="sidebar_route day1">
          <ul></ul>
        </div>
        <div className="sidebar_route day2"></div>
        <div className="sidebar_route day3"></div>
        <div className="sidebar_route day4"></div>
        <div className="sidebar_tourismApi"></div>
      </div>
    </div>
  );
};

export default MapSidebar;
