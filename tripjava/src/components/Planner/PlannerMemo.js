import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TbSquareCheckFilled } from 'react-icons/tb';

const PlannerMemo = ({ planner_no }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    // 체크리스트 확인
    axios
      .get(
        `${process.env.REACT_APP_HOST}/planner/checklist/select/${planner_no}`
      )
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  const addItem = () => {
    if (newItem.trim() === '') {
      return;
    }

    const ingredient = newItem.split(' ')[0];
    const newChecklist = {
      text: newItem,
      checked: false,
      ingredient,
      planner_no,
    };

    // 체크리스트 저장
    axios
      .post(
        `${process.env.REACT_APP_HOST}/planner/checklist/add/${planner_no}`,
        newChecklist
      )
      .then((response) => {
        axios
          .get(
            `${process.env.REACT_APP_HOST}/planner/checklist/select/${planner_no}`
          )
          .then((response) => {
            setItems(response.data);
          })
          .catch((error) => {
            console.error('조회 에러!', error);
          });

        setNewItem('');
      });
  };

  const toggleItem = (index) => {
    const newItems = [...items];
    newItems[index].ingredient_check = !newItems[index].ingredient_check;
    setItems(newItems);

    // 체크리스트 수정
    axios
      .put(
        `${process.env.REACT_APP_HOST}/planner/checklist/${newItems[index].checklist_no}`,
        newItems[index]
      )
      .catch((error) => {
        console.error('업데이트 에러!', error);
      });
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    // 체크리스트 삭제
    axios
      .delete(
        `${process.env.REACT_APP_HOST}/planner/checklist/${items[index].checklist_no}`
      )
      .then((response) => {
        setItems(newItems);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="test_PlannerBlock">
      <div className="content">
        <div className="planner_title">
          <TbSquareCheckFilled />
          &nbsp; 준비물 체크리스트
        </div>
        <hr />
        <div className="item-notice">
          * 준비물 이름을 더블클릭하면 삭제됩니다.
        </div>
        {items.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={item.ingredient_check}
              onChange={() => toggleItem(index)}
            />
            <span onDoubleClick={() => deleteItem(index)} className="item-text">
              {item.ingredient}
            </span>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addItem();
            }
          }}
        />
        <button onClick={addItem}>추가하기</button>
      </div>
    </div>
  );
};

export default PlannerMemo;
