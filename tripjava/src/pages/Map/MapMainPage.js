import React, { useState } from 'react';
import GoogleMapComponent from '../../components/Map/GoogleMapComponent';
import MapSidebar from '../../components/Map/MapSidebar';
import { useLocation } from 'react-router-dom';
import MapAuth from '../../components/Map/MapAuth';
import regions from '../../components/Main/MainRegion';

const MapMainPage = () => {
  const location = useLocation();
  const selectedRegionName = location.state?.selectedRegionName;
  const { startDate, endDate, period } = location.state || {};
  // 선택된 지역의 위도와 경도 찾기
  const selectedRegion = regions.find(
    (region) => region.name === selectedRegionName
  );

  const [routes, setRoutes] = useState([]);

  return (
    <>
      <MapAuth />
      <MapSidebar
        startDate={startDate}
        endDate={endDate}
        period={period}
        routes={routes}
      />
      <GoogleMapComponent
        selectedLocation={selectedRegion}
        setRoutes={setRoutes}
      />
    </>
  );
};

export default MapMainPage;
