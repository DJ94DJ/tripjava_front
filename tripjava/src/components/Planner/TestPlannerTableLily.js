import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import TestModalLily from './TestModalLily';

const TestPlannerTableLily = ({ planner_no }) => {
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
  const [todayNums, setTodayNums] = useState([]);

  const mergeCells = () => {
    const table = document.querySelector('.test_PlannerTable');

    if (!table) return;


    const rows = Array.from(table.getElementsByTagName("tr"));
    let lastText = null;
    let matchedClass = null;
    let colorMap = new Map();


    rows.forEach((row, rowIndex) => {
      const currentCell = row.getElementsByTagName('td')[1];

      // currentCell이 undefined이거나 textContent가 빈 문자열이면 무시합니다.
      if (!currentCell || !currentCell.textContent) return;

      // 특정 구문 건너뜁니다.
      if (currentCell.textContent.includes("IGN")) return;

      // 상단 셀을 검사하여, 빈 셀 혹은 "start" 혹은 "bottom"이 있는 셀이 있는 경우 예외로 적용합니다.
      let exceptionCell = false;
      if (rowIndex > 0) {
        const topCell = rows[rowIndex - 1].getElementsByTagName("td")[1];
        if (
          topCell &&
          (!topCell.textContent ||
            topCell.textContent.includes("start") ||
            topCell.textContent.includes("bottom"))
        ) {
          exceptionCell = true;
        }
      }

      // "start", "middle", "bottom"이 포함된 셀은 무시합니다. 단, 상단 셀이 빈 셀이거나 "start", "bottom"을 포함하고 있다면 예외로 적용합니다.
      if (
        !exceptionCell &&
        (currentCell.textContent.includes("start") ||
          currentCell.textContent.includes("middle") ||
          currentCell.textContent.includes("bottom"))
      )
        return;

      // 하단 셀을 검사하여, "middle" 혹은 "bottom"이 있는 셀이 있을 경우 건너뛰도록 합니다.
      let ignoreCell = false;
      if (rows[rowIndex + 1]) {
        const bottomCell = rows[rowIndex + 1].getElementsByTagName("td")[1];
        if (
          bottomCell &&
          (bottomCell.textContent.includes("middle") ||
            bottomCell.textContent.includes("bottom"))
        ) {
          ignoreCell = true;
        }
      }

      // 만약 하단 셀에 "middle" 혹은 "bottom"이 포함된 셀이 있으면, 현재 셀도 무시합니다.
      if (ignoreCell) return;

      if (!colorMap.has(currentCell.textContent)) {
        const colorClass = `color_test_${rowIndex % 8}`; // 색상 클래스명
        colorMap.set(currentCell.textContent, colorClass);
        currentCell.classList.add(colorClass); // 색상 클래스명 부여
      } else {
        currentCell.classList.add(colorMap.get(currentCell.textContent)); // 색상 클래스명 부여
      }

      if (lastText && lastText === currentCell.textContent) {
        currentCell.style.color = "transparent"; // 텍스트 투명도를 0으로 설정
        currentCell.style.border = "0";
        currentCell.classList.add(matchedClass); // 동일한 클래스명 부여

        const nextCell = rows[rowIndex + 1]
          ? rows[rowIndex + 1].getElementsByTagName("td")[1]
          : null;

        if (!nextCell || nextCell.textContent !== currentCell.textContent) {
          currentCell.textContent += " bottom";
          currentCell.classList.add("merge-bottom"); // 병합됨 셀의 하단 부분에 클래스 추가

          if (rows[rowIndex + 1]) {
            const adjacentBottomCell =
              rows[rowIndex + 1].getElementsByTagName("td")[1];
            if (adjacentBottomCell) {
              adjacentBottomCell.classList.add("adjacent-bottom"); // 병합됨 셀의 하단에 인접한 셀에 클래스 추가
            }
          }
        } else {
          currentCell.textContent += " middle";
        }
      } else {
        lastText = currentCell.textContent;
        matchedClass = `matched_${rowIndex}`; // 일치하는 셀들에게 부여될 클래스명
        currentCell.classList.add(matchedClass);

        if (
          !currentCell.textContent.includes("---") &&
          !currentCell.textContent.includes("bottom")
        ) {
          currentCell.textContent = "--- " + currentCell.textContent;
          currentCell.classList.add("merge-top");
        }

        if (rowIndex > 0) {
          const adjacentTopCell =
            rows[rowIndex - 1].getElementsByTagName("td")[1];
          if (adjacentTopCell) {
            adjacentTopCell.classList.add("adjacent-top"); // 병합된 셀의 상단에 인접한 셀에 클래스 추가
          }
        }
      }
    });

    rows.forEach((row, rowIndex) => {
      const currentCell = row.getElementsByTagName("td")[1];
      if (
        currentCell &&
        currentCell.textContent &&
        !currentCell.textContent.includes("middle")
      ) {
        const nextCell = rows[rowIndex + 1]
          ? rows[rowIndex + 1].getElementsByTagName("td")[1]
          : null;
        const prevCell =
          rowIndex > 0
            ? rows[rowIndex - 1].getElementsByTagName("td")[1]
            : null;

        if (
          currentCell.textContent.includes("---") &&
          ((prevCell && prevCell.textContent.includes("---")) ||
            (nextCell && nextCell.textContent.includes("---"))) &&
          (!prevCell ||
            (prevCell.textContent !== currentCell.textContent &&
              !prevCell.textContent.includes("middle") &&
              !prevCell.textContent.includes("---"))) &&
          (!nextCell ||
            (nextCell.textContent !== currentCell.textContent &&
              !nextCell.textContent.includes("middle") &&
              !nextCell.textContent.includes("---") &&
              !nextCell.textContent.includes("bottom")))
        ) {
          currentCell.classList.add("onlyone");
        }
      }
    });

    // 모든 작업이 완료된 후에 "---" 칸 위에 "---"가 있어서 "onlyone" 클래스가 적용된 칸을 검사했을 때 해당 내용이 불일치하면 "onlyone" 클래스를 제거합니다.
    // 하단 칸이 비어있거나 "---"가 있을 경우에는 "onlyone" 클래스를 유지합니다.
    rows.forEach((row, rowIndex) => {
      const currentCell = row.getElementsByTagName("td")[1];
      if (
        currentCell &&
        currentCell.textContent &&
        currentCell.classList.contains("onlyone")
      ) {
        const nextCell =
          rowIndex < rows.length - 1
            ? rows[rowIndex + 1].getElementsByTagName("td")[1]
            : null;
        const prevCell =
          rowIndex > 0
            ? rows[rowIndex - 1].getElementsByTagName("td")[1]
            : null;

        if (
          prevCell &&
          prevCell.textContent.includes("---") &&
          prevCell.textContent !== currentCell.textContent &&
          nextCell &&
          !nextCell.textContent.includes("---")
        ) {
          currentCell.classList.remove("onlyone");
        }
      }
    });

    // 색상 설정
    // let style = document.createElement("style");
    // document.head.appendChild(style);
    // let styleSheet = style.sheet;

    // colorMap.forEach((colorClass, text) => {
    //   const colorStyle = getRandomColor(); // 랜덤 색상
    //   styleSheet.insertRule(
    //     `.${colorClass} { background-color: ${colorStyle}; }`,
    //     styleSheet.cssRules.length
    //   );
    // });
  };

  // // 백엔드에서 Itinerary 전체를 가져오는 함수입니다.
  // const fetchItineraries = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8080/itinerary/select");
  //     console.log("전체불러와", res);
  //     return res.data;
  //   } catch (error) {
  //     console.error("일정 불러오기 오류! 다시 시도하세요", error);
  //   }
  // };

  // 삭제 버튼을 추가하는 함수입니다.
  const addDeleteButton = (itineraries) => {
    itineraries.forEach((itinerary) => {
      const cell = Array.from(document.querySelectorAll('.merged')).find(
        (cell) => cell.textContent === itinerary.planner_title
      );
      if (cell && !cell.querySelector('button')) {
        const deleteButton = document.createElement('button');
        deleteButton.innerText = '삭제';
        deleteButton.addEventListener('click', () =>
          handleDelete(itinerary.itinerary_no)
        );
        cell.appendChild(deleteButton);
      }
    });
  };

  // 일정을 삭제하는 함수입니다.
  const handleDelete = (itineraryId) => {
    axios
      .delete(`${process.env.REACT_APP_HOST}/itinerary/del/${itineraryId}`)
      .then((res) => {
        console.log('일정 삭제 성공: ', res.data);
        // 삭제가 성공하면 모달을 닫거나 다시 로드하는 등의 동작을 수행할 수 있습니다.
      })
      .catch((error) => {
        console.error('삭제 오류! 다시 시도하세요', error);
      });
  };

  // useEffect(() => {
  //   if (plannerData) findItineraries();
  //   console.log("aaaa 1");
  // }, [plannerData]);

  useEffect(() => {
    findItineraries();
  }, []);

  // 일정이 변경될 때마다 셀 병합을 다시 실행하고, 백엔드에서 Itinerary 전체를 가져온 후 삭제 버튼을 추가합니다.
  // useEffect(() => {
  //   // const timeoutId = setTimeout(async () => {
  //   //   mergeCells();
  //   //   const itineraries = await fetchItineraries();
  //   //   addDeleteButton(itineraries);
  //   // }, 200);
  //   // return () => clearTimeout(timeoutId);
  //   console.log("aaaa 3");
  //   mergeCells();
  //   addDeleteButton(itineraries);
  // }, [itineraries /* 백엔드에서 받아온 일정을 나타내는 상태 */]);

  useEffect(() => {
    axios
      // http://localhost:8080/plan/today-no/{planner_no}/{days}
      .get(`${process.env.REACT_APP_HOST}/planner/trip-route/${planner_no}`)
      .then((response) => {
        console.log('컴포넌트~여행 정보 요청 응답: ', response.data);
        setPlannerData(response.data);
        const startDay = new Date(response.data.start_day);
        const endDay = new Date(response.data.end_day);
        const days = (endDay - startDay) / (1000 * 60 * 60 * 24) + 1; // 여행 일수를 계산합니다.
        setDays(days); // 여행 일수를 상태에 저장합니다.
        axios
          .get(
            `${process.env.REACT_APP_HOST}/plan/today-no/${planner_no}/${days}`
          )
          .then((response) => {
            console.log('숫자 잘 들어오냐??', response.data);
            setTodayNums(response.data);
          });
      })
      .catch((error) => {
        console.error('여행 정보를 가져오는 동안 오류 발생: ', error);
      });

    // 모달에서 일정 저장 후 바로 table에 반영될 수 있게 해줌
    const handleItinerarySaved = () => {
      findItineraries();
    };
    const eventName = `itinerarySaved_${planner_no}`;
    window.addEventListener(eventName, handleItinerarySaved);
    return () => {
      window.removeEventListener(eventName, handleItinerarySaved);
    };
  }, [planner_no]);

  const handleSave = (newItinerary) => {
    setItineraries((prev) => [...prev, newItinerary.itinerary]);
    console.log('newItinerary ', newItinerary);
    console.log('itineraries ', itineraries);
    setShowModal(false); // 일정 저장 후 모달 숨김
    // setSelectedDate(null);  // 선택된 날짜를 초기화합니다.
  };

  const handleTimeClick = (date, hour) => {
    setSelectedDateTime({ date, hour }); // 선택된 날짜와 시간을 함께 설정
    setShowModal(true);
  };

  const findItineraries = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/itinerary/select/${planner_no}`)
      .then((res) => {
        setItineraries(res.data);
        console.log('aaaa 2');
        console.log('여행일정 정보 다 받아오기 성공: ', res.data);
      })
      .catch((error) => {
        console.error('여행일정 정보 받아오기 실패! 다시 시도하세요', error);
      });
  };

  const getItineraryForTime = (dayNumber, hour) => {
    const itinerary = itineraries.find((it) => {
      // console.log("잇???", it);
      const today_type = it.today_no?.today_type;
      setSelectedDayNumber(today_type);
      if (today_type === undefined || Number(today_type) !== dayNumber) {
        return false;
      }

      // 'HH:MM' 형식의 시간에서 'HH' 부분만 추출
      const startHour = Number(it.start_time.split(':')[0]);
      const endHour = Number(it.end_time.split(':')[0]);
      // 현재 시간이 시작 시간과 종료 시간 사이인지 확인
      return hour >= startHour && hour < endHour;
    });

    return itinerary ? itinerary.planner_title || 'No Title' : null;
  };

  const createDailyTable = (date, dayNumber) => {
    const hours = [];
    for (let i = 1; i < 25; i++) {
      const itinerary = getItineraryForTime(dayNumber, i); // 해당 시간에 일정이 있는지 확인.
      hours.push(
        <tr key={i}>
          <td
            style={{
              border: "1px solid black",
              borderRight: "0", // 오른쪽 선을 없앰
              marginRight: "10px", // 오른쪽에 10px 간격을 둠
              padding: "5px",
            }}
            onClick={() => {
              handleTimeClick(date, i);
            }}
          >
            {i}시
          </td>
          <td
            style={{ border: '1px solid black', padding: '5px' }}
            onClick={() => {
              handleTimeClick(date, i);
            }}
          >
            {itinerary || ''}
          </td>
        </tr>
      );
    }

    return (
      <table
        className="day-table"
        style={{
          borderCollapse: 'collapse',
          minWidth: '250px',
          marginBottom: '20px',
        }}
      >
        <thead>
          <tr>
            <th
              colSpan={2}
              style={{ border: '1px solid black', padding: '5px' }}
            >
              {date.toLocaleDateString()}
            </th>
          </tr>
          <tr>
            <th
              className="times"
              style={{
                width: '20%',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              시간
            </th>
            <th
              className="plans"
              style={{
                width: '80%',
                border: '1px solid black',
                padding: '5px',
              }}
            >
              계획
            </th>
          </tr>
        </thead>
        <tbody className="hourscell">{hours}</tbody>
      </table>
    );
  };

  const createTables = useMemo(() => {
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
  }, [itineraries, plannerData]);

  useEffect(() => {
    mergeCells();
    addDeleteButton(itineraries);
  }, [createTables]);

  return (
    <div className="test_PlannerTable">
      {createTables}
      {showModal && (
        <TestModalLily
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
          todayNums={todayNums}
        />
      )}
    </div>
  );
};

export default TestPlannerTableLily;
