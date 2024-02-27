// import {
//   ADD_ROUTE,
//   RESET_ROUTE,
//   REMOVE_ROUTE,
//   REMOVE_SPOT,
//   TODAY_TRIP_DATA,
//   ALL_TRIP_DATA,
// } from '../actions/triproute';

// const initialState = {
//   routes: [], // 마커 정보를 저장할 배열
//   tripData: {},
// };

// const triprouteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_ROUTE:
//       return {
//         ...state,
//         routes: [...state.routes, action.payload],
//       };
//     case RESET_ROUTE:
//       return {
//         ...state,
//         routes: [],
//       };
//     case REMOVE_ROUTE:
//       return {
//         ...state,
//         routes: state.routes.filter((route) => route.id !== action.payload),
//       };

//     case 'ADD_SPOT':
//       const { selectedDate: date, spot } = action.payload;
//       const currentData = state.tripData[date] || {
//         spots: [],
//       }; // 현재 날짜의 데이터를 가져오거나 초기값 설정
//       return {
//         ...state,
//         tripData: {
//           ...state.tripData,
//           [date]: {
//             ...currentData,
//             spots: [...currentData.spots, spot], // 기존 spots에 새 spot 추가
//           },
//         },
//       };
//     case REMOVE_SPOT:
//       const { selectedDate, id } = action.payload;
//       // selectedDate에 해당하는 데이터가 없는 경우를 처리
//       if (!state.tripData[selectedDate]) {
//         console.error(`No data found for date: ${selectedDate}`);
//         return state; // 현재 상태를 그대로 반환
//       }
//       const updatedSpots = state.tripData[selectedDate].spots.filter(
//         (spot) => spot.id !== id
//       );
//       return {
//         ...state,
//         tripData: {
//           ...state.tripData,
//           [selectedDate]: {
//             ...state.tripData[selectedDate],
//             spots: updatedSpots,
//           },
//         },
//       };

//     // case TODAY_TRIP_DATA:
//     //   return {
//     //     ...state,
//     //     tripData: action.payload,
//     //   };

//     case 'TODAY_TRIP_DATA':
//       const { selectedToday, selectedRoute, selectedSpot } = action.payload;
//       // 이미 저장된 날짜의 데이터가 있는지 확인
//       const existingDateData = state.tripData[selectedToday] || {};

//       // 새로운 데이터와 기존 데이터를 병합
//       const updatedDateData = {
//         ...existingDateData,
//         selectedRoute: selectedRoute || existingDateData.selectedRoute,
//         selectedSpot: selectedSpot
//           ? [...(existingDateData.selectedSpot || []), ...selectedSpot]
//           : existingDateData.selectedSpot,
//       };

//       return {
//         ...state,
//         tripData: {
//           ...state.tripData,
//           [selectedToday]: updatedDateData,
//         },
//       };

//     case ALL_TRIP_DATA:
//       return {
//         ...state,
//         tripData: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default triprouteReducer;
