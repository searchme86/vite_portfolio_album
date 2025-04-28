// backend/lib/corsConfig.js
import cors from 'cors';

// 의미: CORS 설정 함수 정의
// 이유: CORS 정책을 별도로 관리
// 비유: 도서관 입장 허용 규칙을 별도 문서로 정리
export const configureCors = () => {
  // 의미: 허용된 출처 설정
  // 이유: 클라이언트 요청 허용
  // 비유: 특정 손님만 도서관 입장 허용
  const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

  // 의미: CLIENT_URL 환경 변수 유효성 검사
  // 이유: 잘못된 출처로 설정 방지
  // 비유: 손님 명단이 제대로 작성되었는지 확인
  if (!allowedOrigin) {
    console.error(
      'configureCors - CLIENT_URL is not defined in environment variables'
    ); // 의미: 환경 변수 누락 디버깅
    // 이유: 에러 원인 추적
    // 비유: 손님 명단 누락 기록
    throw new Error('CLIENT_URL is not defined');
  }

  console.log('configureCors - Allowed origin:', allowedOrigin); // 의미: 허용된 출처 디버깅
  // 이유: CORS 설정 확인
  // 비유: 손님 명단 기록 로그

  // 의미: CORS 옵션 정의
  // 이유: CORS 정책 설정
  // 비유: 도서관 입장 규칙 설정
  const corsOptions = {
    origin: allowedOrigin, // 의미: 허용된 출처 설정
    // 이유: 클라이언트 요청 허용
    // 비유: 특정 손님만 입장 허용
    credentials: true, // 의미: 쿠키 포함 요청 허용
    // 이유: 세션 기반 인증 지원
    // 비유: 손님의 회원증(쿠키) 확인 가능
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // 의미: 허용된 HTTP 메서드 설정
    // 이유: 요청 메서드 제한
    // 비유: 도서관에서 허용된 행동 정의
    allowedHeaders: ['Content-Type', 'Authorization'], // 의미: 허용된 요청 헤더 설정
    // 이유: 필요한 헤더만 허용
    // 비유: 손님이 제출할 수 있는 정보 제한
    exposedHeaders: ['Access-Control-Allow-Origin'], // 의미: 노출 헤더 추가
    // 이유: 브라우저가 헤더 확인 가능
    // 비유: 손님에게 공개할 정보 정의
  };

  console.log('configureCors - CORS options:', corsOptions); // 의미: CORS 옵션 디버깅
  // 이유: 설정값 확인
  // 비유: 도서관 입장 규칙 기록 로그

  return cors(corsOptions); // 의미: CORS 미들웨어 반환
  // 이유: Express에서 사용 가능
  // 비유: 입장 규칙을 도서관 시스템에 적용
};
