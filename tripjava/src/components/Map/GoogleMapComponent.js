import { useState, useCallback, useRef } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { FaLocationCrosshairs } from 'react-icons/fa6';

const center = {
  lat: 37.5336766,
  lng: 126.9632199,
};

const GoogleMapComponent = () => {
  const [map, setMap] = useState(/** @type google.maps.google.map */ (null));
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // 사용할 구글 api 라이브러리를 아래에 추가!
    libraries: ['places'],
  });

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (!isLoaded) return 'Loading Maps';

  return (
    <>
      {/* <button onClick={() => map.panTo(center)}>
        <FaLocationCrosshairs />
      </button> */}
      <GoogleMap
        center={center}
        zoom={9}
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        // onClick={onMapClick}
        onLoad={onMapLoad}
        // onLoad={(map) => setMap(map)}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default GoogleMapComponent;
