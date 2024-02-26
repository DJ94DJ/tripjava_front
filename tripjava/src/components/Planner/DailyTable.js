import React from "react";

const DailyTable = ({
  date,
  dayNumber,
  getItineraryForTime,
  handleHourClick,
}) => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const itinerary = getItineraryForTime(dayNumber, i);
    hours.push(
      <tr key={i}>
        <td
          style={{ border: "1px solid black", padding: "8px" }}
          onClick={() => handleHourClick(i)}
        >
          {i}시
        </td>
        <td
          style={{ border: "1px solid black", padding: "8px" }}
          onClick={() => handleHourClick(i)}
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
        height: "40vh",
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
              setSelectedDayNumber(dayNumber); // 선택된 날짜가 여행의 몇 번째 날인지
              setShowModal(true);
            }}
          >
            {date.toLocaleDateString()}
            <div>click!</div>
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
          <th style={{ border: "1px solid black", padding: "5px" }}>계획</th>
        </tr>
      </thead>
      <tbody>{hours}</tbody>
    </table>
  );
};

export default DailyTable;
