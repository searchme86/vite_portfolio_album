// session/sessionCreateSessionController.js

import { createSession } from '../services/session.CreateSession.service.js'; // 의미: 세션 생성 서비스 가져오기
// 이유: 비즈니스 로직 처리
// 비유: 도서관에서 회원증 발급 요청을 처리하는 창구

// 의미: 새로운 세션 ID와 만료 시간을 생성하는 컨트롤러
// 이유: 클라이언트 요청에 따라 세션 생성
// 비유: 도서관에서 손님의 회원증 발급 요청 처리
export const sessionCreateSessionController = async (req, res) => {
  try {
    const { sessionId, expiresAt } = await createSession(); // 의미: 세션 생성 서비스 호출
    // 이유: 세션 ID와 만료 시간 생성
    // 비유: 도서관에서 회원증 번호와 유효 기간 생성

    res.cookie('sessionId', sessionId, {
      // 의미: HttpOnly 쿠키로 세션 ID 설정
      httpOnly: true, // 의미: 클라이언트에서 접근 불가
      // 이유: 보안 강화
      // 비유: 도서관에서 회원증 번호를 안전하게 보관
      expires: new Date(expiresAt), // 의미: 쿠키 만료 시간 설정
      // 이유: 세션 만료 관리
      // 비유: 도서관에서 회원증 유효 기간 설정
      secure: process.env.NODE_ENV === 'production', // 의미: 프로덕션 환경에서 HTTPS 전용
      // 이유: 보안 강화
      // 비유: 도서관에서 안전한 환경에서만 회원증 사용
    });

    res.status(200).json({ sessionId, expiresAt }); // 의미: 세션 정보 반환
    // 이유: 클라이언트에서 세션 관리
    // 비유: 도서관에서 손님에게 회원증 정보 전달
  } catch (error) {
    console.error('Error creating session:', error); // 의미: 에러 로깅
    // 이유: 디버깅
    // 비유: 도서관에서 회원증 발급 실패 시 기록
    res.status(500).json({ error: 'Failed to create session' }); // 의미: 에러 응답
    // 이유: 클라이언트에 실패 알림
    // 비유: 도서관에서 손님에게 실패 알림
  }
};
