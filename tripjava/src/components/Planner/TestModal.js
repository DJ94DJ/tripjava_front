import React, { useState, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/planner/_planner_modal.scss";

const TestModal = ({ selectedDate,days,startDay,selectedDayNumber, endDay, onClose, onSave }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
//   const [date, setDate] = useState(selectedDate); // 모달창 계속 띄우기 위해
  const [itinerary, setItinerary] = useState([]);
  const [newItinerary, setNewItinerary] = useState({
    today_no: { today_no: 3 },
    start_time: "",
    end_time: "",
    memo: "",
    planner_title: "",
    price: ""
  });

  const closeAlert = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    axios.post("http://localhost:8080/itinerary/add", newItinerary)
    .then((res) => {
      console.log("여행일정 정보 생성: ", res.data);
      setItinerary(res.data);
      onSave({ date: selectedDate, time: newItinerary.start_time, itinerary: res.data });  // onSave를 호출하여 정보를 저장합니다.
      setShowModal(false);
    })
    .catch((error) => {
      console.error("여행 일정 못 만들었습니다! 다시 시도하세요", error);
    });
    // navigate("/planner");
    // setShowModal(false);
  };
  
  //select태그에서 일자 선택해주는 함수. But, 일자까지 반영해주려면 아래 함수 사용해야됨. 추후에 삭제 예정
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'today_no') {
//       setNewItinerary(prev => ({ ...prev, today_no: { today_no: Number(value) } }));
//     } else {
//       setNewItinerary({ ...newItinerary, [name]: value });
//     }
//   };

const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'today_no') {
      setNewItinerary(prev => {
        const date = new Date(startDay);
        date.setDate(date.getDate() + Number(value) - 1);
        
        return {
          ...prev, 
          today_no: { today_no: Number(value) }, 
          start_time: date.toISOString().substring(0, 10) // date를 YYYY-MM-DD 형식의 문자열로 변환
        };
      });
    } else {
      setNewItinerary({ ...newItinerary, [name]: value });
    }
  };

  useEffect(() => {
    setShowModal(true);
  }, [selectedDate]);


  useEffect(() => {
    // 모달이 열리면 선택된 날짜가 여행의 몇 번째 날인지 자동으로 선택되도록 합니다.
    setNewItinerary(prev => ({ ...prev, today_no: { today_no: selectedDayNumber } }));
  }, [selectedDayNumber]);


//   useEffect(() => {
//     setDate(selectedDate);
//   }, [selectedDate]);
  
  return showModal ? (
    <Draggable>
      <div className="planner_alert">
        <button className="close_alert" onClick={closeAlert}>
          ✖
        </button>
        <br />
        <div className="input_container">
          <select
            name="today_no"
            value={newItinerary.today_no.today_no}  // 현재 선택된 일자를 지정합니다.
            onChange={handleChange}
          >
            <option value="">날짜 선택</option>
            {[...Array(days)].map((_, i) => 
            <option key={i} value={i + 1}>{i + 1}일차</option>)}
            
          </select>

        {/* <div className="startdate_input">
          <input
            type="date"
            name="start_time"
            value={newItinerary.start_time}
            onChange={handleChange}
          />

        </div> */}

        <div className="time_input">
           <input type="time" name="start_time_input" onChange={handleChange} />
          <input type="time" name="end_time_input" onChange={handleChange} />
            
        </div>
          <input
            className="plannerTitle_input"
            type="text"
            name="planner_title"
            placeholder="Planner Title"
            onChange={handleChange}
          />
          <textarea
            className="plannerDetails_input"
            name="memo"
            placeholder="상세 일정"
            onChange={handleChange}
          />
          <div>
            <input
              className="price_input"
              type="number"
              name="price"
              placeholder="금액"
              onChange={handleChange}
            />
            원
          </div>
        </div>
        <br />
        <div className="button_container">
          <button className="save_alert" onClick={handleSave}>
            저장
          </button>
          <button className="delete_alert" onClick={() => navigate("/planner")}>
            삭제
          </button>
        </div>
      </div>
    </Draggable>
  ) : null;
};

export default TestModal;
