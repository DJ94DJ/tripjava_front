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

const sc = {
  lat: 38.2073706,
  lng: 128.5922597,
};

const MainButton = () => {
  const [showSearch, setShowSearch] = useState(false); // 검색창 표시 상태
  const [inputValue, setInputValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(regions);
  const containerRef = useRef();

  // 외부 클릭 감지를 위한 함수

  useEffect(() => {
    setFilteredLocations(
      regions.filter((location) =>
        location.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue]);

  return (
    <div className="main_container" ref={containerRef}>
      <div className="main_explainbox">
        <h1>
          행복한 여행의 첫 시작,
          <br />
          TRIPJAVA와 함께
        </h1>
        <h4>TRIPJAVA를 사용해 여행 계획을 손쉽게 세워보세요!</h4>
      </div>
      <div className="main_buttonbox">
        {!showSearch ? (
          <button className="main_clickbtn" onClick={() => setShowSearch(true)}>
            TRIPJAVA 시작하기
            <img
              src="/static/logo_trip_java_pin.svg"
              alt="pin"
              className="pin"
            />
          </button>
        ) : (
          // 원본
          // <Combobox
          //   className="main_combobox_container"
          //   onSelect={(item) => setInputValue(item)}
          //   aria-labelledby="combobox-label"
          // >
          <Combobox
            onSelect={(item) => {
              setInputValue(item);
              if (item === '속초') {
                props.setSelectedLocation(sc); // sc는 속초의 위도와 경도를 가진 객체
              }
            }}
          >
            <ComboboxInput
              placeholder="어디로 떠나고 싶나요?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <ComboboxPopover>
              <ComboboxList>
                {filteredLocations.map((location, index) => (
                  <ComboboxOption key={index} value={location} />
                ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        )}
      </div>
    </div>
  );
};

export default MainButton;
