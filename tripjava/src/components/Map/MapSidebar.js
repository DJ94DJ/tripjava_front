import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.scss';
import { PiSealCheckFill } from 'react-icons/pi';
import {
  removeRoute,
  addSelectedDestination,
} from '../../store/actions/triproute';
import { FaXmark } from 'react-icons/fa6';
import { FaHotel } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

import axios from 'axios';
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
  // console.log('스토어에서 가져온 마커 정보 로깅:', routes);
  // console.log('sidebar/period 확인 : ', period);
  const navigate = useNavigate();
  const formattedPeriod = formatPeriod(startDate, endDate);
  const dispatch = useDispatch();
  const [destinations, setDestinations] = useState({
    restaurants: [],
    touristSpots: [],
  });
  const [selectedCategory, setSelectedCategory] = useState('touristSpots');

  // 리덕스 route에 담긴 인덱스 삭제!!
  const handleRemoveRoute = (id) => {
    dispatch(removeRoute(id));
  };

  // 근처 목적지 정보를 불러오는 함수
  const fetchNearbyDestinations = async (id) => {
    const route = routes.find((route) => route.id === id);
    if (!route) return;
    try {
      const res = await axios.get(`http://localhost:8080/destination/nearby`, {
        params: {
          mapx: route.lng, // 경도
          mapy: route.lat, // 위도
        },
      });
      // 데이터 구조에 맞게 상태 업데이트
      setDestinations({
        restaurants: res.data.restaurants,
        touristSpots: res.data.touristSpots,
      });
    } catch (error) {
      console.error('근처 목적지 정보 불러오기 실패:', error);
      setDestinations({ restaurants: [], touristSpots: [] });
    }
  };

  return (
    <>
      <div className="side_menu">
        <div className="sidebar_header">
          <img
            src="/static/logo_trip_java.svg"
            alt="logo"
            className="logo"
            onClick={() => navigate('/')}
          />
        </div>
        <div className="sidebar_content">
          <div className="sidebar_date">
            <h3>기간</h3>
            {formattedPeriod}
          </div>
          <div className="sidebar_hotel">
            <h3>숙소</h3>
            <div className="sidebar_hotel_container">
              {routes.map((route, index) => {
                // "[한국관광 품질인증/Korea Quality]" 문자열 제거
                const titleWithoutCertification = route.title
                  .replace('[한국관광 품질인증/Korea Quality]', '')
                  .trim();

                return (
                  <div
                    key={index}
                    onClick={() => fetchNearbyDestinations(route.id)}
                  >
                    <h4>
                      {titleWithoutCertification}
                      {/*  한국관광 품질인증/Korea Quality]이 있을 경우 아이콘 표시 */}
                      {route.title.includes(
                        '[한국관광 품질인증/Korea Quality]'
                      ) && <PiSealCheckFill />}
                    </h4>
                    {/* 삭제 버튼에 title을 인자로 넘기기!! */}
                    <button onClick={() => handleRemoveRoute(route.id)}>
                      <FaXmark />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="sidebar_route">
            <h3>일정</h3>
            <div className="sidebar_spot"></div>
          </div>
        </div>
      </div>
      <div className="nearby_menu">
        <div className="nearby_content">
          <div className="nearby_header">
            <h3>추천 장소</h3>
          </div>
          <div className="nearby_category">
            <button onClick={() => setSelectedCategory('touristSpots')}>
              관광지
            </button>
            <button onClick={() => setSelectedCategory('restaurants')}>
              음식점
            </button>
          </div>
          <div className="nearby_container">
            <div className="nearby_list">
              {destinations[selectedCategory].map((destination) => (
                <div key={destination.contentid} className="nearby_item">
                  <div className="nearby_imgcontainer">
                    <img
                      src={destination.firstimage || '/static/noimage.gif'}
                      alt={destination.title}
                    />
                  </div>
                  <h4>{destination.title}</h4>
                  <button>
                    <FaPlus />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapSidebar;
