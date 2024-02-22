import React, { useState } from 'react';

const PlannerBlock = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() === '') {
      return;
    }
    const updatedItems = [...items, { text: newItem, checked: false }];
    setItems(updatedItems);
    setNewItem('');
    fetch('http://localhost:8080/planner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItems),
    });
  };

  const toggleItem = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
    fetch(`http://localhost:8080/planner/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItems[index]),
    });
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    fetch(`http://localhost:8080/planner/${index}`, {
      method: 'DELETE',
    });
  };

  return (
    <div className="test_PlannerBlock">
      <div className="content">
        <div className="planner_title">준비물 체크리스트 ✅</div>
        <hr />
        <div className="item-notice">
          * 준비물 이름을 더블클릭하면 삭제됩니다.
        </div>
        {items.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(index)}
            />
            <span onDoubleClick={() => deleteItem(index)} className="item-text">
              {item.text}
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

export default PlannerBlock;
