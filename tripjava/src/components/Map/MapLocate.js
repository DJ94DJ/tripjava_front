// Locate.js
import React from 'react';

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
      현재 위치
    </button>
  );
}
