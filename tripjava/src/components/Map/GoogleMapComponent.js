import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { MapLocate } from './MapLocate';
import { MapSearch } from './MapSearch';
import { useLocation } from 'react-router-dom';
import { HomePinSvg } from './PinSvg';
import ReactDOMServer from 'react-dom/server';
import svgToMiniDataURI from 'mini-svg-data-uri';
import axios from 'axios';
import MapStyle from './MapStyle';
import { PiSealCheckFill } from 'react-icons/pi';
import { v4 as uuidv4 } from 'uuid';

const svgString = ReactDOMServer.renderToStaticMarkup(<HomePinSvg />);
const svgUrl = svgToMiniDataURI(svgString);

// console.log(' 사진 :', svgUrl);

const center = {
  lat: 37.5336766,
  lng: 126.9632199,
};

const GoogleMapComponent = ({ startDate, setRoutes, tripData }) => {
  const location = useLocation();
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const mapRef = useRef();
  const [accommodations, setAccommodations] = useState([]); // 숙소 데이터 상태
  const selectedLocation = location.state?.selectedLocation;
  const [selectedDate, setSelectedDate] = useState(null);
  const [map, setMap] = useState(null);
  const [markerAnimation, setMarkerAnimation] = useState(null);

  // tripData에서 모든 selectedSpot의 위치 데이터를 추출하기!!
  const allSelectedSpots = Object.values(tripData).flatMap(
    (day) => day.selectedSpot
  );
  // console.log('위치 데이터 추출', allSelectedSpots);

  const allSelectedRoutes = Object.values(tripData).flatMap(
    (day) => day.selectedRoute
  );
  useEffect(() => {
    // console.log('여기는 gmc 잘 보이세요?', tripData);
    // console.log('위치 데이터 갖고오기', tripData.selectedSpot);
  }, [tripData]); // tripData가 변경될 때마다 이 useEffect가 실행됨

  const onMarkerClick = (marker) => {
    setRoutes([{ ...marker, id: uuidv4() }]);
    // console.log('마커 정보 로깅:', marker);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const onMapClick = useCallback((e) => {
    const clickedLatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setMarkers((current) => [
      ...current,
      {
        lat: clickedLatLng.lat,
        lng: clickedLatLng.lng,
        time: new Date(),
      },
    ]);

    // 마커를 생성할 때 동시에 선택된 마커로 설정
    setSelected({
      lat: clickedLatLng.lat,
      lng: clickedLatLng.lng,
      time: new Date(),
    });
  }, []);

  // 맵 불러올 때 load 되는 위치
  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
        panTo({
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        });
      } else {
        // selectedLocation이 유효하지 않은 경우, 지도의 중심을 기본 위치로 설정
        console.log(
          'selectedLocation is undefined or does not have lat, lng properties'
        );
        panTo(center);
      }
    },
    [selectedLocation, center]
  );

  const panTo = useCallback(({ lat, lng, zoom = 13 }) => {
    if (mapRef.current) {
      // mapRef.current가 존재하는지 확인
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(zoom);
      setMarkers((current) => [
        ...current,
        {
          lat,
          lng,
          time: new Date(),
        },
      ]);
    }
  }, []);

  // 지역 선택한 거 지도에 반영되도록 useEffect!
  useEffect(() => {
    if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
      panTo({
        // 지도를 main에서 받아온 지역위치로 이동
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        zoom: 15, // 지역위치 불러올 때 지도 zoom값
      });
    }
    // console.log(
    //   '컴포넌트 마운트될 때 selectedLocation 값있는지 췤',
    //   selectedLocation
    // );
  }, [selectedLocation, panTo]);

  // selectedLocation 값이 변경될 때마다 숙소 데이터 요청
  useEffect(() => {
    if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
      const touristData = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_HOST}/destination/accommodation`,
            // `http://localhost:8080/destination/accommodation`,
            {
              params: {
                mapx: selectedLocation.lng,
                mapy: selectedLocation.lat,
              },
            }
          );
          // 숙소 데이터를 마커 데이터로 변환
          const accommodationMarkers = res.data.accommodations.map(
            (accommodation) => ({
              lat: Number(accommodation.mapy),
              lng: Number(accommodation.mapx),
              addr1: accommodation.addr1,
              contentid: accommodation.contentid,
              title: accommodation.title,
              time: new Date(), // 이 속성은 필요 없
              time: new Date(),
            })
          );
          setAccommodations(accommodationMarkers); // 숙소 데이터 상태 업데이트
          // console.log('이 지역 숙소 데이터 췤 :', accommodationMarkers);
        } catch (error) {
          console.error('Error fetching accommodation data:', error);
        }
      };

      touristData();
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        const elements = document.querySelectorAll(
          '.gm-style-iw.gm-style-iw-c'
        );
        elements.forEach((el) => {
          if (!el.querySelector('h3')) {
            // <h3> 태그를 가진 요소가 없는 경우에만 스타일 변경
            el.style.opacity = '0';
          }
        });
      }, 5); // 5ms 후에 스타일 변경 코드 실행
    }
  }, [selected]);

  useEffect(() => {
    if (startDate) {
      setSelectedDate(startDate);
    }
  }, [startDate]);

  const toggleBounce = () => {
    setMarkerAnimation((prevAnimation) =>
      prevAnimation === null ? window.google.maps.Animation.BOUNCE : null
    );
  };

  if (!isLoaded) return 'Loading Maps';
  return (
    <>
      <MapLocate panTo={panTo} />
      <MapSearch panTo={panTo} />
      <GoogleMap
        center={center}
        zoom={9}
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          styles: MapStyle(),
        }}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {accommodations.map((marker, index) => (
          <Marker
            icon={{
              url: '/static/home_marker.svg',
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
              onMarkerClick(marker);
            }}
            animation={2}
          >
            {/* 선택된 마커에 대해서만 InfoWindow 표시 */}
            {selected && selected.time === marker.time && (
              <InfoWindow
                position={{ lat: marker.lat, lng: marker.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="infoWindow">
                  <div className="infoWindow_header">
                    <h3 style={{ display: 'inline' }}>
                      {/* "[한국관광 품질인증/Korea Quality]"가 있으면 제거 */}
                      {marker.title
                        .replace('[한국관광 품질인증/Korea Quality]', '')
                        .trim()}
                    </h3>
                    {/* "[한국관광 품질인증/Korea Quality]"가 있으면 아이콘 추가 */}
                    {marker.title.includes(
                      '[한국관광 품질인증/Korea Quality]'
                    ) && (
                      <img
                        src="/static/mark3.jpeg"
                        alt="mark"
                        className="mark"
                        style={{ display: 'inline' }}
                      />
                    )}
                  </div>
                  <p>{selected.addr1}</p>
                  {/* <p>위도: {marker.lat}</p>
                  <p>경도: {marker.lng}</p> */}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
        {allSelectedSpots.map((spot) => (
          <Marker
            key={spot.id}
            position={{
              lat: parseFloat(spot.mapy),
              lng: parseFloat(spot.mapx),
            }}
            icon={{
              // contenttypeid 값에 따라 다른 아이콘 URL 설정
              url:
                spot.contenttypeid === '39'
                  ? '/static/meal_marker.svg' // contenttypeid가 39일 경우
                  : spot.contenttypeid === '12'
                  ? '/static/place_marker.svg' // contenttypeid가 12일 경우
                  : '/static/default_icon.svg', // 그 외 기본 아이콘
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            animation={2}
          />
        ))}
        {allSelectedRoutes.map((route) => (
          <Marker
            key={route.id}
            position={{
              lat: parseFloat(route.lat),
              lng: parseFloat(route.lng),
            }}
            icon={{
              url: '/static/selected_home_marker.svg',
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}
      </GoogleMap>
    </>
  );
};

// contenttypeid
// 12 : 관광지
// 32 : 숙소
// 39 : 음식점
export default GoogleMapComponent;
