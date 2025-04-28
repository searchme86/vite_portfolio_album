// session/sessionGetCsrfTokenController.js

import { getCsrfToken } from '../services/session.GetCsrfToken.service.js'; // 의미: CSRF 토큰 서비스 가져오기
// 이유: 비즈니스 로직 처리
// 비유: 도서관에서 인증 코드 발급 요청을 처리하는 창구

// 의미: CSRF 토큰과 만료 시간을 반환하는 컨트롤러
// 이유: 클라이언트 요청에 따라 CSRF 토큰 제공
// 비유: 도서관에서 손님의 인증 코드 요청 처리
export const sessionGetCsrfTokenController = async (req, res) => {
  try {
    const { csrfToken, expiresAt } = await getCsrfToken(req.cookies.sessionId); // 의미: CSRF 토큰 서비스 호출
    // 이유: 세션 ID를 기반으로 CSRF 토큰 생성
    // 비유: 도서관에서 회원증 번호를 기반으로 인증 코드 생성

    res.status(200).json({ csrfToken, expiresAt }); // 의미: CSRF 토큰 정보 반환
    // 이유: 클라이언트에서 CSRF 토큰 사용
    // 비유: 도서관에서 손님에게 인증 코드 정보 전달
  } catch (error) {
    console.error('Error getting CSRF token:', error); // 의미: 에러 로깅
    // 이유: 디버깅
    // 비유: 도서관에서 인증 코드 발급 실패 시 기록
    res.status(500).json({ error: 'Failed to get CSRF token' }); // 의미: 에러 응답
    // 이유: 클라이언트에 실패 알림
    // 비유: 도서관에서 손님에게 실패 알림
  }
};
