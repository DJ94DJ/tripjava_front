import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/planner/_planner_modal.scss';

const TestModalLily = ({
  selectedDateTime,
  days,
  startDay,
  endDay,
  onClose,
  onSave,
  planner_no,
  itineraryId,
  todayNums,
  selectedDayNumber,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  const [newItinerary, setNewItinerary] = useState({
    today_no: { today_no: null },
    start_time: '',
    end_time: '',
    memo: '',
    planner_title: '',
    price: '',
  });

  const [startTime, setStartTime] = useState('');
  const [selectDate, setSelectDate] = useState(null);

  const getDayNumberFromDate = (selectedDate) => {
    const startDate = new Date(startDay);
    const currentDate = new Date(selectedDate);

    const diffInTime = currentDate.getTime() - startDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    return diffInDays + 1;
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_HOST}/itinerary/del/${itineraryId}`)
      .then((res) => {
        console.log('일정 삭제 성공: ', res.data);
        // 삭제가 성공하면 모달을 닫거나 다시 로드하는 등의 동작을 수행할 수 있습니다.
        onClose(); // 모달 닫기
      })
      .catch((error) => {
        console.error('삭제 오류! 다시 시도하세요', error);
      });
  };

  const closeAlert = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    // console.log("데이즈",days)
    const date = new Date(startDay);
    console.log('데이트', date);
    // date.setDate(date.getDate() + Number(days) - 1);
    date.setDate(date.getDate() + Number(newItinerary.today_no.today_no) - 1);
    const newStartTime = `${date.toISOString().substring(0, 10)} ${startTime}`;

    setNewItinerary((prev) => ({ ...prev, start_time: newStartTime }));

    const requsetData = {
      today_no: { today_no: todayNums[newItinerary.today_no.today_no - 1] },
      start_time: newItinerary.start_time,
      end_time: newItinerary.end_time,
      memo: newItinerary.memo,
      planner_title: newItinerary.planner_title,
      price: newItinerary.price,
    };
    console.log(
      '정제가 뭐야',
      selectedDayNumber,
      todayNums[newItinerary.today_no.today_no - 1]
    );

    axios
      .post(`${process.env.REACT_APP_HOST}/itinerary/add`, requsetData)
      .then((res) => {
        console.log('여행일정 정보 생성: ', res.data);
        setItinerary(res.data);
        onSave({
          date: selectedDateTime.date,
          time: newItinerary.start_time,
          itinerary: res.data,
        });

        window.dispatchEvent(
          new CustomEvent(`itinerarySaved_${planner_no}`, {
            detail: res.data,
          })
        );
      })
      .catch((error) => {
        console.error('생성 오류! 다시 시도하세요', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'start_time_input') {
      setStartTime(value);
      setNewItinerary((prev) => {
        const newEndTime = Number(value) + 1;
        return {
          ...prev,
          start_time: `${value}`,
          end_time: `${newEndTime}`,
        };
      });
    }

    if (name === 'end_time_input') {
      if (Number(value) <= Number(startTime)) {
        alert('종료 시간은 시작 시간보다 커야 합니다.');
        return;
      }
      setNewItinerary((prev) => ({ ...prev, end_time: `${value}` }));
    }

    // 시작 시간이 변경될 때 end_time을 업데이트
    if (name === 'start_time_input') {
      const newEndTime = Number(value) + 1;
      setNewItinerary((prev) => ({ ...prev, end_time: `${newEndTime}` }));
    }

    if (name !== 'start_time_input' && name !== 'end_time_input') {
      setNewItinerary({ ...newItinerary, [name]: value });
    }
  };

  // table에서 선택한 시간에 따라 기존에 선택했던 값 reset해줌
  useEffect(() => {
    if (selectedDateTime) {
      const selectedHour = selectedDateTime.hour;
      setStartTime(selectedHour);
      setNewItinerary((prev) => ({
        ...prev,
        start_time: `${selectedHour}`,
        end_time: `${Number(selectedHour) + 1}`,
      }));
    }
  }, [selectedDateTime?.hour, newItinerary.today_no.today_no]);

  useEffect(() => {
    if (selectedDateTime) {
      setShowModal(true);
    }
  }, [selectedDateTime?.date]);

  useEffect(() => {
    if (selectedDateTime) {
      const selectedDayNumber = getDayNumberFromDate(selectedDateTime.date);
      setSelectDate(selectedDayNumber);
      setNewItinerary((prev) => ({
        ...prev,
        today_no: { today_no: selectedDayNumber },
      }));
      setShowModal(true);
    }
  }, [selectedDateTime?.date]);

  return showModal ? (
    <Draggable>
      <div className="planner_alert">
        <button className="close_alert" onClick={closeAlert}>
          ✖
        </button>
        <br />
        <div className="input_container">
          <h3>{newItinerary.today_no.today_no}일차</h3>
          <div className="time_input">
            <div className="start_timp_div">
              <div>시작 시간 : </div>
              <input
                className=""
                type="number"
                name="start_time_input"
                value={startTime}
                min="0"
                max="23"
                onChange={handleChange}
              />
            </div>

            <div className="end_timp_div">
              <div>종료 시간 : </div>
              <input
                type="number"
                name="end_time_input"
                min={Number(startTime) + 1}
                max="24"
                value={
                  newItinerary.end_time
                    ? newItinerary.end_time
                    : Number(startTime) + 1
                }
                onChange={handleChange}
              />
            </div>
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
          {/* <button className="delete_alert" onClick={handleDelete}>
            삭제
          </button> */}
        </div>
      </div>
    </Draggable>
  ) : null;
};

export default TestModalLily;
