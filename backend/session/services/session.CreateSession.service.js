// session/sessionCreateSessionService.js

import { generateSessionId } from '../utils/session.GenerateToken.util.js'; // 의미: 세션 ID 생성 유틸 가져오기
// 이유: 세션 ID 생성
// 비유: 도서관에서 회원증 번호 생성 도구

// 의미: 새로운 세션 ID와 만료 시간을 생성하는 서비스
// 이유: 비즈니스 로직 처리
// 비유: 도서관에서 회원증 발급 로직 처리
export const createSession = async () => {
  const sessionId = generateSessionId(); // 의미: 새로운 세션 ID 생성
  // 이유: 고유한 세션 식별자 생성
  // 비유: 도서관에서 고유한 회원증 번호 생성
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 의미: 24시간 후 만료 시간 설정
  // 이유: 세션 유효 기간 설정
  // 비유: 도서관에서 회원증 유효 기간 설정

  // TODO: 실제로는 세션 저장소(예: Redis)에 저장 필요
  return { sessionId, expiresAt }; // 의미: 세션 정보 반환
  // 이유: 컨트롤러에서 사용
  // 비유: 도서관에서 회원증 정보 전달
};
