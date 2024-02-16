import React from 'react';
import GoogleMapComponent from '../../components/Map/GoogleMapComponent';
import MapSidebar from '../../components/Map/MapSidebar';
import GoogleMapComponent2 from '../../components/Map/GoogleMapComponent2';

const MapMainPage = () => {
  return (
    <>
      <MapSidebar />
      <GoogleMapComponent />
      <GoogleMapComponent2 />
    </>
  );
};

export default MapMainPage;
