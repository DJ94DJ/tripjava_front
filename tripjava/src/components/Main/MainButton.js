import React, { useState, useRef, useEffect } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import '../../styles/style.scss';
import regions from './MainRegion';
import { useNavigate } from 'react-router-dom';

const MainButton = () => {
  const [showSearch, setShowSearch] = useState(false); // 검색창 표시 상태
  const [inputValue, setInputValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(regions);
  const containerRef = useRef();
  const navigate = useNavigate();

  // 선택된 지역을 처리하는 함수
  const handleSelectRegion = (selectedRegionName) => {
    const selectedRegion = regions.find(
      (region) => region.name === selectedRegionName
    );
    if (selectedRegion) {
      navigate('/date', {
        state: { selectedRegionName: selectedRegion.name },
      });
    } else {
      alert('선택한 지역이 목록에 없습니다.');
    }
  };

  // 사용자 입력에 따라 지역 목록 필터링
  useEffect(() => {
    const filtered = regions.filter((region) =>
      region.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [inputValue]);

  return (
    <div className="main_container" ref={containerRef}>
      <div className="main_explainbox">
        <h1>
          행복한 여행의 시작,
          <br />
          TRIPJAVA와 함께!
        </h1>
        <h4>TRIPJAVA를 사용해 여행 계획을 손쉽게 세워보세요!</h4>
        <div className="main_buttonbox">
          {!showSearch ? (
            <button
              className={`main_btn ${showSearch ? 'main_btn--hidden' : ''}`}
              onClick={() => setShowSearch(true)}
            >
              TRIPJAVA 시작하기
            </button>
          ) : (
            <Combobox
              className={`main_combobox_container ${
                showSearch ? 'main_combobox_container--animated' : ''
              }`}
              onSelect={handleSelectRegion}
              aria-labelledby="combobox-label"
            >
              <ComboboxInput
                placeholder="어디로 떠나고 싶나요?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <ComboboxPopover
                className="main_combobox_list"
                style={{
                  top: 345,
                  border: 'none',
                  paddingLeft: 10,
                  fontSize: 18,
                }}
              >
                <ComboboxList>
                  {filteredLocations.map((location, index) => (
                    <ComboboxOption key={index} value={location.name} />
                  ))}
                </ComboboxList>
              </ComboboxPopover>
            </Combobox>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainButton;
