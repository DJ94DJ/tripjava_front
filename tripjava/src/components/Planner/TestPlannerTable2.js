import React, { useState, useEffect } from "react";
import axios from "axios";
import TestModal from "./TestModal";

const TestPlannerTable2 = ({ planner_no }) => {
  const [plannerData, setPlannerData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // 선택 날짜 저장
  const [selectedHour, setSelectedHour] = useState(null); // 선택 시간 저장
  const [days, setDays] = useState(0);
  const [itineraries, setItineraries] = useState([]); // 일정 저장
  const [selectedDayNumber, setSelectedDayNumber] = useState(1); // 선택된 날짜가 여행의 몇 번째 날인지 저장
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: null,
    hour: null,
  }); // 선택된 날짜와 시간을 저장하는 상태

  // 이전에 있던 병합을 제거하고 새로운 병합을 추가하는 함수입니다.
  const mergeCells = () => {
    const table = document.querySelector(".test_PlannerTable");
    if (!table) return;

    const rows = Array.from(table.getElementsByTagName("tr"));
    let lastCell = null;
    let count = 1;

    rows.forEach((row, rowIndex) => {
      const currentCell = row.getElementsByTagName("td")[1];

      // currentCell이 undefined이거나 textContent가 빈 문자열이면 무시합니다.
      if (!currentCell || !currentCell.textContent) return;

      if (lastCell && lastCell.textContent === currentCell.textContent) {
        count++;
        lastCell.rowSpan = count;
        currentCell.style.display = "none";
        currentCell.classList.add("merged"); // 현재 셀에 'merged' 클래스 추가
      } else {
        lastCell = currentCell;
        lastCell.classList.add("merged");
        count = 1;
      }
    });
  };

  // 백엔드에서 Itinerary 전체를 가져오는 함수입니다.
  const fetchItineraries = async () => {
    try {
      const res = await axios.get("http://localhost:8080/itinerary/select");
      console.log("전체불러와", res);
      return res.data;
    } catch (error) {
      console.error("일정 불러오기 오류! 다시 시도하세요", error);
    }
  };

  // 삭제 버튼을 추가하는 함수입니다.
  const addDeleteButton = (itineraries) => {
    itineraries.forEach((itinerary) => {
      const cell = Array.from(document.querySelectorAll(".merged")).find(
        (cell) => cell.textContent === itinerary.planner_title
      );
      if (cell && !cell.querySelector("button")) {
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "삭제";
        deleteButton.addEventListener("click", () =>
          handleDelete(itinerary.itinerary_no)
        );
        cell.appendChild(deleteButton);
      }
    });
  };

  // 일정을 삭제하는 함수입니다.
  const handleDelete = (itineraryId) => {
    axios
      .delete(`http://localhost:8080/itinerary/del/${itineraryId}`)
      .then((res) => {
        console.log("일정 삭제 성공: ", res.data);
        // 삭제가 성공하면 모달을 닫거나 다시 로드하는 등의 동작을 수행할 수 있습니다.
      })
      .catch((error) => {
        console.error("삭제 오류! 다시 시도하세요", error);
      });
  };

  // 일정이 변경될 때마다 셀 병합을 다시 실행하고, 백엔드에서 Itinerary 전체를 가져온 후 삭제 버튼을 추가합니다.
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      mergeCells();
      const itineraries = await fetchItineraries();
      addDeleteButton(itineraries);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [itineraries /* 백엔드에서 받아온 일정을 나타내는 상태 */]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/planner/trip-route/${planner_no}`)
      .then((response) => {
        console.log("컴포넌트~여행 정보 요청 응답: ", response.data);
        setPlannerData(response.data);
        const startDay = new Date(response.data.start_day);
        const endDay = new Date(response.data.end_day);
        const days = (endDay - startDay) / (1000 * 60 * 60 * 24) + 1; // 여행 일수를 계산합니다.
        setDays(days); // 여행 일수를 상태에 저장합니다.
      })
      .catch((error) => {
        console.error("여행 정보를 가져오는 동안 오류 발생: ", error);
      });
  }, [planner_no]);

  const handleSave = (newItinerary) => {
    setItineraries((prev) => [...prev, newItinerary]);
    setShowModal(false); // 일정 저장 후 모달 숨김
    // setSelectedDate(null);  // 선택된 날짜를 초기화합니다.
  };

  const handleTimeClick = (date, hour) => {
    setSelectedDateTime({ date, hour }); // 선택된 날짜와 시간을 함께 설정
    setShowModal(true);
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
      .get("http://localhost:8080/itinerary/select")
      .then((res) => {
        setItineraries(res.data);
        console.log("여행일정 정보 다 받아오기 성공: ", res.data);
      })
      .catch((error) => {
        console.error("여행일정 정보 받아오기 실패! 다시 시도하세요", error);
      });
  };

  const getItineraryForTime = (dayNumber, hour) => {
    const itinerary = itineraries.find((it) => {
      // console.log("잇???", it);
      const today_no = it.today_no?.today_no;
      if (today_no === undefined || Number(today_no) !== dayNumber) {
        return false;
      }

      // 'HH:MM' 형식의 시간에서 'HH' 부분만 추출
      const startHour = Number(it.start_time.split(":")[0]);
      const endHour = Number(it.end_time.split(":")[0]);
      // 현재 시간이 시작 시간과 종료 시간 사이인지 확인
      return hour >= startHour && hour < endHour;
    });

    return itinerary ? itinerary.planner_title || "No Title" : null;
  };

  const createDailyTable = (date, dayNumber) => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const itinerary = getItineraryForTime(dayNumber, i); // 해당 시간에 일정이 있는지 확인.
      hours.push(
        <tr key={i}>
          <td
            style={{ border: "1px solid black", padding: "5px" }}
            onClick={() => {
              handleTimeClick(date, i);
            }}
          >
            {i}시
          </td>
          <td
            style={{ border: "1px solid black", padding: "5px" }}
            onClick={() => {
              handleTimeClick(date, i);
            }}
          >
            {itinerary || ""}
          </td>
        </tr>
      );
    }

    return (
      <table
        className="day-table"
        style={{
          borderCollapse: "collapse",
          minWidth: "250px",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              colSpan={2}
              style={{ border: "1px solid black", padding: "5px" }}
            >
              {date.toLocaleDateString()}
            </th>
          </tr>
          <tr>
            <th
              style={{
                width: "20%",
                border: "1px solid black",
                padding: "5px",
              }}
            >
              시간
            </th>
            <th
              style={{
                width: "80%",
                border: "1px solid black",
                padding: "5px",
              }}
            >
              계획
            </th>
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
      const days = (endDay - startDay) / (1000 * 60 * 60 * 24) + 1;

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
          selectedDateTime={selectedDateTime} // 시간을 눌렀을 때 날짜까지 같이 받아올 수 있음
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

export default TestPlannerTable2;
