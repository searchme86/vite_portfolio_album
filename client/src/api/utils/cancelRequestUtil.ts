// src/api/utils/cancelRequestUtil.js

import axios from 'axios'; // 의미: Axios 라이브러리 가져오기
// 이유: 요청 취소 기능 사용
// 비유: 도서관에서 요청 처리 도구 가져오기

// 의미: 요청 취소 토큰 생성 함수
// 이유: 요청 취소 가능하도록 토큰 제공
// 비유: 도서관에서 요청 취소 가능한 티켓 발급
export const createCancelToken = () => {
  const source = axios.CancelToken.source(); // 의미: 취소 토큰 소스 생성
  // 이유: 요청 취소 가능
  // 비유: 도서관에서 취소 티켓 생성
  return source; // 의미: 취소 토큰 소스 반환
  // 이유: 요청 시 사용
  // 비유: 도서관에서 취소 티켓 전달
};

// 의미: 요청 취소 함수
// 이유: 불필요한 요청 중단
// 비유: 도서관에서 요청 취소 실행
export const cancelRequest = (source, message = 'Request canceled') => {
  source.cancel(message); // 의미: 요청 취소 실행
  // 이유: 더 이상 필요 없는 요청 중단
  // 비유: 도서관에서 요청 취소 실행
};
