// session/sessionGetCsrfTokenService.js

import { generateCsrfToken } from '../utils/session.GenerateToken.util.js'; // 의미: CSRF 토큰 생성 유틸 가져오기
// 이유: CSRF 토큰 생성
// 비유: 도서관에서 인증 코드 생성 도구

// 의미: CSRF 토큰과 만료 시간을 반환하는 서비스
// 이유: 비즈니스 로직 처리
// 비유: 도서관에서 인증 코드 발급 로직 처리
export const getCsrfToken = async (sessionId) => {
  if (!sessionId) {
    throw new Error('Session ID is required'); // 의미: 세션 ID 없으면 에러
    // 이유: CSRF 토큰 생성 전 세션 확인
    // 비유: 도서관에서 회원증 번호 없으면 인증 코드 발급 불가
  }

  const csrfToken = generateCsrfToken(); // 의미: 새로운 CSRF 토큰 생성
  // 이유: 고유한 CSRF 토큰 생성
  // 비유: 도서관에서 고유한 인증 코드 생성
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 의미: 24시간 후 만료 시간 설정
  // 이유: CSRF 토큰 유효 기간 설정
  // 비유: 도서관에서 인증 코드 유효 기간 설정

  // TODO: 실제로는 세션 저장소에 CSRF 토큰 저장 필요
  return { csrfToken, expiresAt }; // 의미: CSRF 토큰 정보 반환
  // 이유: 컨트롤러에서 사용
  // 비유: 도서관에서 인증 코드 정보 전달
};
