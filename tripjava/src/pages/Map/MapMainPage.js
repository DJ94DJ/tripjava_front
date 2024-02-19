import React from 'react';
import GoogleMapComponent from '../../components/Map/GoogleMapComponent';
import MapSidebar from '../../components/Map/MapSidebar';
import MapSearchBox from '../../components/Map/MapSearchBox';

const MapMainPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      {/* <MapSidebar /> */}
      {/* <MapSearchBox /> */}
      <GoogleMapComponent />
    </>
  );
};

export default MapMainPage;
