// src/api/axios/axiosGetCsrfToken.js

import { axiosBase } from '../base/axiosBase'; // 의미: 기본 axios 인스턴스 가져오기
// 이유: 서버 요청에 사용
// 비유: 도서관에서 요청서를 처리하는 기본 도구 가져오기

// 의미: 서버에서 CSRF 토큰과 만료 시간을 가져오는 함수
// 이유: CSRF 공격 방지 및 토큰 만료 관리
// 비유: 도서관에서 요청서의 위조 방지를 위한 인증 코드와 유효 기간 요청
export const axiosGetCsrfToken = async () => {
  const response = await axiosBase.get('/api/csrf-token'); // 의미: 서버에 CSRF 토큰 요청
  // 이유: 서버에서 CSRF 토큰 생성 및 반환
  // 비유: 도서관에서 서버에 인증 코드 발급 요청

  return {
    csrfToken: response.data.csrfToken, // 의미: CSRF 토큰 반환
    // 이유: 클라이언트에서 요청 시 사용
    // 비유: 도서관에서 발급된 인증 코드 전달
    expiresAt: response.data.expiresAt, // 의미: CSRF 토큰 만료 시간 반환 <!---여기추가
    // 이유: 클라이언트에서 토큰 만료 관리
    // 비유: 도서관에서 인증 코드 유효 기간 전달
  };
};
