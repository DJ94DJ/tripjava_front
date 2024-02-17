import React, { useState, useRef } from 'react';
import '../../styles/style.scss';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { Autocomplete } from '@react-google-maps/api';

const MapSearchBox = () => {
  const [directionsRes, setDestinationRes] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef();
  const destiantionRef = useRef();
  // 붙여넣기한거
  // Origin과 Destination의 값을 감지하기 위한 state
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selected, setSelected] = useState(null);

  // 경로 계산 결과를 표시하기 위한 state

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
        <Autocomplete>
          <input
            className="place-container"
            id="origin-input"
            type="text"
            placeholder="Origin"
            ref={originRef}
            onChange={handleOriginChange}
          />
        </Autocomplete>
        {/* Destination 입력 필드 */}
        <Autocomplete>
          <input
            id="destination-input"
            type="text"
            placeholder="Destination"
            ref={destiantionRef}
            onChange={handleDestinationChange}
          />
        </Autocomplete>
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
        </div>
      </div>
    </>
  );
};

export default MapSearchBox;
