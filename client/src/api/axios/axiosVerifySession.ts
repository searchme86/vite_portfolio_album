// src/api/axios/axiosVerifySession.js

import { axiosBase } from '../base/axiosBase'; // 의미: 기본 axios 인스턴스 가져오기
// 이유: 서버 요청에 사용
// 비유: 도서관에서 요청서를 처리하는 기본 도구 가져오기

// 의미: 서버에서 세션 상태를 확인하는 함수
// 이유: 클라이언트와 서버 간 세션 동기화
// 비유: 도서관에서 임시 손님의 회원증 번호가 유효한지 서버에 확인
export const axiosVerifySession = async () => {
  const response = await axiosBase.get('/api/session/verify'); // 의미: 서버에 세션 상태 확인 요청
  // 이유: 세션이 유효한지 확인
  // 비유: 도서관에서 서버에 회원증 번호 유효성 확인 요청

  return response.data.isValid; // 의미: 세션 유효성 반환
  // 이유: 클라이언트에서 세션 상태 판단
  // 비유: 도서관에서 회원증 번호가 유효한지 결과 전달
};
