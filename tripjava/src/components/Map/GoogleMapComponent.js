import { useState } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
} from '@react-google-maps/api';
import { FaLocationCrosshairs } from 'react-icons/fa6';

const center = {
  lat: 37.5336766,
  lng: 126.9632199,
};

const GoogleMapComponent = () => {
  const [map, setMap] = useState(/** @type google.maps.google.map */ (null));

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // 구글 api 라이브러리를 아래에 추가!
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <div>loading.....</div>;
  }

  return (
    <>
      <button onClick={() => map.panTo(center)}>
        <FaLocationCrosshairs />
      </button>
      <GoogleMap
        center={center}
        zoom={9}
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      ></GoogleMap>
      <input
        id="origin-input"
        type="text"
        placeholder="Origin"
        value={origin}
      />
    </>
  );
};

export default GoogleMapComponent;
