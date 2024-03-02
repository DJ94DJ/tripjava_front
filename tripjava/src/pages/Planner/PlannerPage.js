import React, { useEffect } from 'react';
import '../../styles/style.scss';
import PlannerPins from '../../components/Planner/PlannerPins';
import PlannerMemo from '../../components/Planner/PlannerMemo';
import PlannerLine from '../../components/Planner/PlannerLine';
import PlannerTable from '../../components/Planner/PlannerTable';
import KakaoShare from '../../components/Planner/KakaoShare';
import TestPlannerTable2 from '../../components/Planner/TestPlannerTable2';
import TestPlannerTable3 from '../../components/Planner/TestPlannerTable3';
import TestPlannerTableLily from '../../components/Planner/TestPlannerTableLily';

import { clearPlannerId } from '../../store/actions/plannerid';
import { useDispatch, useSelector } from 'react-redux';

const PlannerPage = () => {
  const dispatch = useDispatch();
  const plannerId = useSelector((state) => {
    console.log('전체', state); // 전체 상태를 출력합니다.
    return state.planner.plannerId; // plannerId를 가져옵니다.
  });

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 값 삭제 실행.
    return () => {
      dispatch(clearPlannerId());
    };
  }, [dispatch]);

  return (
    <>
      <br />
      <br />
      <div className="planner_page_all">
        <div className="kakaoshare_top">
          <KakaoShare />
        </div>
        {/* <h2>(지역명) 여행 ?박</h2> */}
        <div className="pins_and_block">
          <PlannerPins />
          <PlannerMemo planner_no={plannerId} />
        </div>
        <h2>여행지 목록</h2>
        <div>
          <PlannerLine planner_no={plannerId} />
        </div>
        <h2>일정표</h2>
        <div>
          {/* <PlannerTable planner_no={plannerId} /> */}
          <TestPlannerTableLily planner_no={plannerId} />
          {/* 가져온 plannerId를 PlannerTable 컴포넌트에 전달합니다. */}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default PlannerPage;
