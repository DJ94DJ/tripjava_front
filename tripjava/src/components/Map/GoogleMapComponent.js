import { useState, useCallback, useRef, useEffect } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { MapLocate } from './MapLocate';
import { MapSearch } from './MapSearch';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const center = {
  lat: 37.5336766,
  lng: 126.9632199,
};

const GoogleMapComponent = ({ selectedLocation }) => {
  const location = useLocation();
  const [map, setMap] = useState(/** @type google.maps.google.map */ (null));
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const mapRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const onMapClick = useCallback((e) => {
    const clickedLatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setMarkers((current) => [
      ...current,
      {
        lat: clickedLatLng.lat,
        lng: clickedLatLng.lng,
        time: new Date(),
      },
    ]);

    // 마커를 생성할 때 동시에 선택된 마커로 설정
    setSelected({
      lat: clickedLatLng.lat,
      lng: clickedLatLng.lng,
      time: new Date(),
    });
  }, []);

  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
        panTo({
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        });
      } else {
        // selectedLocation이 유효하지 않은 경우, 지도의 중심을 기본 위치로 설정
        console.log(
          'selectedLocation is undefined or does not have lat, lng properties'
        );
        panTo(center); // center는 지도의 기본 중심 위치
      }
    },
    [selectedLocation, center]
  );

  const panTo = useCallback(({ lat, lng, zoom = 13 }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoom);
    setMarkers((current) => [
      ...current,
      {
        lat,
        lng,
        time: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    // MapDate 페이지에서 전달받은 locations 상태를 사용합니다.
    if (location.state?.locations) {
      console.log('location.state.locations:', location.state.locations);
      setMarkers(location.state.locations);
    }
  }, [location]);

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
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              if (selected && selected.time === marker.time) {
                setMarkers((current) =>
                  current.filter((m) => m.time !== marker.time)
                );
                setSelected(null);
              } else {
                setSelected(marker);
              }
            }}
          >
            선택된 마커에 대해서만 InfoWindow 표시
            {selected && selected.time === marker.time && (
              <InfoWindow
                position={{ lat: marker.lat, lng: marker.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div>
                  <h3>선택한 위치</h3>
                  <p>위도: {marker.lat}</p>
                  <p>경도: {marker.lng}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </>
  );
};

export default GoogleMapComponent;
