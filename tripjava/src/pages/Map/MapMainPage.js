import React from 'react';
import GoogleMapComponent from '../../components/Map/GoogleMapComponent';
import MapSidebar from '../../components/Map/MapSidebar';

const MapMainPage = () => {
  return (
    <>
      <MapSidebar />
      <GoogleMapComponent />
    </>
  );
};

export default MapMainPage;
