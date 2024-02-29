import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlannerTable = ({ planner_no }) => {
  const [plannerData, setPlannerData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/planner/trip-route/${planner_no}`)
      .then((response) => {
        console.log('컴포넌트~여행 정보 요청 응답: ', response.data);
        setPlannerData(response.data); // 응답에서 받아온 데이터를 상태에 저장합니다.
      })
      .catch((error) => {
        console.error('여행 정보를 가져오는 동안 오류 발생: ', error);
      });
  }, [planner_no]);

  const createDailyTable = (date) => {
    // 시간(행)을 생성합니다.
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(
        <tr key={i}>
          <td style={{ border: '1px solid black', padding: '5px' }}>{i}시</td>
          <td style={{ border: '1px solid black', padding: '5px' }}></td>
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
            >
              {date.toLocaleDateString()}
            </th>
          </tr>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>시간</th>
            <th
              style={{ border: '1px solid black', padding: '5px' }}
              className="planName"
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
      const days = (endDay - startDay) / (1000 * 60 * 60 * 24) + 1; // 여행 일수를 계산합니다.

      // 각 날짜에 대한 표를 생성합니다.
      const tables = [];
      for (let i = 0; i < days; i++) {
        const date = new Date(startDay);
        date.setDate(date.getDate() + i);
        tables.push(createDailyTable(date));
      }

      return tables;
    }
  };

  return <div className="test_PlannerTable">{createTables()}</div>;
};

export default PlannerTable;
