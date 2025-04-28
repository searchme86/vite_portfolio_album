// src/api/axiosInterceptor.js
import axiosInstance from './axiosSetup.js';

// 1. Axios 인터셉터 설정 함수
// 2. 토큰을 매개변수로 받아 요청에 추가
export const setupAxiosInterceptors = (getToken) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken(); // 1. 매개변수로 받은 getToken 함수 호출
      // 2. 외부에서 주입된 토큰 가져오기
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // 1. 헤더에 토큰 추가
        // 2. 인증이 필요한 요청에 토큰 포함
        console.log('Token added to request:', token); // 1. 디버깅용 로그
        // 2. 토큰이 제대로 추가되었는지 확인
      } else {
        console.log('No token available'); // 1. 디버깅용 로그
        // 2. 토큰이 없는 경우 확인
      }
      return config;
    },
    (error) => {
      console.log('Request interceptor error:', error); // 1. 디버깅용 로그
      // 2. 요청 인터셉터 에러 확인
      return Promise.reject(error);
    }
  );

  // 1. Axios 응답 인터셉터 설정
  // 2. 응답 에러를 처리
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('Response interceptor error:', error); // 1. 디버깅용 로그
      // 2. 응답 에러 확인
      return Promise.reject(error);
    }
  );
};

export default axiosInstance; // 1. 설정된 Axios 인스턴스 내보내기
// 2. 다른 파일에서 사용 가능
