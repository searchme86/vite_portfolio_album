// src/api/axios/axiosGetSessionId.js

import { axiosBase } from '../base/axiosBase'; // 의미: 기본 axios 인스턴스 가져오기
// 이유: 서버 요청에 사용
// 비유: 도서관에서 요청서를 처리하는 기본 도구 가져오기

// 의미: 서버에서 새로운 세션 ID와 만료 시간을 가져오는 함수
// 이유: 클라이언트에서 세션 ID와 만료 시간을 관리
// 비유: 도서관에서 임시 손님에게 서버에서 발급된 회원증 번호와 유효 기간 요청
export const axiosGetSessionId = async () => {
  const response = await axiosBase.post('/api/session'); // 의미: 서버에 세션 ID 요청
  // 이유: 서버에서 새로운 세션 ID 생성 및 쿠키 설정
  // 비유: 도서관에서 서버에 임시 회원증 번호 발급 요청

  return {
    sessionId: response.data.sessionId, // 의미: 세션 ID 반환
    // 이유: 클라이언트에서 세션 ID 사용
    // 비유: 도서관에서 발급된 회원증 번호 전달
    expiresAt: response.data.expiresAt, // 의미: 세션 만료 시간 반환 <!---여기추가
    // 이유: 클라이언트에서 세션 만료 관리
    // 비유: 도서관에서 회원증 유효 기간 전달
  };
};
