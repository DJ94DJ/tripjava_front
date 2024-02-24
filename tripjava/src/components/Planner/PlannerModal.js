import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setStartDate, setEndDate, setPlannerTitle, setDetails, setPlace, setPrice } from "../../store/actions/planner";
import "../../styles/pages/planner/_planner_modal.scss";

const PlannerModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const planner = useSelector((state) => state.planner);
  const [showModal, setShowModal] = useState(false);

  const closeAlert = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    navigate("/planner");
    setShowModal(false);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);


  return showModal ? (
    <Draggable>
      <div className="planner_alert">
        <button className="close_alert" onClick={closeAlert}>
          ✖
        </button>
        <br />
        <div className="input_container">
  
  <input
    className="startdate_input"
    type="datetime-local"
    value={"2024-05-04 15:00"}
    // value={planner.startDate}
    onChange={(e) => dispatch(setStartDate(e.target.value))}
    readOnly={true}
  />
  <input
    className="enddate_input"
    type="datetime-local"
    value={planner.endDate}
    onChange={(e) => dispatch(setEndDate(e.target.value))}
  />

    <select
        className="place_select"
        onChange={(e) => dispatch(setPlace(e.target.value))}
    >
        <option value="">장소 선택</option>
        <option value="숙소">숙소</option>
        <option value="음식점">음식점</option>
        <option value="음식점">관광지</option>
    </select>

  <input
    className="plannerTitle_input"
    type="text"
    value={planner.plannerTitle}
    onChange={(e) => dispatch(setPlannerTitle(e.target.value))}
    placeholder="Planner Title"
  />
  <textarea
    className="plannerDetails_input"
    value={planner.details}
    onChange={(e) => dispatch(setDetails(e.target.value))}
    placeholder="상세 일정"
  />

<div>
  <input
    className="price_input"
    type="number"
    value={planner.price}
    onChange={(e) => dispatch(setPrice(e.target.value))}
    placeholder="금액"
  />
  원
</div>

</div>

        <br />
        <div className="button_container">
          <button className="save_alert" onClick={handleSave}>
            저장하기
          </button>
          <button className="delete_alert" onClick={() => navigate("/planner")}>
            삭제하기
          </button>
        </div>
      </div>
    </Draggable>
  ) : null;
  
};

export default PlannerModal;
