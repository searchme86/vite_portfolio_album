// src/api/utils/csrfTokenUtil.js

import { axiosGetCsrfToken } from '../axios/axiosGetCsrfToken'; // 의미: CSRF 토큰 가져오는 API 함수 가져오기
// 이유: 서버에서 CSRF 토큰 요청
// 비유: 도서관에서 서버에 인증 코드 요청하는 도구

// 의미: CSRF 토큰을 저장하는 키
// 이유: localStorage에서 CSRF 토큰 저장 및 조회
// 비유: 도서관에서 인증 코드를 저장하는 서랍 이름
const CSRF_TOKEN_KEY = 'csrfToken';

// 의미: CSRF 토큰 만료 시간을 저장하는 키
// 이유: localStorage에서 만료 시간 저장 및 조회
// 비유: 도서관에서 인증 코드 유효 기간을 저장하는 서랍 이름
const CSRF_TOKEN_EXPIRES_AT_KEY = 'csrfTokenExpiresAt';

// 의미: CSRF 토큰 만료 여부를 확인하는 함수
// 이유: 토큰이 만료되었는지 확인
// 비유: 도서관에서 인증 코드 유효 기간 확인
const isCsrfTokenExpired = (expiresAt) => {
  if (!expiresAt) return true; // 의미: 만료 시간이 없으면 만료로 간주
  // 이유: 초기 상태 확인
  // 비유: 도서관에서 유효 기간 정보 없으면 만료로 간주
  const currentTime = new Date().toISOString(); // 의미: 현재 시간 가져오기
  // 이유: 만료 시간과 비교
  // 비유: 도서관에서 현재 시간 확인
  return currentTime > expiresAt; // 의미: 현재 시간이 만료 시간보다 크면 만료
  // 이유: 토큰 유효성 판단
  // 비유: 도서관에서 인증 코드가 유효 기간을 지났는지 확인
};

// 의미: CSRF 토큰을 가져오거나 생성하는 함수
// 이유: 모든 요청에 CSRF 토큰 포함
// 비유: 도서관에서 요청서에 인증 코드 추가
export const getOrCreateCsrfToken = async () => {
  const storedCsrfToken = localStorage.getItem(CSRF_TOKEN_KEY); // 의미: 기존 CSRF 토큰 조회
  // 이유: 이미 생성된 토큰이 있는지 확인
  // 비유: 도서관에서 손님의 기존 인증 코드 확인
  const storedExpiresAt = localStorage.getItem(CSRF_TOKEN_EXPIRES_AT_KEY); // 의미: 저장된 만료 시간 조회
  // 이유: 토큰 만료 여부 확인
  // 비유: 도서관에서 저장된 인증 코드 유효 기간 확인

  if (!storedCsrfToken || isCsrfTokenExpired(storedExpiresAt)) {
    try {
      const { csrfToken, expiresAt } = await axiosGetCsrfToken(); // 의미: 서버에서 CSRF 토큰 요청
      // 이유: 새로운 CSRF 토큰 생성
      // 비유: 도서관에서 서버에 인증 코드 요청
      localStorage.setItem(CSRF_TOKEN_KEY, csrfToken); // 의미: CSRF 토큰 저장
      // 이유: 이후 요청에서 재사용
      // 비유: 도서관에서 인증 코드를 서랍에 저장
      localStorage.setItem(CSRF_TOKEN_EXPIRES_AT_KEY, expiresAt); // 의미: 만료 시간 저장
      // 이유: 이후 토큰 만료 확인에 사용
      // 비유: 도서관에서 인증 코드 유효 기간 저장
      return csrfToken; // 의미: CSRF 토큰 반환
      // 이유: 요청 헤더에 포함
      // 비유: 도서관에서 요청서에 인증 코드 추가
    } catch (error) {
      console.error('Failed to get CSRF token:', error); // 의미: 에러 로깅
      // 이유: 디버깅
      // 비유: 도서관에서 인증 코드 발급 실패 시 기록
      throw new Error('Failed to initialize CSRF token'); // 의미: 에러 throw
      // 이유: 상위 컴포넌트에서 에러 처리
      // 비유: 도서관에서 실패 시 손님에게 문제 알림
    }
  }

  return storedCsrfToken; // 의미: 기존 CSRF 토큰 반환
  // 이유: 유효한 토큰 재사용
  // 비유: 도서관에서 기존 인증 코드 사용
};

// 의미: CSRF 토큰을 초기화하는 함수
// 이유: 로그아웃, 세션 만료, 또는 세션 갱신 시 CSRF 토큰 제거
// 비유: 도서관에서 손님의 인증 코드 폐기
export const clearCsrfToken = () => {
  localStorage.removeItem(CSRF_TOKEN_KEY); // 의미: CSRF 토큰 삭제
  // 이유: 새로운 세션 시작
  // 비유: 도서관에서 인증 코드 폐기
  localStorage.removeItem(CSRF_TOKEN_EXPIRES_AT_KEY); // 의미: 만료 시간 삭제
  // 이유: 새로운 토큰 생성 준비
  // 비유: 도서관에서 인증 코드 유효 기간 정보 폐기
};
