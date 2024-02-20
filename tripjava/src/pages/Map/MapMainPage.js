import React from 'react';
import GoogleMapComponent from '../../components/Map/GoogleMapComponent';
import MapSidebar from '../../components/Map/MapSidebar';
import { useLocation } from 'react-router-dom';

const MapMainPage = () => {
  const location = useLocation();
  const selectedLocation = location.state?.selectedLocation;

  return (
    <>
      <MapSidebar />
      <GoogleMapComponent selectedLocation={selectedLocation} />
    </>
  );
};

export default MapMainPage;
