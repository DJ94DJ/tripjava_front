import React from "react";
import "../../styles/style.scss";
import PlannerPins from "../../components/Planner/PlannerPins";
import PlannerBlock from "../../components/Planner/PlannerBlock";
import PlannerLine from "../../components/Planner/PlannerLine";
import PlannerTable from "../../components/Planner/PlannerTable";

const PlannerPage = () => {
  return (
    <>
      <br />
      <br />
      <div className="planner_page_all">
        <div>PlannerPage</div>

        <h1>(지역명) 여행 ?박</h1>
        <div className="pins_and_block">
          <PlannerPins />
          <PlannerBlock />
        </div>
        <h1>여행지 목록</h1>
        <div>
          <PlannerLine />
        </div>
        <h1>일정표</h1>
        <div>
          <PlannerTable />
        </div>
      </div>
    </>
  );
};

export default PlannerPage;
