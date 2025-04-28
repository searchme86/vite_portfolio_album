// backend/lib/startServer.js
import connectDB from '../lib/connectDB.js'; // 의미: MongoDB 연결 함수 가져오기

// 의미: 서버 실행 함수 정의
// 이유: 서버 시작 및 에러 핸들링 분리
// 비유: 도서관 문 여는 작업을 별도로 관리
export const startServer = async (app) => {
  // 의미: app 파라미터 유효성 검사
  // 이유: Express 앱 인스턴스 필요
  // 비유: 도서관 시스템(app)이 제대로 준비되었는지 확인
  if (!app || typeof app.listen !== 'function') {
    console.error('startServer - Invalid Express app instance provided'); // 의미: app 인스턴스 에러 디버깅
    // 이유: 에러 원인 추적
    // 비유: 도서관 시스템 준비 실패 로그
    throw new Error('Invalid Express app instance');
  }

  try {
    await connectDB(); // 의미: MongoDB 연결
    // 이유: 데이터베이스 사용 준비
    // 비유: 도서관 책장(DB) 준비

    const port = process.env.PORT || 3000; // 의미: 포트 번호 설정, 기본값 3000
    // 이유: 환경별 포트 설정 가능
    // 비유: 도서관 입구 번호 설정
    console.log('startServer - Port:', port); // 의미: 포트 번호 디버깅
    // 이유: 포트 설정 확인
    // 비유: 도서관 입구 번호 기록 로그

    app.listen(port, () => {
      console.log(`startServer - Server is running on port ${port}`); // 의미: 서버 실행 확인
      // 이유: 서버 상태 확인
      // 비유: 도서관 문 열림 알림
    });
  } catch (error) {
    console.error('startServer - Failed to start server:', {
      message: error.message,
      stack: error.stack,
    }); // 의미: 서버 시작 실패 디버깅
    // 이유: 에러 원인 추적
    // 비유: 도서관 문 열기 실패 로그
    process.exit(1); // 의미: 프로세스 종료
    // 이유: 서버 시작 실패 시 애플리케이션 실행 불가
    // 비유: 도서관 문 닫기
  }
};
