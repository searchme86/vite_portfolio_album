// //====여기부터 수정됨====
// // useUploadAuth 훅: ImageKit 인증 처리
// // 단일 책임: 인증 파라미터 요청 및 반환
// import axios from 'axios';
// import { useAuth } from '@clerk/clerk-react';
// import { toast } from 'react-toastify';

// // 훅 정의
// // ImageKit 인증 파라미터를 가져오는 기능
// function useUploadAuth() {
//   // useAuth 훅으로 인증 토큰 가져오기
//   // Clerk를 통해 사용자 인증 처리
//   const auth = useAuth();
//   // auth가 객체인지 확인
//   const safeAuth = typeof auth === 'object' && auth !== null ? auth : {};
//   // 디버깅: safeAuth 확인
//   // auth가 올바르게 처리되었는지 확인
//   console.log('useUploadAuth - safeAuth:', safeAuth);

//   const { getToken } = safeAuth;
//   // getToken이 함수인지 확인
//   const safeGetToken =
//     typeof getToken === 'function' ? getToken : async () => '';
//   // 디버깅: safeGetToken 확인
//   // 함수가 올바르게 설정되었는지 확인
//   console.log('useUploadAuth - safeGetToken:', safeGetToken);

//   // 인증 파라미터 요청 함수
//   // axios를 사용해 서버에서 인증 정보 가져오기
//   const fetchAuthParams = async () => {
//     try {
//       // 토큰 가져오기
//       // Clerk의 getToken 메서드 사용
//       const token = await safeGetToken();
//       // token이 문자열인지 확인
//       const safeToken = typeof token === 'string' ? token : '';
//       // 디버깅: safeToken 값 확인
//       // token이 올바르게 생성되었는지 확인
//       console.log('useUploadAuth - safeToken:', safeToken);

//       // VITE_API_URL이 문자열인지 확인
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const safeApiUrl =
//         typeof apiUrl === 'string' ? apiUrl : 'http://localhost:3000';
//       // 디버깅: safeApiUrl 확인
//       // URL이 올바르게 설정되었는지 확인
//       console.log('useUploadAuth - safeApiUrl:', safeApiUrl);

//       // 서버에 인증 파라미터 요청
//       // safeApiUrl 사용
//       const res = await axios.get(`${safeApiUrl}/posts/upload-auth`, {
//         headers: { Authorization: `Bearer ${safeToken}` },
//       });
//       // res가 객체인지 확인
//       const safeRes = typeof res === 'object' && res !== null ? res : {};
//       // 디버깅: safeRes 확인
//       // 응답이 올바른지 확인
//       console.log('useUploadAuth - safeRes:', safeRes);

//       // res.data가 객체인지 확인
//       const authParams =
//         typeof safeRes.data === 'object' && safeRes.data !== null
//           ? safeRes.data
//           : {};
//       // 디버깅: authParams 값 확인
//       // 서버 응답이 올바른지 확인
//       console.log('useUploadAuth - authParams:', authParams);

//       // 인증 파라미터 반환
//       // 객체 형태로 반환
//       return authParams;
//     } catch (error) {
//       // 에러 처리
//       // 콘솔과 toast로 사용자에게 알림
//       console.error(
//         'useUploadAuth - Failed to fetch ImageKit auth params:',
//         error
//       );
//       toast.error('Failed to fetch ImageKit authentication parameters');
//       throw error;
//     }
//   };

//   // fetchAuthParams 함수 반환
//   // 컴포넌트에서 호출 가능
//   return { fetchAuthParams };
// }

// // 훅 내보내기
// // 다른 파일에서 import하여 사용할 수 있도록 모듈화
// export default useUploadAuth;
// //====여기까지 수정됨====
