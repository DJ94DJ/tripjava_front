// Locate.js
import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';

export function MapLocate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              zoom: 18,
            });
          },
          () => null
        );
      }}
    >
      <FaLocationArrow />
    </button>
  );
}
