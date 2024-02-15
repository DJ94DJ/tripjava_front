import React from 'react';
import MapPlanner from '../../components/Map/MapPlanner';
import GoogleMap from '../../components/Map/GoogleMapComponent';

const MapMainPage = () => {
  return (
    <>
      <div>MapMainPage</div>
      <MapPlanner />
      <GoogleMapComponent />
    </>
  );
};

export default MapMainPage;
