import React from 'react';
import GoogleMapComponent from '../../components/Map/GoogleMapComponent';
import MapSidebar from '../../components/Map/MapSidebar';
import MapSearchBox from '../../components/Map/MapSearchBox';
import MapTest from '../../components/Map/MapTest';

const MapMainPage = () => {
  return (
    <>
      <MapSidebar />
      <MapSearchBox />
      <MapTest />
      <GoogleMapComponent />
    </>
  );
};

export default MapMainPage;
