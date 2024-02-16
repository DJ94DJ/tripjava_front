// '@react-google-maps/api'; 라이브러리 사용!

import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import '../../styles/style.scss';

function GoogleMapComponent() {
  // 현재 위치
  const [map, setMap] = useState(null);
  const center = {
    lat: 37.5336766,
    lng: 126.9632199,
  };

  const options = {
    zoom: 18,
    mapTypeId: 'roadmap',
  };

  // 지도를 불러오는 함수
  // isLoaded, loadError를 return 한다.
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // google maps 에서 받은 api key를 전달한다.
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // 지도를 그릴때 동작하는 함수
  // center 값이나 옵션이 리렌더링에 영향을 받지 않게 하기 위해 useCallback으로 감싸준다.
  // google map의 instance를 사용할 수 있다.
  const onLoad = useCallback((map) => {
    console.log('use map instance', map);
    map.setCenter(center);
    map.setOptions(options);
    map.setHeading(90);
  }, []);

  return (
    isLoaded && (
      <GoogleMap
        id="google-map-test"
        mapContainerStyle={{ height: '100vh', width: '100%' }} // width와 height 는 반드시 지정해줘야 한다.
        onLoad={onLoad}
        options={{
          // 위성타입 변환 버튼 없애기
          mapTypeControl: false,
          // 지도 전체화면 버튼 없애기
          fullscreenControl: false,
        }}
      >
        <Marker />
      </GoogleMap>
    )
  );
}

export default React.memo(GoogleMapComponent);
