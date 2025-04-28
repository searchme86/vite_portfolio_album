// backend/middleware/errorHandlerMiddleware.js

// 의미: 전역 에러 핸들링 미들웨어 정의
// 이유: 서버 에러를 일관되게 처리
// 비유: 도서관에서 문제 발생 시 기록하는 직원
export const errorHandlerMiddleware = (error, req, res, next) => {
  console.error('errorHandlerMiddleware - Server Error:', {
    message: error.message, // 의미: 에러 메시지 로깅
    // 이유: 에러 원인 추적
    // 비유: 문제의 원인을 기록
    stack: error.stack, // 의미: 에러 스택 트레이스 로깅
    // 이유: 에러 발생 위치 추적
    // 비유: 문제 발생 위치를 기록
    status: error.status, // 의미: 에러 상태 코드 로깅
    // 이유: 에러 상태 확인
    // 비유: 문제의 심각도 기록
    request: {
      method: req.method, // 의미: 요청 메서드 로깅
      // 이유: 에러 발생 요청 정보 확인
      // 비유: 손님의 요청 방식 기록
      url: req.url, // 의미: 요청 URL 로깅
      // 이유: 에러 발생 경로 확인
      // 비유: 손님이 요청한 경로 기록
      headers: req.headers, // 의미: 요청 헤더 로깅
      // 이유: 요청 메타데이터 확인
      // 비유: 손님의 요청 메타 정보 기록
    },
  }); // 의미: 서버 에러 디버깅
  // 이유: 에러 원인 추적
  // 비유: 도서관에서 문제 발생 시 기록

  // 의미: 클라이언트에 에러 응답 전송
  // 이유: 에러 정보를 클라이언트에 전달
  // 비유: 손님에게 문제 상황 알림
  res.status(error.status || 500).json({
    message: error.message || 'Something went wrong!', // 의미: 에러 메시지 응답
    // 이유: 클라이언트에 에러 원인 전달
    // 비유: 손님에게 문제 원인 설명
    status: error.status, // 의미: 에러 상태 코드 응답
    // 이유: 클라이언트에 에러 상태 전달
    // 비유: 손님에게 문제 심각도 전달
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack, // 의미: 스택 트레이스 조건부 응답
    // 이유: 프로덕션 환경에서는 스택 트레이스 노출 방지
    // 비유: 공식 운영 중에는 내부 정보 숨김
  });
};
