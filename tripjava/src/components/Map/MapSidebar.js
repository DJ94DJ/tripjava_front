import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.scss';
import { PiSealCheckFill } from 'react-icons/pi';
import { FaXmark } from 'react-icons/fa6';
import { FaHotel } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import { FaRegFaceSadTear } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';
import { GoTriangleRight } from 'react-icons/go';
import { GoTriangleLeft } from 'react-icons/go';
import { setAuth } from '../../store/actions/auth';

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

// 백엔드 보내는용 날짜 변경 함수(YYYY-MM-DD)
function formatToISODate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // 월과 일이 10보다 작을 때 앞에 '0'을 추가하여 2자리로 만듭니다.
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

const MapSidebar = ({ startDate, endDate, routes, setTripData, tripData }) => {
  const userId = useSelector((state) => state.auth.id);
  // console.log('마커 정보 로깅:', routes);
  const navigate = useNavigate();
  const formattedPeriod = formatPeriod(startDate, endDate);
  const [destinations, setDestinations] = useState({
    restaurants: [],
    touristSpots: [],
  });
  const [selectedCategory, setSelectedCategory] = useState('touristSpots');
  const [selectedSpot, setSelectedSpot] = useState([]);
  const [selectedDay, setSelectedDay] = useState(1); // 기본값: 첫날 날짜
  const [nearbyMenuOpen, setNearbyMenuOpen] = useState(true); // 메뉴열림 닫힘, 기본값 : 열림
  // const [tripData, setTripData] = useState({
  //   // 1: {
  //   //   selectedDate: null,
  //   //   selectedRoute: null,
  //   //   selectedSpot: [],
  //   //   selectedDay: 1,
  //   // },
  // });
  const [title, setTitle] = useState('여행 일정(1)');

  // 여행 일정 입력 함수
  function handleTitle(e) {
    setTitle(e.target.value);
  }

  // 날짜 눌렀을 때 누른 곳에 해당하는 TripData에 routes, spot들어가도록 설정
  useEffect(() => {
    // console.log('selectedDay ', selectedDay);
    setTripData((prevTripData) => ({
      ...prevTripData,
      [selectedDay]: {
        ...prevTripData[selectedDay],
        selectedRoute: routes,
        selectedSpot: selectedSpot,
      },
    }));
  }, [routes]);

  // tripData 확인용!!!!!
  useEffect(() => {
    console.log('tripData changed:', tripData);
  }, [tripData]);

  // @nayounghye : 사이드바 접기 관련
  const toggleNearbyMenu = () => {
    setNearbyMenuOpen(!nearbyMenuOpen);
  };

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

  const handleDayClick = (day) => {
    const selectedDayDate = addDays(startDate, day - 1); // 선택된 일차에 해당하는 날짜 계산
    const formattedDate = formatDate(selectedDayDate); // 날짜 형식으로 상태 업데이트
    setSelectedDay(day);

    setTripData((prevTripData) => ({
      ...prevTripData,
      [day]: {
        selectedDate: formattedDate,
        selectedDay: day,
        selectedRoute: [],
        selectedSpot: [],
      },
    }));
  };

  // 근처 목적지 정보를 불러오는 함수
  const fetchNearbyDestinations = async (id) => {
    const route = routes.find((route) => routes.id === id);
    if (!route) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_HOST}/destination/nearby`,
        {
          params: {
            mapx: route.lng, // 경도
            mapy: route.lat, // 위도
          },
        }
      );
      // console.log('숙소 근처 데이터 갖고 와지는지 확인', res.data);

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
    }
  };

  const handleAddSpot = (spot) => {
    console.log('spot', spot);
    // 각 spot에 고유한 id 부여
    const spotWithId = { ...spot, id: uuidv4() };
    const currentSelectedDay = selectedDay;

    setTripData((prevTripData) => {
      // 현재 선택된 날짜의 selectedSpot 배열 찾기
      const existingSpots = prevTripData[currentSelectedDay].selectedSpot ?? [];
      // 새 spot 추가
      const updatedSpots = [...existingSpots, spotWithId];

      // 전체 tripData 상태 업데이트
      return {
        ...prevTripData,
        [currentSelectedDay]: {
          ...prevTripData[currentSelectedDay],
          selectedSpot: updatedSpots,
        },
      };
    });
  };

  // 일정 저장 버튼@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const handleSaveTripData = async () => {
    const sendTripData = {
      start_day: formatToISODate(startDate),
      end_day: formatToISODate(endDate),
      planner_title: title,
      days: 1,
      userid: userId,

      plans: Object.values(tripData).flatMap((day) => [
        ...(Array.isArray(day.selectedRoute)
          ? day.selectedRoute.map((route) => ({
              contentid: route.contentid,
              type: day.selectedDay,
            }))
          : []),
        ...(Array.isArray(day.selectedSpot)
          ? day.selectedSpot.map((spot) => ({
              contentid: spot.contentid,
              type: day.selectedDay,
            }))
          : []),
      ]),
    };
    console.log('sendTripData:', sendTripData);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/planner/trip-route`,
        sendTripData
      );
      console.log('Server res:', res.data);
    } catch (error) {
      console.error('포스트 에러:', error);
    }

    navigate(`/mypage`);
  };

  // 여행 기간별 날짜 구현 함수

  const renderDateTabs = useMemo(() => {
    const period = calculatePeriod(startDate, endDate);
    let elements = []; // 탭과 버튼을 포함할 배열

    for (let i = 0; i < period; i++) {
      const date = formatDate(addDays(startDate, i));
      // const detail = detailInfo[String(i + 1)];
      // console.log('tripData[String(i + 1)]', tripData[i + 1]);
      const routeDetail = tripData[String(i + 1)]
        ? tripData[String(i + 1)].selectedRoute
        : [];
      // console.log('aaaaaa ', RouteDetail.length != 0 && RouteDetail.title);
      const spotDetail = tripData[String(i + 1)]
        ? tripData[String(i + 1)].selectedSpot
        : [];

      // 각 탭 생성
      const tabElement = (
        <div key={`tab-${i}`} className="sidebar_tabs">
          <button
            onClick={() => handleDayClick(i + 1)}
            className="sidebar_date"
          >
            {date}
          </button>
          {/* <div className="sidebar_hotel">
            <h3 id={date}>숙소</h3>
          </div>{' '}
          <div className="sidebar_hotel">
            {routeDetail.map((route, id, routes) => (
              <div className="sidebar_hotel_container" key={id}>
                <div onClick={() => fetchNearbyDestinations(routes.id)}>
                  <h4> {routeDetail.length != 0 && routeDetail[0].title}</h4>
                  <button
                    // 클릭이벤트 버블링방지
                    onClick={(e) => {
                      e.stopPropagation();
                      // onClick={() => {
                      handleRemoveRoute(date, route.id);
                    }}
                  >
                    <FaXmark />
                  </button>
                </div>
              </div>
            ))}
          </div> */}
          <div className="sidebar_hotel">
            <h3 id={date}>숙소</h3>
            {routeDetail.map((route, id, routes) => (
              <div className="sidebar_hotel_container" key={id}>
                <div onClick={() => fetchNearbyDestinations(routes.id)}>
                  <h4>
                    {/* 문자열 "한국관광 품질인증/Korea Quality"가 있으면 제거하고 결과를 표시 */}
                    {route.title
                      .replace('한국관광 품질인증/Korea Quality', '')
                      .replace('[]', '')
                      .trim()}
                    {route.title.includes(
                      '한국관광 품질인증/Korea Quality'
                    ) && <PiSealCheckFill />}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 클릭 이벤트 버블링 방지
                      handleRemoveRoute(date, route.id); // 삭제 핸들러 호출
                    }}
                  >
                    <FaXmark />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="sidebar_route">
            <h3>장소</h3>
            {/* 일정 원본 */}
            {/* <h4>{SpotDetail.length != 0 && SpotDetail[0].title}</h4> */}
            {spotDetail.map((spot, id) => (
              // <div className="sidebar_route_container">
              <div key={id} id={id} className="sidebar_route_container">
                <h4>{spot.title}</h4>
                <button onClick={() => handleRemoveSpot(date, spot.id)}>
                  <FaXmark />
                </button>
              </div>
              // </div>
            ))}
          </div>
        </div>
      );
      elements.push(tabElement);
    }

    return elements;
  }, [tripData]);

  const handleRemoveSpot = (id, spotId) => {
    // tripData의 복사본을 생성하기..!
    const updatedTripDataSpot = { ...tripData };

    // tripData의 모든 날짜(키)를 순회하게..
    Object.keys(updatedTripDataSpot).forEach((id) => {
      // 각 날짜의 selectedSpot 배열에서 spotId와 일치하지 않는 요소만 필터링!
      const filteredSpots = updatedTripDataSpot[id].selectedSpot.filter(
        (spot) => spot.id !== spotId
      );

      // 업데이트된 selectedSpot 배열로 해당 날짜의 객체를 업데이트!!!
      updatedTripDataSpot[id].selectedSpot = filteredSpots;
    });

    // 전체 tripData 상태를 업데이트합니다.
    setTripData(updatedTripDataSpot);
  };

  const handleRemoveRoute = (id, routeId) => {
    // tripData의 복사본을 생성하기..!
    const updatedTripDataRoute = { ...tripData };

    // tripData의 모든 날짜(키)를 순회하게..
    Object.keys(updatedTripDataRoute).forEach((id) => {
      // 각 날짜의 selectedRoute 배열에서 routeId와 일치하지 않는 요소만 필터링!
      const filteredRoutes = updatedTripDataRoute[id].selectedRoute.filter(
        (routes) => routes.id !== routeId
      );

      // 업데이트된 selectedRoute 배열로 해당 날짜의 객체를 업데이트!!!
      updatedTripDataRoute[id].selectedRoute = filteredRoutes;
    });

    // 전체 tripData 상태를 업데이트합니다.
    setTripData(updatedTripDataRoute);
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
          <div className="sidebar_name">
            <input
              type="text"
              placeholder="여행 일정(1)"
              onChange={handleTitle}
            ></input>
          </div>
          <div className="sidebar_date">
            <h3>여행 기간</h3>
            <div>{formattedPeriod}</div>
          </div>
          <div className="sidebar_tabs">
            <div className="sidebar_selecteddate">{renderDateTabs}</div>
          </div>

          <div className="sidebar_footter">
            <button onClick={handleSaveTripData}>일정 저장</button>
          </div>
        </div>
      </div>

      {/* @nayounghye : 사이드바 접기 관련 */}
      {/* 메뉴 토글 버튼 */}
      <button
        className="nearby_toggle"
        onClick={toggleNearbyMenu}
        style={{
          left: nearbyMenuOpen ? '594px' : '294px',
          top: '50%',
          transform: 'translateY(-50%)', // 버튼을 세로 중앙에 위치
          position: 'absolute',
          zIndex: '100',
          backgroundColor: 'var(--main-white)',
          border: 'none',
          height: '35px',
          width: '25px',
          padding: '0',
        }}
      >
        {nearbyMenuOpen ? <GoTriangleRight /> : <GoTriangleLeft />}
      </button>
      {/* 조건부 렌더링을 사용하여 메뉴 표시 여부 제어 */}
      {nearbyMenuOpen && (
        <div className="nearby_menu">
          <div className="nearby_margin">
            <div></div>
          </div>
          <div className="nearby_content">
            <div className="nearby_header">추천 장소</div>
            <div className="nearby_category">
              <button
                className="nearby_spot btn1"
                onClick={() => setSelectedCategory('touristSpots')}
              >
                관광지
              </button>
              <button
                className="nearby_spot btn2"
                onClick={() => setSelectedCategory('restaurants')}
              >
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
      )}
    </>
  );
};
export default MapSidebar;
