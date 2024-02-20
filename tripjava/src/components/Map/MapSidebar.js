import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.scss';

const MapSidebar = () => {
  const navigate = useNavigate();
  navigate('/');
  const [touristSpots, setTouristSpots] = useState([]);
  const selectedRegionName = useSelector(
    (state) => state.maininfo?.selectedRegionName
  );
  // Redux 상태에서 지역명 가져오기

  useEffect(() => {
    // 데이터 로드 함수 정의
    const fetchTouristSpots = async () => {
      if (selectedRegionName) {
        // selectedRegionName이 있을 때만 API 호출
        try {
          const response = await fetch(
            `http://localhost:8080/destination?addr1=${selectedRegionName}`
          );
          if (!response.ok) {
            throw new Error('데이터를 불러오는 데 실패했습니다.');
          }
          const data = await response.json();
          setTouristSpots(data); // 가져온 데이터를 상태에 저장
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      }
    };

    fetchTouristSpots();
  }, [selectedRegionName]); // selectedRegionName이 변경될 때마다 함수를 다시 호출

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
        <div className="sidebar_date">세은님이 보낸 날짜 받깅</div>
        <div className="sidebar_tourismApi">
          {touristSpots.map((spot) => (
            <div key={spot.contentid} className="tourist-spot">
              <h3>{spot.title}</h3>
              <p>{spot.addr1}</p>
              <p>
                위도: {spot.mapx}, 경도: {spot.mapy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapSidebar;
