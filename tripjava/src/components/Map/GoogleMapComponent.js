import { useState, useCallback, useRef, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MapLocate } from "./MapLocate";
import { MapSearch } from "./MapSearch";
import { useLocation } from "react-router-dom";
import axios from "axios";

const center = {
  lat: 37.5336766,
  lng: 126.9632199,
};

const GoogleMapComponent = () => {
  const location = useLocation();
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const mapRef = useRef();
  const [accommodations, setAccommodations] = useState([]); // 숙소 데이터 상태
  const selectedLocation = location.state?.selectedLocation;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
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
          "selectedLocation is undefined or does not have lat, lng properties"
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
    console.log(
      "컴포넌트 마운트될 때 selectedLocation 값있는지 췤",
      selectedLocation
    );
  }, [selectedLocation, panTo]);

  // selectedLocation 값이 변경될 때마다 숙소 데이터 요청
  useEffect(() => {
    if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
      const touristData = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/destination/accommodation`,
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
          console.log("이 지역 숙소 데이터 췤 :", accommodationMarkers);
        } catch (error) {
          console.error("Error fetching accommodation data:", error);
        }
      };

      touristData();
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        const elements = document.querySelectorAll(
          ".gm-style-iw.gm-style-iw-c"
        );
        elements.forEach((el) => {
          if (!el.querySelector("h3")) {
            // <h3> 태그를 가진 요소가 없는 경우에만 스타일 변경
            el.style.opacity = "0";
          }
        });
      }, 5); // 5ms 후에 스타일 변경 코드 실행
    }
  }, [selected]);

  if (!isLoaded) return "Loading Maps";

  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <MapLocate panTo={panTo} />
      <MapSearch panTo={panTo} />
      <GoogleMap
        center={center}
        zoom={9}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {accommodations.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          >
            선택된 마커에 대해서만 InfoWindow 표시
            {selected && selected.time === marker.time && (
              <InfoWindow
                position={{ lat: marker.lat, lng: marker.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div>
                  <h3>{selected.title}</h3>
                  <p>{selected.addr1}</p>
                  <p>위도: {marker.lat}</p>
                  <p>경도: {marker.lng}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </>
  );
};

export default GoogleMapComponent;
