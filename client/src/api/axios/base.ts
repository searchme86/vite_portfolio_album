// frontend/api/axios/base.js
import axios from 'axios'; // 1. Axios 임포트
// 2. HTTP 요청을 위해 필요

// 1. Axios 인스턴스 생성 함수
// 2. 기본 설정을 포함한 Axios 인스턴스 반환
export const createAxiosInstance = () => {
  const apiUrl = 'http://localhost:3000'; // 1. 환경 변수에서 API URL 가져오기
  // 2. 요청 URL 구성
  if (!apiUrl) {
    throw new Error('VITE_API_URL is not defined in .env'); // 1. 환경 변수 누락 시 에러
    // 2. 디버깅 용이성 확보
  }

  const instance = axios.create({
    baseURL: apiUrl, // 1. 기본 URL 설정
    // 2. 모든 요청에 공통 URL 적용
    timeout: 5000, // 1. 요청 타임아웃 설정 (5초)
    // 2. 요청이 너무 오래 걸리지 않도록 제한
    headers: {
      'Content-Type': 'application/json', // 1. 요청 헤더 설정
      // 2. JSON 형식으로 데이터 전송
    },
  });

  return instance; // 1. 설정된 Axios 인스턴스 반환
  // 2. 다른 파일에서 사용
};
