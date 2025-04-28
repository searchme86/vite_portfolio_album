// backend/middleware/clerkHandshakeMiddleware.js

// 의미: Clerk handshake 처리 미들웨어 정의
// 이유: Clerk 관련 쿼리 파라미터 정리
// 비유: 도서관에서 손님 요청서의 불필요한 정보 정리
export const clerkHandshakeMiddleware = (req, res, next) => {
  console.log('clerkHandshakeMiddleware - Incoming request:', {
    method: req.method,
    url: req.url,
    query: req.query,
    headers: req.headers,
  }); // 의미: 요청 정보 디버깅
  // 이유: 요청 상태 확인
  // 비유: 손님 요청 정보 기록 로그

  // 의미: Clerk handshake 쿼리 파라미터 확인
  // 이유: 불필요한 쿼리 파라미터 정리
  // 비유: 손님 요청서에서 불필요한 정보 삭제
  if (req.query.__clerk_handshake) {
    console.log(
      'clerkHandshakeMiddleware - Found __clerk_handshake query parameter'
    ); // 의미: handshake 쿼리 디버깅
    // 이유: 쿼리 파라미터 확인
    // 비유: 불필요한 정보 발견 로그
    delete req.query.__clerk_handshake; // 의미: Clerk handshake 쿼리 제거
    // 이유: 불필요한 파라미터 정리
    // 비유: 손님 요청서 정리
    console.log(
      'clerkHandshakeMiddleware - Removed __clerk_handshake query parameter'
    ); // 의미: 쿼리 제거 디버깅
    // 이유: 제거 확인
    // 비유: 정리 완료 로그
  }

  next(); // 의미: 다음 미들웨어로 이동
  // 이유: 요청 처리 계속
  // 비유: 다음 안내 데스크로 손님 안내
};
