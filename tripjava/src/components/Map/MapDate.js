import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import regions from '../Main/MainRegion';
import '../../styles/style.scss';

const MapDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const location = useLocation();
  const selectedRegionName = location.state?.selectedRegionName;
  const navigate = useNavigate();

  const handleStartDateSelect = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (date.getTime() < currentDate.getTime()) {
      alert('시작 날짜는 현재 날짜보다 이전일 수 없습니다.');
      return;
    }
    setStartDate(date);
    endDateRef.current.setFocus();
  };

  const handleEndDateSelect = (date) => {
    if (!startDate) {
      alert('시작 날짜를 먼저 선택해주세요!');
      return;
    }
    if (date.getTime() < startDate.getTime()) {
      alert('종료 날짜는 시작 날짜보다 이전일 수 없습니다.');
      return;
    }
    const period = calculatePeriod(startDate, date);
    if (period > 4) {
      // 5일 이상인 경우
      alert('여행 기간은 최대 5일까지만 선택 가능합니다.');
      return;
    }
    setEndDate(date);
    setSelectedPeriod(period);
  };

  const calculatePeriod = (start, end) => {
    const diffInTime = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
  };

  const handleComplete = () => {
    // main에서 받은 지역 정보를 추가했어요:)
    if (selectedRegionName && startDate && endDate) {
      // 선택된 지역의 위도와 경도 찾기!
      const selectedRegion = regions.find(
        (region) => region.name === selectedRegionName
      );

      console.log('Selected period:', selectedPeriod);
      axios
        .get(
          `${process.env.REACT_APP_HOST}/destination?addr1=${selectedRegionName}`
        )
        // .get(`http://localhost:8080/destination?addr1=${selectedRegionName}`)
        .then((res) => {
          const touristSpots = res.data.touristSpots;
          console.log('mapdate 페이지/투어api 호출 : ', res.data);
          const locations = touristSpots.map((spot) => ({
            lat: parseFloat(spot.mapy),
            lng: parseFloat(spot.mapx),
          }));

          // GoogleMapComponent로 이동하면서 locations, 위도, 경도, 날짜, touristSpots 정보 전달!!
          navigate('/map', {
            state: {
              locations,
              selectedLocation: {
                lat: selectedRegion.lat,
                lng: selectedRegion.lng,
              },
              touristSpots, //touristSpots의 전체 데이터도 전달하자!
              // 날짜 정보도 전달하자!
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              period: selectedPeriod,
            },
          });
        })
        .catch((error) => {
          console.error('Error touristSpots', error);
        });
    }
  };

  return (
    <div className="container">
      <h2>여행 기간을 선택해 주세요.</h2>
      <div className="start-date-section">
        <h3>시작 날짜</h3>
        <div className="react-datepicker-wrapper">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateSelect}
            customInput={<input style={{ display: 'none' }} />}
            open={true}
            className="start-date-picker"
            ref={startDateRef}
            showPopperArrow={false}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          {startDate && (
            <div className="start-date">{startDate.toLocaleDateString()}</div>
          )}
        </div>
      </div>
      <div className="end-date-section">
        <h3>종료 날짜</h3>
        <div className="react-datepicker-wrapper">
          <DatePicker
            selected={endDate}
            onChange={handleEndDateSelect}
            customInput={<input style={{ display: 'none' }} />}
            open={true}
            className="end-date-picker"
            ref={endDateRef}
            showPopperArrow={false}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
          {endDate && (
            <div className="end-date">{endDate.toLocaleDateString()}</div>
          )}
        </div>
      </div>
      {selectedPeriod && (
        <>
          <div className="selectedPeriod-wrapper">
            <div>선택한 기간: {selectedPeriod + 1}일</div>
          </div>
          <div className="selectedButton-wrapper">
            <button onClick={handleComplete}>선택 완료</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MapDate;
