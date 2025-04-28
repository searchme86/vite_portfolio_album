// src/api/axiosSetup.js
import axios from 'axios';

// 1. Axios 인스턴스 생성
// 2. 기본 설정을 적용한 Axios 인스턴스를 반환
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // 1. API 기본 URL 설정
  // 2. 모든 요청에 공통적으로 사용
  headers: {
    'Content-Type': 'application/json', // 1. 요청 헤더 설정
    // 2. JSON 형식으로 데이터 전송
  },
});

export default axiosInstance; // 1. Axios 인스턴스 내보내기
// 2. 다른 파일에서 사용 가능
