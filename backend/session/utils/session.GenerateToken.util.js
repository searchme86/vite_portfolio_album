// session/sessionGenerateTokenUtil.js

import { randomBytes } from 'crypto'; // 의미: Node.js 암호화 모듈 가져오기
// 이유: 안전한 토큰 생성
// 비유: 도서관에서 안전한 회원증 번호와 인증 코드 생성 도구

// 의미: 고유한 세션 ID 생성 함수
// 이유: 세션 식별자 생성
// 비유: 도서관에서 고유한 회원증 번호 생성
export const generateSessionId = () => {
  return randomBytes(16).toString('hex'); // 의미: 16바이트 랜덤 값을 hex로 변환
  // 이유: 고유하고 안전한 세션 ID 생성
  // 비유: 도서관에서 무작위로 안전한 회원증 번호 생성
};

// 의미: 고유한 CSRF 토큰 생성 함수
// 이유: CSRF 공격 방지
// 비유: 도서관에서 요청서 위조 방지를 위한 인증 코드 생성
export const generateCsrfToken = () => {
  return randomBytes(32).toString('hex'); // 의미: 32바이트 랜덤 값을 hex로 변환
  // 이유: 고유하고 안전한 CSRF 토큰 생성
  // 비유: 도서관에서 무작위로 안전한 인증 코드 생성
};
