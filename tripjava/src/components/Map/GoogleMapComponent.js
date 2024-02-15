import React, { useCallback } from 'react';
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from '@vis.gl/react-google-maps';

function GoogleMapComponent() {
  const position = { lat: 61.2176, lng: -149.8997 };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
        <Map center={position} zoom={10}></Map>
      </APIProvider>
    </div>
  );
}

export default GoogleMapComponent;
