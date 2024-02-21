import React from "react";
import GoogleMapComponent from "../../components/Map/GoogleMapComponent";
import MapSidebar from "../../components/Map/MapSidebar";
import { useLocation } from "react-router-dom";
import MapAuth from "../../components/Map/MapAuth";

const MapMainPage = () => {
  const location = useLocation();
  const selectedLocation = location.state?.selectedLocation;

  return (
    <>
      <MapAuth />
      <MapSidebar />

      <GoogleMapComponent selectedLocation={selectedLocation} />
    </>
  );
};

export default MapMainPage;
