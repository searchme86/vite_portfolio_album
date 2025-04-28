// src/api/base/axiosBase.js

import axios from 'axios'; // 의미: axios 라이브러리 가져오기
// 이유: HTTP 요청 처리
// 비유: 도서관에서 요청서를 처리하는 기본 도구

import { combineInterceptors } from '../interceptor/combineInterceptors'; // 의미: 인터셉터 결합 함수 가져오기
// 이유: 요청 및 응답 인터셉터 설정
// 비유: 도서관에서 요청서 처리 전후 규칙 설정

import { getOrCreateCsrfToken } from '../utils/csrfTokenUtil'; // 의미: CSRF 토큰 유틸 가져오기 <!---여기추가
// 이유: 모든 요청에 CSRF 토큰 포함
// 비유: 도서관에서 요청서에 인증 코드 추가

// 의미: 기본 axios 인스턴스 생성
// 이유: 모든 API 요청에 공통 설정 적용
// 비유: 도서관에서 요청서를 처리하는 기본 규칙 설정
export const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // 의미: API 기본 URL 설정
  // 이유: 환경 변수로 API URL 지정
  // 비유: 도서관에서 기본 요청 창구 설정
  withCredentials: true, // 의미: 쿠키를 포함한 요청 활성화
  // 이유: HttpOnly 쿠키를 서버로 전송
  // 비유: 도서관에서 손님의 회원증 번호를 서버로 전달
});

// 여기부터 시작===
// 의미: 요청 인터셉터에 CSRF 토큰 추가
// 이유: 모든 요청에 CSRF 토큰 포함
// 비유: 도서관에서 모든 요청서에 인증 코드 추가
axiosBase.interceptors.request.use(
  async (config) => {
    const csrfToken = await getOrCreateCsrfToken(); // 의미: CSRF 토큰 가져오기
    // 이유: 요청 헤더에 추가
    // 비유: 도서관에서 요청서에 인증 코드 추가
    config.headers['X-CSRF-Token'] = csrfToken; // 의미: CSRF 토큰을 헤더에 추가
    // 이유: 서버에서 CSRF 토큰 검증
    // 비유: 도서관에서 요청서에 인증 코드 포함
    return config; // 의미: 수정된 요청 설정 반환
    // 이유: 요청 계속 진행
    // 비유: 도서관에서 요청서 처리 계속
  },
  (error) => {
    return Promise.reject(error); // 의미: 에러 처리
    // 이유: 요청 실패 시 상위로 에러 전달
    // 비유: 도서관에서 요청 실패 시 문제 알림
  }
);
// 여기부터 끝===

combineInterceptors(axiosBase); // 의미: 인터셉터 적용
// 이유: 요청 및 응답 처리 규칙 설정
// 비유: 도서관에서 요청서 처리 규칙 적용
