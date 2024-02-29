import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestModal from './TestModal';

const TestPlannerTable3 = ({ planner_no }) => {
  const [plannerData, setPlannerData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // 선택 날짜 저장
  const [selectedHour, setSelectedHour] = useState(null); // 선택 시간 저장
  const [days, setDays] = useState(0);
  const [itineraries, setItineraries] = useState([]); // 일정 저장
  const [selectedDayNumber, setSelectedDayNumber] = useState(1); // 선택된 날짜가 여행의 몇 번째 날인지 저장

  // 이전에 있던 병합을 제거하고 새로운 병합을 추가하는 함수입니다.
  const mergeCells = () => {
    const table = document.querySelector('.test_PlannerTable');
    if (!table) return;

    const rows = Array.from(table.getElementsByTagName('tr'));
    let lastCell = null;
    let count = 1;

    rows.forEach((row, rowIndex) => {
      const currentCell = row.getElementsByTagName('td')[1];

      // currentCell이 undefined이거나 textContent가 빈 문자열이면 무시합니다.
      if (!currentCell || !currentCell.textContent) return;

      // // 백엔드에서 받아온 일정을 확인하여, currentCell에 해당하는 일정이 삭제되었으면 복원합니다.
      // const itinerary = itineraries.find(
      //   (it) => it.planner_title === currentCell.textContent
      // );
      // if (!itinerary) {
      //   currentCell.style.display = "";
      //   currentCell.rowSpan = 1;
      //   return;
      // }

      if (lastCell && lastCell.textContent === currentCell.textContent) {
        count++;
        lastCell.rowSpan = count;
        currentCell.style.display = 'none';
      } else {
        lastCell = currentCell;
        count = 1;
      }
    });
  };

  // 일정이 변경될 때마다 병합을 다시 실행합니다.
  useEffect(() => {
    const timeoutId = setTimeout(mergeCells, 20);
    return () => clearTimeout(timeoutId);
  }, [itineraries /* 백엔드에서 받아온 일정을 나타내는 상태 */]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/planner/trip-route/${planner_no}`)
      .then((response) => {
        console.log('컴포넌트~여행 정보 요청 응답: ', response.data);
        setPlannerData(response.data);
        const startDay = new Date(response.data.start_day);
        const endDay = new Date(response.data.end_day);
        const days = (endDay - startDay) / (1000 * 60 * 60 * 24) + 1; // 여행 일수를 계산합니다.
        setDays(days); // 여행 일수를 상태에 저장합니다.
      })
      .catch((error) => {
        console.error('여행 정보를 가져오는 동안 오류 발생: ', error);
      });
  }, [planner_no]);

  const handleSave = (newItinerary) => {
    setItineraries((prev) => [...prev, newItinerary]);
    setShowModal(false); // 일정 저장 후 모달 숨김
    // setSelectedDate(null);  // 선택된 날짜를 초기화합니다.
  };

  // 모달에서 일정 저장 후 바로 table에 반영될 수 있게 해줌
  useEffect(() => {
    const handleItinerarySaved = () => {
      findItineraries();
    };
    const eventName = `itinerarySaved_${planner_no}`;
    window.addEventListener(eventName, handleItinerarySaved);
    return () => {
      window.removeEventListener(eventName, handleItinerarySaved);
    };
  }, [planner_no]);

  useEffect(() => {
    findItineraries();
  }, []);

  const findItineraries = () => {
    axios
      .get('http://localhost:8080/itinerary/select')
      .then((res) => {
        setItineraries(res.data);
        console.log('여행일정 정보 다 받아오기 성공: ', res.data);
      })
      .catch((error) => {
        console.error('여행일정 정보 받아오기 실패! 다시 시도하세요', error);
      });
  };

  const getItineraryForTime = (dayNumber, hour) => {
    const itinerary = itineraries.find((it) => {
      console.log('잇???', it);
      const today_no = it.today_no?.today_no;
      if (today_no === undefined || Number(today_no) !== dayNumber) {
        return false;
      }

      // 'HH:MM' 형식의 시간에서 'HH' 부분만 추출
      const startHour = Number(it.start_time.split(':')[0]);
      const endHour = Number(it.end_time.split(':')[0]);
      // 현재 시간이 시작 시간과 종료 시간 사이인지 확인
      return hour >= startHour && hour < endHour;
    });

    // console.log("제발 담겨라",itinerary);
    // if (itinerary) {
    //   console.log("itinerary.planner_title: ", itinerary.planner_title);
    // }

    // return itinerary ? itinerary.planner_title : null;
    return itinerary ? itinerary.planner_title || 'No Title' : null;
  };

  const createDailyTable = (date, dayNumber) => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const itinerary = getItineraryForTime(dayNumber, i); // 해당 시간에 일정이 있는지 확인.
      hours.push(
        <tr key={i}>
          <td style={{ border: '1px solid black', padding: '5px' }}>{i}시</td>
          <td style={{ border: '1px solid black', padding: '5px' }}>
            {itinerary || ''}
          </td>
        </tr>
      );
    }

    return (
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <thead>
          <tr>
            <th
              colSpan={2}
              style={{ border: '1px solid black', padding: '5px' }}
              onClick={() => {
                setSelectedDate(date);
                setSelectedDayNumber(dayNumber); // 선택된 날짜가 여행의 몇 번째 날인지
                setShowModal(true);
              }}
            >
              {date.toLocaleDateString()}
              <div>click!</div>
            </th>
          </tr>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>시간</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>계획</th>
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
      {plannerData && createTables()}
      {showModal && (
        <TestModal
          selectedDate={selectedDate}
          selectedHour={selectedHour}
          selectedDayNumber={selectedDayNumber} // 선택 날짜 여행의 몇 번째 날인지
          onClose={() => setShowModal(false)}
          days={days}
          startDay={plannerData.start_day}
          endDay={plannerData.end_day}
          onSave={handleSave}
          planner_no={planner_no}
        />
      )}
    </div>
  );
};

export default TestPlannerTable3;
