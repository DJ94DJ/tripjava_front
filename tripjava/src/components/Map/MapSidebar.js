import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.scss';
import { PiSealCheckFill } from 'react-icons/pi';
import { FaXmark } from 'react-icons/fa6';
import { FaHotel } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import {
  addSpot,
  removeRoute,
  addRoute,
  removeSpot,
  saveTripData,
} from '../../store/actions/triproute';
import { FaRegFaceSadTear } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

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

// 날짜를 더하는 함수
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
// 날짜 포맷 변경
function formatPeriod(startDate, endDate) {
  const startFormat = formatDate(startDate); // "2024.02.22(목)"
  const endFormat = formatDate(endDate); // "2024.02.24(토)"
  return `${startFormat} ~ ${endFormat}`;
}

const MapSidebar = ({ startDate, endDate }) => {
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
  const [selectedSpot, setSelectedSpot] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState(1); // 기본값으로 1일차 탭 선택되게!

  const calculatePeriod = (startDate, endDate) => {
    // 문자열을 Date 객체로 변환
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInTime = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)) + 1;
    return diffInDays;
  };

  // 기간에 따른 탭 생성 로직
  const period = calculatePeriod(startDate, endDate);
  const tabs = Array.from({ length: period }, (_, i) => i + 1);

  // 일차 버튼을 클릭했을 때 실행되는 함수
  const handleDayClick = (day) => {
    const selectedDayDate = addDays(startDate, day - 1); // 선택된 일차에 해당하는 날짜 계산
    setSelectedDate(formatDate(selectedDayDate)); // 날짜 형식으로 상태 업데이트
    setSelectedTab(day); // 현재 선택된 탭 업데이트
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
      console.log('숙소 근처 데이터 갖고 와지는지 확인', res.data);
      // 데이터가 있는지 확인하고 상태 업데이트
      if (res.data && res.data.restaurants && res.data.touristSpots) {
        setDestinations({
          restaurants: res.data.restaurants,
          touristSpots: res.data.touristSpots,
        });
      } else {
        // 데이터가 없는 경우 메시지 표시
        setDestinations({
          restaurants: [{ name: '데이터가 없습니다' }],
          touristSpots: [{ name: '데이터가 없습니다' }],
        });
      }
    } catch (error) {
      console.error('근처 목적지 정보 불러오기 실패:', error);
      // 에러가 발생한 경우도 메시지 표시
    }
  };

  // 리덕스 route에 담긴 인덱스 삭제!!
  const handleRemoveRoute = (id) => {
    dispatch(removeRoute(id));
  };

  const handleAddSpot = (spot) => {
    // 각 spot에 고유한 id 부여
    const spotWithId = { ...spot, id: uuidv4() };
    setSelectedSpot((prevSpots) => [...prevSpots, spotWithId]);
    // spot 정보를 리덕스 스토어에 저장
    dispatch(addSpot(selectedDate, spotWithId));
  };

  // 리덕스랑 장소 삭제 !
  const handleRemoveSpot = (selectedDate, id) => {
    console.log('Spot삭제 함수 인자들 잘 들어가지나 쳌', selectedDate, id); // 값을 확인하기 위한 로그
    dispatch(removeSpot(selectedDate, id));
    setSelectedSpot((prevSpots) => prevSpots.filter((spot) => spot.id !== id));
  };

  // 저장 버튼 @@@@@@@@@@@@@@@@@@@@@@@
  const handleSaveTripData = () => {
    const currentTripData = {
      routes: routes,
      selectedSpots: selectedSpot,
      selectedDates: selectedDate,
      tabs: tabs,
      setSelectedTab: setSelectedTab,
    };
    // Redux 스토어에 tripData 저장
    dispatch(
      saveTripData({ ...routes, [selectedDate]: { spots: selectedSpot }, tabs })
    );
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
            <h3>여행 기간</h3>
            <div>{formattedPeriod}</div>
            <hr />
          </div>

          {tabs.map((tab) => (
            <div className="sidebar_tabs">
              <div key={tab}>
                <button
                  onClick={() => handleDayClick(tab)}
                  className="sidebar_date"
                >
                  {formatDate(addDays(startDate, tab - 1))}
                </button>
                <div className="sidebar_selecteddate">
                  {/* <h4>{formatDate(addDays(startDate, tab - 1))}</h4> */}
                </div>
              </div>
              <div className="sidebar_hotel">
                <h3>숙소</h3>
                <div className="sidebar_hotel_container">
                  {routes.map((route, index) => {
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
                          {route.title.includes(
                            '[한국관광 품질인증/Korea Quality]'
                          ) && <PiSealCheckFill />}
                        </h4>
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
                {selectedSpot.map((spot, index) => (
                  <div key={index}>
                    <h4>{spot.title}</h4>
                    <button
                      onClick={() => handleRemoveSpot(selectedDate, spot.id)}
                    >
                      <FaXmark />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="sidebar_footter">
            <button onClick={handleSaveTripData}>저장</button>
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
            {destinations[selectedCategory].length === 0 ? (
              <div
                className="no-data-message"
                style={{ fontSize: 14, fontWeight: 'bold' }}
              >
                주변 추천 장소가 없습니다.
                <FaRegFaceSadTear />
              </div>
            ) : (
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
                    <button onClick={() => handleAddSpot(destination)}>
                      <FaPlus />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MapSidebar;
