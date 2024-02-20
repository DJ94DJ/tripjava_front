import React, { useState, useEffect } from 'react';
import '../../styles/style.scss';

const MapSidebar = () => {
  // api 불러오던거 작업중이었는데 일단 주석처리해둠!
  // const [touristSpots, setTouristSpots] = useState([]); // 관광지 데이터를 저장할 상태

  // useEffect(() => {
  //   // 데이터 로드 함수 정의
  //   const fetchTouristSpots = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api');
  //       if (!response.ok) {
  //         throw new Error('데이터를 불러오는 데 실패했습니다.');
  //       }
  //       const data = await response.json();
  //       setTouristSpots(data); // 가져온 데이터를 상태에 저장
  //     } catch (error) {
  //       console.error('Error fetching data: ', error);
  //     }
  //   };

  //   // 컴포넌트가 마운트될 때 데이터 로드
  //   fetchTouristSpots();
  // }, []); // 빈 의존성 배열을 전달하여 컴포넌트가 마운트될 때만 함수가 호출되도록 함

  return (
    <div className="side_menu">
      <div className="sidebar_content">
        <div className="sidebar_header">
          <img src="/static/logo_trip_java.svg" alt="logo" className="logo" />
        </div>
        <div className="sidebar_date">세은님이 보낸 날짜 받깅</div>
        <div className="sidebar_tourismApi"></div>
      </div>
    </div>
  );
};

export default MapSidebar;
