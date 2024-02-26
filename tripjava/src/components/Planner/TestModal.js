import React, { useState, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/planner/_planner_modal.scss";

const TestModal = ({ selectedDate,days,startDay,selectedDayNumber, endDay, onClose, onSave, planner_no }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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

      // 저장시 바로 reload 할 수 있게끔
    window.dispatchEvent(new CustomEvent(`itinerarySaved_${planner_no}`));
    })
    .catch((error) => {
      console.error("생성 오류! 다시 시도하세요", error);
    });
    // navigate("/planner");
    // setShowModal(false);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    switch (name) {
      case 'today_no':
        setNewItinerary(prev => {
          const date = new Date(startDay);
          date.setDate(date.getDate() + Number(value) - 1);
  
          return {
            ...prev, 
            today_no: { today_no: Number(value) }, 
            start_time: date.toISOString().substring(0, 10) // date를 YYYY-MM-DD 형식의 문자열로 변환
          };
        });
        break;
  
      case 'start_time_input':
        setNewItinerary(prev => ({ ...prev, start_time: value }));
        break;
  
      case 'end_time_input':
        setNewItinerary(prev => ({ ...prev, end_time: value }));
        break;
  
      default:
        setNewItinerary({ ...newItinerary, [name]: value });
        break;
    }
  };
  

  useEffect(() => {
    setShowModal(true);
  }, [selectedDate]);


  useEffect(() => {
    // 모달이 열리면 선택된 날짜가 여행의 몇 번째 날인지 자동으로 선택
    setNewItinerary(prev => ({ ...prev, today_no: { today_no: selectedDayNumber } }));
  }, [selectedDayNumber]);


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
            value={newItinerary.today_no.today_no}  // 선택 일자를 지정
            onChange={handleChange}
          >
            <option value="">날짜 선택</option>
            {[...Array(days)].map((_, i) => 
            <option key={i} value={i + 1}>{i + 1}일차</option>)}
            
          </select>

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
