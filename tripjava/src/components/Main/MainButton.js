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
  const navigate = useNavigate(); // 페이지 이동을 위한 hook!!!

  // 선택된 지역을 처리하는 함수
  const handleSelectRegion = (selectedRegionName) => {
    const selectedRegion = regions.find(
      (region) => region.name === selectedRegionName
    );
    if (selectedRegion) {
      navigate('/date', {
        state: {
          selectedLocation: {
            lat: selectedRegion.lat,
            lng: selectedRegion.lng,
          },
        },
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

  // // 외부 클릭 감지를 위한 함수
  // useEffect(() => {
  //   setFilteredLocations(
  //     regions.filter((location) =>
  //       location.toLowerCase().includes(inputValue.toLowerCase())
  //     )
  //   );
  // }, [inputValue]);

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
          <button className="main_btn" onClick={() => setShowSearch(true)}>
            TRIPJAVA 시작하기
            {/* <img
              src="/static/logo_trip_java_pin.svg"
              alt="pin"  
              className="pin"
            /> */}
          </button>
        ) : (
          <Combobox
            className="main_combobox_container"
            onSelect={handleSelectRegion} // 여기서 onSelect 이벤트를 handleSelectRegion 함수와 연결
            aria-labelledby="combobox-label"
          >
            <ComboboxInput
              placeholder="어디로 떠나고 싶나요?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <ComboboxPopover
              className="main_combobox_list"
              style={{ top: 255 }}
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
  );
};

export default MainButton;
