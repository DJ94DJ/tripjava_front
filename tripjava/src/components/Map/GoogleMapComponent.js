import { useState, useCallback, useRef } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { MapLocate } from './MapLocate';
import { MapSearch } from './MapSearch';

const center = {
  lat: 37.5336766,
  lng: 126.9632199,
};

const GoogleMapComponent = () => {
  const [map, setMap] = useState(/** @type google.maps.google.map */ (null));
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // 사용할 구글 api 라이브러리를 아래에 추가!
    libraries: ['places'],
  });

  // const onMapClick = useCallback((e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // 검색결과, 현재위치 시 줌값 : 9 -> 각 컴포넌트로 가서 줌값 세부 조절
  const panTo = useCallback(({ lat, lng, zoom = 9 }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoom);
    setMarkers((current) => [
      // ...current,
      {
        lat,
        lng,
        time: new Date(),
      },
    ]);
  }, []);

  if (!isLoaded) return 'Loading Maps';

  return (
    <>
      <MapLocate panTo={panTo} />
      <MapSearch panTo={panTo} />
      <GoogleMap
        center={center}
        zoom={9}
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        // 지도 클릭시 핑찍히게 하려면 아래 온클릭 활성화.. 근데 안하는게 나을듯..ㅠ
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default GoogleMapComponent;
