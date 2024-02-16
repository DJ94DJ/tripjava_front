import React, { useState } from 'react';
import '../../styles/style.scss';
import { FaLocationCrosshairs } from 'react-icons/fa6';
// import { useGeoLocation } from '../../Hooks/useGeoLocation';

// 현재 위치
const geolocationOptions = {
  enableHighAccuracy: false,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const MapSearchBox = () => {
  // Origin과 Destination의 값을 감지하기 위한 state
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  // 경로 계산 결과를 표시하기 위한 state
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  // Origin 입력 필드의 값 변경 이벤트 핸들러
  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  // Destination 입력 필드의 값 변경 이벤트 핸들러
  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  // 경로 계산 버튼 클릭 이벤트 핸들러
  const handleCalculateRoute = () => {
    // 경로 계산 로직을 작성해주세요
    // 예: 경로 계산 API 호출, 결과 업데이트 등
  };

  // Clear 버튼 클릭 이벤트 핸들러
  const handleClearRoute = () => {
    // 입력값 초기화
    setOrigin('');
    setDestination('');
    // 결과 초기화
    setDistance('');
    setDuration('');
  };

  // Re-center 버튼 클릭 이벤트 핸들러
  const handleRecenter = () => {
    // 지도 다시 중심으로 이동하는 로직을 작성해주세요
  };

  return (
    <>
      <div className="mapsearch_container">
        {/* Origin 입력 필드 */}
        <input
          id="origin-input"
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={handleOriginChange}
        />
        {/* Destination 입력 필드 */}
        <input
          id="destination-input"
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={handleDestinationChange}
        />
        {/* 경로 계산 버튼 */}
        <button id="calculate-route" onClick={handleCalculateRoute}>
          Calculate Route
        </button>
        {/* Clear 버튼 */}
        <button id="clear-route" onClick={handleClearRoute}>
          Clear
        </button>
        <div>
          {/* 거리 */}
          <span id="distance">{distance}</span>
          {/* 소요 시간 */}
          <span id="duration">{duration}</span>
          {/* Re-center 버튼 */}
          <button id="recenter" onClick={handleRecenter}>
            Re-center
          </button>
          <FaLocationCrosshairs />
        </div>
      </div>
    </>
  );
};

export default MapSearchBox;
