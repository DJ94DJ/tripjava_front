import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import '../../styles/pages/map/_map_date.scss';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSelectedRegionDate } from '../../store/actions/maininfo';
import regions from '../Main/MainRegion';

const MapDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const location = useLocation();
  const selectedRegionName = location.state?.selectedRegionName;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDateSelect = (date) => {
    if (!startDate) {
      setStartDate(date);
      endDateRef.current.setFocus();
    } else if (!endDate) {
      if (date.getTime() < startDate.getTime()) {
        alert('종료 날짜는 시작 날짜보다 이전일 수 없습니다.');
        return;
      }
      setEndDate(date);
      const period = calculatePeriod(startDate, date);
      setSelectedPeriod(period);
    }
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
      ////////// 1. 리덕스에 지역, 시작/종료날짜, 위/경도 데이터 저장
      // 리덕스 스토어에 선택된 지역 데이터 저장
      // if (selectedRegion) {
      //   dispatch(
      //     setSelectedRegionDate({
      //       regionName: selectedRegionName,
      //       startDate: startDate.toISOString(),
      //       endDate: endDate.toISOString(),
      //       lat: selectedRegion.lat,
      //       lng: selectedRegion.lng,
      //     })
      //   );
      // }

      ////////// 2. 백엔드로 지역 데이터 전송
      // 이 페이지에선 메인에서 prop으로 받은 지역 데이터만 백엔드로 보낼겁니다!
      // 날짜는 /map 페이지에서 다른 정보랑 한꺼번에 보낼거에요!)

      // 백엔드로 전송할 데이터
      const regionData = {
        regionName: selectedRegionName,
      };
      console.log('Selected period:', selectedPeriod);
      axios
        .get(`http://localhost:8080/destination?addr1=${selectedRegionName}`)
        .then((res) => {
          const touristSpots = res.data.touristSpots;
          console.log('mapdate 페이지에서 투어api 잘 들고왔니!!!!', res.data);
          const locations = touristSpots.map((spot) => ({
            lat: parseFloat(spot.mapy),
            lng: parseFloat(spot.mapx),
          }));

          // GoogleMapComponent가 포함된 페이지로 이동하면서 locations 상태를 전달합니다.
          navigate('/map', {
            state: {
              locations,
              selectedLocation: {
                lat: selectedRegion.lat,
                lng: selectedRegion.lng,
              },
            },
          });
        })
        .catch((error) => {
          console.error('Error fetching tourist spots', error);
        });
    }
  };

  return (
    <div className="container">
      <h2>여행 기간을 선택해 주세요.</h2>
      <div className="start-date-section">
        <h3>시작 날짜</h3>
        <DatePicker
          selected={startDate}
          onChange={handleDateSelect}
          customInput={<input style={{ display: 'none' }} />}
          open={true}
          className="start-date-picker"
          ref={startDateRef}
          showPopperArrow={false}
        />
        {startDate && <p>{startDate.toLocaleDateString()}</p>}
      </div>
      <div className="end-date-section">
        <h3>종료 날짜</h3>
        <DatePicker
          selected={endDate}
          onChange={handleDateSelect}
          customInput={<input style={{ display: 'none' }} />}
          open={true}
          className="end-date-picker"
          ref={endDateRef}
          showPopperArrow={false}
        />
        {endDate && <p>{endDate.toLocaleDateString()}</p>}
      </div>
      {selectedPeriod && (
        <div className="selected-period">
          <p>선택한 기간: {selectedPeriod}일</p>
          <button onClick={handleComplete}>선택 완료</button>
        </div>
      )}
    </div>
  );
};

export default MapDate;
