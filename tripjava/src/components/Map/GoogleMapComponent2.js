import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

export default function GoogleMapComponent2() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <map />;
}

function Map() {
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lmg: -80 }}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}
