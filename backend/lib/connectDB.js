// backend/lib/connectDB.js
import mongoose from 'mongoose';

// 의미: MongoDB 연결 함수 정의
// 이유: 데이터베이스 연결 관리
// 비유: 도서관 책장(MongoDB)에 접근 준비
const connectDB = async () => {
  // 의미: MongoDB URI 환경 변수 가져오기
  // 이유: 연결 문자열 필요
  // 비유: 도서관 책장 위치(MONGO URI) 확인
  const mongoUri = process.env.MONGO;

  // 의미: MONGO URI 유효성 검사
  // 이유: 잘못된 URI로 연결 시도 방지
  // 비유: 책장 위치가 제대로 지정되었는지 확인
  if (!mongoUri) {
    console.error(
      'connectDB - MongoDB URI is not defined in environment variables'
    ); // 의미: 환경 변수 누락 디버깅
    // 이유: 에러 원인 추적
    // 비유: 책장 위치가 없음을 기록
    throw new Error('MongoDB URI is not defined');
  }

  console.log('connectDB - MongoDB URI:', mongoUri); // 의미: MONGO URI 디버깅
  // 이유: 연결 문자열 확인
  // 비유: 책장 위치 기록 로그

  // 의미: MongoDB 연결 옵션 정의
  // 이유: 연결 안정성과 성능 최적화
  // 비유: 책장에 접근하는 규칙 설정
  const mongooseOptions = {
    maxPoolSize: process.env.MONGO_MAX_POOL_SIZE
      ? parseInt(process.env.MONGO_MAX_POOL_SIZE)
      : 10, // 의미: 최대 연결 풀 크기 설정, 기본값 10
    // 이유: 동시 연결 수 제한
    // 비유: 책장에 동시에 접근할 수 있는 사서 수 제한
    connectTimeoutMS: process.env.MONGO_CONNECT_TIMEOUT
      ? parseInt(process.env.MONGO_CONNECT_TIMEOUT)
      : 10000, // 의미: 연결 타임아웃 설정, 기본값 10초
    // 이유: 연결 시도 시간 제한
    // 비유: 책장에 접근 시도 시간 제한
    serverSelectionTimeoutMS: process.env.MONGO_SERVER_SELECTION_TIMEOUT
      ? parseInt(process.env.MONGO_SERVER_SELECTION_TIMEOUT)
      : 5000, // 의미: 서버 선택 타임아웃 설정, 기본값 5초
    // 이유: 서버 선택 시간 제한
    // 비유: 책장 서버 선택 시간 제한
    useNewUrlParser: true, // 의미: 새로운 URL 파서 사용
    // 이유: 경고 방지 및 최신 기능 사용
    // 비유: 최신 도서관 시스템 사용
    useUnifiedTopology: true, // 의미: 새로운 토폴로지 엔진 사용
    // 이유: 안정적인 연결 관리
    // 비유: 최신 도서관 관리 방식 사용
  };

  console.log('connectDB - Mongoose connection options:', mongooseOptions); // 의미: 연결 옵션 디버깅
  // 이유: 옵션 확인
  // 비유: 책장 접근 규칙 기록 로그

  // 의미: 연결 재시도 설정
  // 이유: 일시적 연결 실패 시 재시도
  // 비유: 책장에 접근 실패 시 다시 시도
  const maxRetries = process.env.MONGO_MAX_RETRIES
    ? parseInt(process.env.MONGO_MAX_RETRIES)
    : 3; // 의미: 최대 재시도 횟수, 기본값 3
  // 이유: 재시도 횟수 제한
  // 비유: 책장에 접근 시도 횟수 제한
  const retryDelay = process.env.MONGO_RETRY_DELAY
    ? parseInt(process.env.MONGO_RETRY_DELAY)
    : 5000; // 의미: 재시도 간격, 기본값 5초
  // 이유: 재시도 간격 설정
  // 비유: 책장에 다시 접근 시도 전 대기 시간

  // 의미: 연결 상태 이벤트 리스너 설정
  // 이유: 연결 상태 모니터링
  // 비유: 책장 상태를 계속 확인
  mongoose.connection.on('connected', () => {
    console.log('connectDB - MongoDB connected successfully'); // 의미: 연결 성공 디버깅
    // 이유: 연결 상태 확인
    // 비유: 책장에 접근 성공 로그
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('connectDB - MongoDB disconnected'); // 의미: 연결 끊김 디버깅
    // 이유: 연결 상태 확인
    // 비유: 책장에 접근 불가 로그
  });

  mongoose.connection.on('error', (error) => {
    console.error('connectDB - MongoDB connection error:', error); // 의미: 연결 에러 디버깅
    // 이유: 에러 원인 추적
    // 비유: 책장 접근 중 문제 발생 로그
  });

  // 의미: MongoDB 연결 시도 함수
  // 이유: 재시도 로직 분리
  // 비유: 책장에 접근 시도하는 별도 작업
  const attemptConnection = async (attempt = 1) => {
    console.log(
      `connectDB - Attempting to connect to MongoDB (Attempt ${attempt}/${maxRetries})`
    ); // 의미: 연결 시도 디버깅
    // 이유: 연결 시도 상태 확인
    // 비유: 책장에 접근 시도 로그

    try {
      await mongoose.connect(mongoUri, mongooseOptions); // 의미: MongoDB 연결 시도
      // 이유: 데이터베이스 연결
      // 비유: 책장에 접근 시도
      console.log('connectDB - MongoDB connection established'); // 의미: 연결 성공 디버깅
      // 이유: 연결 상태 확인
      // 비유: 책장에 접근 성공 로그
    } catch (error) {
      console.error('connectDB - Connection failed:', {
        attempt,
        error: error.message,
        code: error.code, // 의미: 에러 코드 추가
        // 이유: 에러 원인 구체화
        // 비유: 접근 실패 원인 기록
      });

      // 의미: 최대 재시도 횟수 초과 여부 확인
      // 이유: 무한 재시도 방지
      // 비유: 책장에 계속 접근 시도하지 않도록 제한
      if (attempt >= maxRetries) {
        console.error('connectDB - Maximum retries reached. Exiting process.'); // 의미: 최대 재시도 초과 디버깅
        // 이유: 에러 원인 추적
        // 비유: 더 이상 시도 불가 로그
        throw new Error(
          `Failed to connect to MongoDB after ${maxRetries} attempts: ${error.message}`
        );
      }

      console.log(`connectDB - Retrying in ${retryDelay / 1000} seconds...`); // 의미: 재시도 대기 디버깅
      // 이유: 재시도 상태 확인
      // 비유: 재시도 전 대기 로그

      // 의미: 재시도 전 대기
      // 이유: 서버 부하 방지
      // 비유: 다음 시도를 위해 잠시 대기
      await new Promise((resolve) => setTimeout(resolve, retryDelay));

      // 의미: 재시도 호출
      // 이유: 연결 재시도
      // 비유: 책장에 다시 접근 시도
      return attemptConnection(attempt + 1);
    }
  };

  try {
    await attemptConnection(); // 의미: MongoDB 연결 시도 시작
    // 이유: 데이터베이스 연결
    // 비유: 책장에 접근 시작
  } catch (error) {
    console.error('connectDB - Failed to connect to MongoDB:', error); // 의미: 최종 연결 실패 디버깅
    // 이유: 에러 원인 추적
    // 비유: 책장에 접근 실패 로그
    process.exit(1); // 의미: 프로세스 종료
    // 이유: 데이터베이스 연결 실패 시 애플리케이션 실행 불가
    // 비유: 도서관 문 닫기
  }
};

export default connectDB; // 의미: connectDB 함수 내보내기
// 이유: 다른 모듈에서 사용 가능
// 비유: 도서관 책장 접근 준비 완료
