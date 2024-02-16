import React from 'react';
import GoogleMapComponent from '../../components/Map/GoogleMapComponent';
import MapSidebar from '../../components/Map/MapSidebar';
import MapSearchBox from '../../components/Map/MapSearchBox';

const MapMainPage = () => {
  return (
    <>
      <MapSidebar />
      <MapSearchBox />
      <GoogleMapComponent />
    </>
  );
};

export default MapMainPage;
