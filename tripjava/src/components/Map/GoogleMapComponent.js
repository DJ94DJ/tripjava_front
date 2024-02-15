import React, { useCallback } from 'react';
// 구글 정식 맵스 라이브러리 사용

function App() {
  const position = { lat: 61.2176, lng: -149.8997 };

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <Map center={position} zoom={10}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

export default App;
