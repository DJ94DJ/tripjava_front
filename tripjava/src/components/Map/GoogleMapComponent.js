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

//  리액트-구글-맵스 라이브러리 사용
// import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

// function GoogleMapComponent() {
//   // 맵 로드시 처음으로 띄워줄 지역의 위도(latitude) 경도(longitude) 정보
//   const center = {
//     lat: 37.5511694,
//     lng: 126.9882266,
//   };

//   const options = {
//     zoom: 16,
//     mapTypeId: 'satellite', // 위성 뷰로 지정
//   };

//   // 지도를 불러오는 함수
//   // useJsApiLoader 함수는 isLoaded, loadError를 return 한다.
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     // google maps 에서 받은 api key를 전달
//     googleMapsApiKey: AIzaSyCw7H5e9P5_HZ4DYXPcLl4Qw9bXNvyTrUk,
//   });

//   // 지도를 그릴때 동작하는 함수
//   // google map의 instance를 사용할 수 있다.
//   const onLoad = useCallback((map) => {
//     map.setCenter(center);
//     map.setOptions(options);
//     map.setHeading(90);
//   }, []);

//   // 지도 컴포넌트가 언마운트 되기 전에 해야하는 동작을 아래 함수에 넣는다.
//   //   const  onUnmount={map => {
//   //     "do your stuff before map is unmounted"
//   //   }};

//   return (
//     isLoaded && (
//       <GoogleMap
//         id="google-map-test"
//         mapContainerStyle={GoogleMapStyle} // width와 height 는 반드시 지정해줘야 한다.
//       >
//         // react 18+ 의 경우에는 MarkerF 등 F가 붙은 컴포넌트를 사용해야한다.
//         <MarkerF
//           position={{ lat: 37.5511694, lng: 126.9882266 }}
//           title="marker title1"
//         />
//       </GoogleMap>
//     )
//   );
// }

// export default React.memo(GoogleMapComponent);

// const GoogleMapStyle = {
//   height: '100vh',
//   width: '100%',
// };
