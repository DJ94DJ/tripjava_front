import { useState, useCallback, useRef, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { MapLocate } from './MapLocate';
import { MapSearch } from './MapSearch';

const center = {
  lat: 37.5336766,
  lng: 126.9632199,
};

const GoogleMapComponent = ({ selectedLocation }) => {
  const [map, setMap] = useState(/** @type google.maps.google.map */ (null));
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

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

  const mapRef = useRef();
  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (selectedLocation) {
        panTo({
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        });
      }
    },
    [selectedLocation]
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
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              if (selected && selected.time === marker.time) {
                setMarkers((current) => current.filter((m) => m.time !== marker.time));
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
