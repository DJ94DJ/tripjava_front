import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "../../styles/pages/map/_map_date.scss";
import "react-datepicker/dist/react-datepicker.css";

const MapDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleDateSelect = (date) => {
    if (!startDate) {
      setStartDate(date);
      endDateRef.current.setFocus();
    } else if (!endDate) {
      if (date.getTime() < startDate.getTime()) {
        alert("종료 날짜는 시작 날짜보다 이전일 수 없습니다.");
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
    if (startDate && endDate) {
      // 선택 완료 시 처리할 로직 작성
      console.log("Selected period:", selectedPeriod);
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
          customInput={<input style={{ display: "none" }} />}
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
          customInput={<input style={{ display: "none" }} />}
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
