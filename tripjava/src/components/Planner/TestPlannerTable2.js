import React, { useState, useEffect } from "react";
import axios from "axios";
import TestModal from './TestModal';

const TestPlannerTable2 = ({ planner_no }) => {
  const [plannerData, setPlannerData] = useState(null);
  const [showModal, setShowModal] = useState(false);  // TestModal 컴포넌트를 보여줄지 결정할 상태를 추가합니다.
  const [selectedDate, setSelectedDate] = useState(null);  // 선택된 날짜를 저장할 상태를 추가합니다.
  const [selectedHour, setSelectedHour] = useState(null);  // 선택된 시간을 저장할 상태를 추가합니다.
  const [days, setDays] = useState(0);
  const [itineraries, setItineraries] = useState([]);  // 여기에 일정을 저장합니다.
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);  // 선택된 날짜가 여행의 몇 번째 날인지 저장할 상태를 추가합니다.

  useEffect(() => {
    axios
      .get(`http://localhost:8080/planner/trip-route/${planner_no}`)
      .then((response) => {
        console.log("컴포넌트~여행 정보 요청 응답: ", response.data);
        setPlannerData(response.data); // 응답에서 받아온 데이터를 상태에 저장합니다.
        const startDay = new Date(response.data.start_day);
        const endDay = new Date(response.data.end_day);
        const days = (endDay - startDay) / (1000 * 60 * 60 * 24) + 1;  // 여행 일수를 계산합니다.
        setDays(days);  // 여행 일수를 상태에 저장합니다.
      })
      .catch((error) => {
        console.error("여행 정보를 가져오는 동안 오류 발생: ", error);
      });
  }, [planner_no]);

  const handleSave = (newItinerary) => {
    setItineraries(prev => [...prev, newItinerary]);
    setShowModal(false);  // 일정을 저장한 후에는 모달을 숨깁니다.
    // setSelectedDate(null);  // 선택된 날짜를 초기화합니다.
  };

  const getItineraryForTime = (date, hour) => {
    const dateString = date.toLocaleDateString();
    const itinerary = itineraries.find(it => it.date === dateString && it.time === `${hour}:00`);
    return itinerary ? itinerary.itinerary : null;
  };

  const createDailyTable = (date, dayNumber) => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const itinerary = getItineraryForTime(date, i);  // 해당 시간에 일정이 있는지 확인합니다.
      hours.push(
        <tr key={i}>
          <td style={{ border: "1px solid black", padding: "5px" }}>{i}시</td>
          <td style={{ border: "1px solid black", padding: "5px" }}>{itinerary ? itinerary.planner_title : ''}</td>
        </tr>
      );
    }

    return (
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              colSpan={2}
              style={{ border: "1px solid black", padding: "5px" }}
              onClick={() => {
                setSelectedDate(date);
                setSelectedDayNumber(dayNumber);  // 날짜를 선택할 때 선택된 날짜가 여행의 몇 번째 날인지 저장합니다.
                setShowModal(true);
              }}
            >
              {date.toLocaleDateString()}
            </th>
          </tr>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>시간</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>계획</th>
          </tr>
        </thead>
        <tbody>{hours}</tbody>
      </table>
    );
  };

  const createTables = () => {
    if (plannerData) {
      const startDay = new Date(plannerData.start_day);
      const endDay = new Date(plannerData.end_day);
      const days = (endDay - startDay) / (1000 * 60 * 60 * 24) + 1; // 여행 일수를 계산합니다.

      // 각 날짜에 대한 표를 생성합니다.
      const tables = [];
      for (let i = 0; i < days; i++) {
        const date = new Date(startDay);
        date.setDate(date.getDate() + i);
        tables.push(createDailyTable(date, i + 1));
      }

      return tables;
    }
  };

   return (
    <div className="test_PlannerTable">
      {plannerData &&createTables()}
      {showModal && 
        <TestModal 
          selectedDate={selectedDate} 
          selectedHour={selectedHour}
          selectedDayNumber={selectedDayNumber}  // 선택된 날짜가 여행의 몇 번째 날인지 넘겨줍니다.
          onClose={() => setShowModal(false)} 
          days={days}
          startDay={plannerData.start_day}
          endDay={plannerData.end_day}
          onSave={handleSave}
        />
      }
    </div>
  );
};

export default TestPlannerTable2;