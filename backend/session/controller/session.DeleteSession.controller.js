// session/sessionDeleteSessionController.js

import { deleteSession } from '../services/session.DeleteSession.service.js'; // 의미: 세션 삭제 서비스 가져오기
// 이유: 비즈니스 로직 처리
// 비유: 도서관에서 회원증 폐기 요청을 처리하는 창구

// 의미: 세션을 삭제하는 컨트롤러
// 이유: 클라이언트 요청에 따라 세션 제거
// 비유: 도서관에서 손님의 회원증 폐기 요청 처리
export const sessionDeleteSessionController = async (req, res) => {
  try {
    await deleteSession(req.cookies.sessionId); // 의미: 세션 삭제 서비스 호출
    // 이유: 세션 ID를 기반으로 세션 제거
    // 비유: 도서관에서 회원증 번호를 기반으로 폐기

    res.clearCookie('sessionId'); // 의미: 세션 ID 쿠키 제거
    // 이유: 클라이언트에서 세션 정리
    // 비유: 도서관에서 손님의 회원증 번호 제거
    res.status(204).send(); // 의미: 성공 응답 (No Content)
    // 이유: 클라이언트에 성공 알림
    // 비유: 도서관에서 손님에게 폐기 완료 알림
  } catch (error) {
    console.error('Error deleting session:', error); // 의미: 에러 로깅
    // 이유: 디버깅
    // 비유: 도서관에서 회원증 폐기 실패 시 기록
    res.status(500).json({ error: 'Failed to delete session' }); // 의미: 에러 응답
    // 이유: 클라이언트에 실패 알림
    // 비유: 도서관에서 손님에게 실패 알림
  }
};
