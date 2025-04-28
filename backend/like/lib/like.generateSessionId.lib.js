// backend/like/lib/like.generateSessionId.lib.js

import { v4 as uuidv4 } from 'uuid'; // 의미: UUID 생성 라이브러리 가져오기
// 이유: 고유한 세션 ID 생성
// 비유: 임시 손님에게 고유한 방문 번호 부여

// 의미: 세션 ID 생성 함수
// 이유: 비로그인 유저 식별을 위한 고유 ID 생성
// 비유: 임시 손님에게 방문 번호 부여
export const generateSessionId = () => {
  const sessionId = uuidv4(); // 의미: UUID로 고유한 세션 ID 생성
  // 이유: 중복되지 않는 ID 생성
  // 비유: 고유한 방문 번호 생성
  console.log('Generated sessionId:', sessionId); // 의미: 생성된 세션 ID 디버깅
  // 이유: 생성 확인
  // 비유: 방문 번호 확인 로그
  return sessionId;
};
