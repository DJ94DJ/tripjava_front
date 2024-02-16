// import { useState, useEffect } from 'react';

// // 버튼 누르면 현재 사용자의 위도 경도 추출
// // 출
// // 받은 사용자의 위도 경도를 구글 맵 api 센터 위도경도에 넣으면 될거같은디..@.@..

// const useGeoLocation = () => {
//     const [location, setLocation] = useState<ILocation>()
//     const [error, setError] = useState('')

//     const handleSuccess = () => {
//       const { latitude, longitude } = pos.coords

//       setLocation({
//         latitude,
//         longitude,
//       })
//     }

//     const handleError = () => {
//       setError(err.message)
//     }

//     useEffect(() => {
//       const { geolocation } = navigator

//       if (!geolocation) {
//         setError('Geolocation is not supported.')
//         return
//       }

//       geolocation.getCurrentPosition(handleSuccess, handleError, options)
//     }, [options])

//     return { location, error }
//   }

// export default useGeoLocation;
