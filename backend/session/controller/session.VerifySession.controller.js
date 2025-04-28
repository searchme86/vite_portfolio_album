// session/sessionVerifySessionController.js

import { verifySession } from '../services/session.VerifySession.service.js'; // 의미: 세션 검증 서비스 가져오기
// 이유: 비즈니스 로직 처리
// 비유: 도서관에서 회원증 유효성 확인 요청을 처리하는 창구

// 의미: 세션 유효성을 확인하는 컨트롤러
// 이유: 클라이언트 요청에 따라 세션 상태 확인
// 비유: 도서관에서 손님의 회원증 유효성 확인 요청 처리
export const sessionVerifySessionController = async (req, res) => {
  try {
    const isValid = await verifySession(req.cookies.sessionId); // 의미: 세션 검증 서비스 호출
    // 이유: 세션 ID를 기반으로 유효성 확인
    // 비유: 도서관에서 회원증 번호를 기반으로 유효성 확인

    res.status(200).json({ isValid }); // 의미: 세션 유효성 반환
    // 이유: 클라이언트에서 세션 상태 판단
    // 비유: 도서관에서 손님에게 회원증 유효성 정보 전달
  } catch (error) {
    console.error('Error verifying session:', error); // 의미: 에러 로깅
    // 이유: 디버깅
    // 비유: 도서관에서 회원증 확인 실패 시 기록
    res.status(500).json({ error: 'Failed to verify session' }); // 의미: 에러 응답
    // 이유: 클라이언트에 실패 알림
    // 비유: 도서관에서 손님에게 실패 알림
  }
};
