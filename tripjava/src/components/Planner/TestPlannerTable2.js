import React, { useState, useEffect } from "react";
import axios from "axios";
import TestModal from './TestModal';

const TestPlannerTable2 = ({ planner_no }) => {
  const [plannerData, setPlannerData] = useState(null);
  const [showModal, setShowModal] = useState(false);  
  const [selectedDate, setSelectedDate] = useState(null);  // 선택 날짜 저장
  const [selectedHour, setSelectedHour] = useState(null);  // 선택 시간 저장
  const [days, setDays] = useState(0);
  const [itineraries, setItineraries] = useState([]);  // 일정 저장
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);  // 선택된 날짜가 여행의 몇 번째 날인지 저장

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

// 수정필요!!
  // useEffect(() => {
  //   findItineraries();
  // }, []);


    // 수정필요!!
  // const findItineraries = () => {
  //   axios.get('http://localhost:8080/itinerary/select')
  //     .then((res) => {
  //       setItineraries(res.data);
  //       console.log('여행일정 정보 다 받아오기 성공: ', res.data);
  //     })
  //     .catch((error) => {
  //       console.error('여행일정 정보 받아오기 실패! 다시 시도하세요', error);
  //     });
  // };



//   const getItineraryForTime = (dayNumber, hour) => {
//     console.log("데이터스트링",dayNumber);
  
//     const itinerary = itineraries.find(it => {
//       console.log("잇 데이타:",it.today_no);
//       if (it.today_no.today_no !== dayNumber) {
//         return false;  // 날짜가 다른 경우 건너뜁니다.
//       }
//       // 'HH:MM' 형식의 시간을 분으로 변환합니다.
//       const startMinutes = it.start_time.split(':').reduce((acc, val) => acc * 60 + Number(val));
//       const endMinutes = it.end_time.split(':').reduce((acc, val) => acc * 60 + Number(val));
//       const currentMinutes = hour * 60;
//       // 현재 시간이 시작 시간과 종료 시간 사이인지 확인합니다.
//       console.log("시작시간",startMinutes,"종료시간", endMinutes,"현재시간", currentMinutes);
//       return currentMinutes >= startMinutes && currentMinutes < endMinutes;
//     });

//   console.log('찾은 일정 요기 있니?:', itinerary);

//   return itinerary ? itinerary.planner_title : null;
// };


  const createDailyTable = (date, dayNumber) => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      // const itinerary = getItineraryForTime(date, i);  // 해당 시간에 일정이 있는지 확인.
      hours.push(
        <tr key={i}>
          <td style={{ border: "1px solid black", padding: "5px" }}>{i}시</td>
          <td style={{ border: "1px solid black", padding: "5px" }}>
            {/* {itinerary ? itinerary.planner_title : ''} */}
            </td>
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
                setSelectedDayNumber(dayNumber);  // 선택된 날짜가 여행의 몇 번째 날인지
                setShowModal(true);
              }}
            >
              {date.toLocaleDateString()}
              <div>click!</div>
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
          selectedDayNumber={selectedDayNumber}  // 선택 날짜 여행의 몇 번째 날인지
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