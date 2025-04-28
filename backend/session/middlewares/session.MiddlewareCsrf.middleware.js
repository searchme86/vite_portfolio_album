// session/sessionMiddlewareCsrfUtil.js

// 의미: CSRF 토큰을 검증하는 미들웨어
// 이유: CSRF 공격 방지
// 비유: 도서관에서 요청서의 인증 코드 검증
export const sessionMiddlewareCsrfUtil = (req, res, next) => {
  const csrfToken = req.headers['x-csrf-token']; // 의미: 요청 헤더에서 CSRF 토큰 가져오기
  // 이유: 클라이언트에서 보낸 토큰 확인
  // 비유: 도서관에서 요청서에 포함된 인증 코드 확인

  if (!csrfToken) {
    return res.status(403).json({ error: 'CSRF token is missing' }); // 의미: CSRF 토큰 없으면 에러
    // 이유: 보안 정책 위반
    // 비유: 도서관에서 인증 코드 없으면 요청 거부
  }

  // TODO: 실제로는 세션 저장소에서 CSRF 토큰 검증 필요
  const isValidCsrfToken = true; // 의미: CSRF 토큰 유효성 가정
  // 이유: 테스트 목적
  // 비유: 도서관에서 인증 코드 유효성 가정

  if (!isValidCsrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' }); // 의미: CSRF 토큰 유효하지 않으면 에러
    // 이유: 보안 정책 위반
    // 비유: 도서관에서 인증 코드가 맞지 않으면 요청 거부
  }

  next(); // 의미: 다음 미들웨어로 이동
  // 이유: 검증 완료
  // 비유: 도서관에서 인증 코드 확인 후 요청 처리 계속
};
