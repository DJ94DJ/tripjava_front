// Search.js
import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css'; // 필요에 따라 스타일시트 추가

export function MapSearch({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 37.5336766, lng: () => 126.9632199 },
      radius: 100 * 1000,
    },
  });

  return (
    <div className="search_container">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          className="combobox_input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="장소, 버스, 지하철, 주소를 검색해보세요!"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );

  async function handleSelect(address) {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng, zoom: 18 });
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  }
}
