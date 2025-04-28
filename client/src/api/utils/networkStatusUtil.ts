// src/api/utils/networkStatusUtil.js

// 의미: 네트워크 상태를 저장하는 객체
// 이유: 최근 요청 실패 기록 관리
// 비유: 도서관에서 최근 인터넷 연결 문제 기록을 저장하는 장부
const requestFailureLog = [];
const FAILURE_THRESHOLD = 2; // 의미: 불안정 상태로 판단하는 실패 횟수
// 이유: 네트워크 상태 판단 기준
// 비유: 도서관에서 인터넷 문제 판단 기준
const FAILURE_WINDOW = 5000; // 의미: 실패 기록 시간 창 (5초)
// 이유: 최근 5초 내 실패 횟수 확인
// 비유: 도서관에서 최근 5초 동안의 인터넷 문제 확인

// 의미: 네트워크 상태를 확인하는 함수
// 이유: 네트워크 상태에 따라 동작 조정
// 비유: 도서관에서 인터넷 연결 상태 확인
export const getNetworkStatus = () => {
  return navigator.onLine; // 의미: 브라우저의 네트워크 상태 반환
  // 이유: 네트워크 연결 여부 판단
  // 비유: 도서관에서 인터넷이 연결되어 있는지 확인
};

// 의미: 네트워크 상태를 세밀하게 판단하는 함수
// 이유: 안정, 불안정, 오프라인 상태에 따라 동작 조정
// 비유: 도서관에서 인터넷 상태를 더 자세히 판단
export const getDetailedNetworkStatus = () => {
  if (!navigator.onLine) {
    return 'offline'; // 의미: 오프라인 상태 반환
    // 이유: 네트워크 연결 없음
    // 비유: 도서관에서 인터넷 연결이 끊김
  }

  // 의미: 최근 5초 내 요청 실패 기록 필터링
  // 이유: 불안정 상태 판단을 위해 최근 실패 기록 추출
  // 비유: 도서관에서 최근 5초 동안의 인터넷 문제 기록 추출
  const now = Date.now();
  const recentFailures = requestFailureLog.filter(
    (timestamp) => now - timestamp < FAILURE_WINDOW
  ); // <!---여기수정: .length 제거, 배열 유지

  // 의미: 실패 로그 정리
  // 이유: 오래된 기록 제거
  // 비유: 도서관에서 오래된 문제 기록 정리
  requestFailureLog.length = 0;
  requestFailureLog.push(...recentFailures); // <!---여기수정: recentFailures가 배열이므로 map 불필요

  // 의미: 최근 실패 횟수와 임계값 비교
  // 이유: 네트워크 불안정 여부 판단
  // 비유: 도서관에서 최근 문제 발생 횟수 확인
  if (recentFailures.length >= FAILURE_THRESHOLD) {
    return 'unstable'; // 의미: 불안정 상태 반환
    // 이유: 최근 요청 실패가 많음
    // 비유: 도서관에서 인터넷 연결이 불안정함
  }

  // 의미: navigator.connection으로 네트워크 품질 확인 (지원 시)
  // 이유: 더 세밀한 상태 판단
  // 비유: 도서관에서 인터넷 속도와 품질 확인
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  if (connection) {
    const { downlink, effectiveType } = connection;
    if (downlink < 1 || effectiveType === '2g') {
      return 'unstable'; // 의미: 불안정 상태 반환
      // 이유: 네트워크 속도가 느림
      // 비유: 도서관에서 인터넷이 느려 불안정함
    }
  }

  return 'stable'; // 의미: 안정 상태 반환
  // 이유: 네트워크 상태 양호
  // 비유: 도서관에서 인터넷 연결이 안정적
};

// 의미: 요청 실패를 기록하는 함수
// 이유: 불안정 상태 판단에 사용
// 비유: 도서관에서 인터넷 문제 발생 시 기록
export const logRequestFailure = () => {
  requestFailureLog.push(Date.now()); // 의미: 실패 시간 기록
  // 이유: 최근 실패 횟수 계산
  // 비유: 도서관에서 인터넷 문제 발생 시간 기록
};

// 의미: 네트워크 상태 변화를 감지하는 이벤트 리스너 등록 함수
// 이유: 네트워크 상태 변화에 따라 동작 조정
// 비유: 도서관에서 인터넷 연결 상태 변화를 감지하는 알림 설정
export const addNetworkStatusListener = (callback) => {
  const handleOnline = () => callback(true); // 의미: 온라인 상태 콜백
  // 이유: 네트워크 연결 시 콜백 실행
  // 비유: 도서관에서 인터넷 연결 시 알림
  const handleOffline = () => callback(false); // 의미: 오프라인 상태 콜백
  // 이유: 네트워크 연결 해제 시 콜백 실행
  // 비유: 도서관에서 인터넷 연결 해제 시 알림

  window.addEventListener('online', handleOnline); // 의미: 온라인 이벤트 리스너 추가
  // 이유: 네트워크 연결 시 감지
  // 비유: 도서관에서 인터넷 연결 알림 설정
  window.addEventListener('offline', handleOffline); // 의미: 오프라인 이벤트 리스너 추가
  // 이유: 네트워크 연결 해제 시 감지
  // 비유: 도서관에서 인터넷 연결 해제 알림 설정

  return () => {
    window.removeEventListener('online', handleOnline); // 의미: 온라인 리스너 제거
    // 이유: 이벤트 정리
    // 비유: 도서관에서 알림 설정 해제
    window.removeEventListener('offline', handleOffline); // 의미: 오프라인 리스너 제거
    // 이유: 이벤트 정리
    // 비유: 도서관에서 알림 설정 해제
  };
};

// 의미: 네트워크 에러를 처리하고 커스터마이즈된 에러 메시지를 반환
// 이유: 사용자에게 친화적인 에러 메시지 제공
// 비유: 도서관에서 네트워크 연결 문제를 확인하고 손님에게 메시지 전달
export const handleNetworkError = (error) => {
  // 의미: 에러 객체가 존재하는지 확인
  // 이유: 방어 코드로 에러 처리
  // 비유: 도서관에서 에러 정보가 있는지 확인
  if (!error) {
    return new Error('Unknown network error occurred');
  }

  // 의미: 네트워크 에러 여부 확인 (예: 요청 타임아웃, 연결 실패)
  // 이유: 네트워크 관련 에러를 구체적으로 처리
  // 비유: 도서관에서 네트워크 연결 문제인지 확인
  if (
    error.message.includes('Network Error') ||
    error.message.includes('timeout')
  ) {
    // 의미: 요청 실패 기록
    // 이유: 네트워크 불안정 상태 판단에 사용
    // 비유: 도서관에서 인터넷 문제 발생 시 기록
    logRequestFailure();

    // 의미: 네트워크 상태 확인
    // 이유: 추가적인 상태 정보 제공
    // 비유: 도서관에서 현재 인터넷 상태 확인
    const detailedStatus = getDetailedNetworkStatus();
    if (detailedStatus === 'offline') {
      return new Error(
        'You are offline. Please check your internet connection.'
      );
    }
    if (detailedStatus === 'unstable') {
      return new Error('Network is unstable. Please try again later.');
    }
    return new Error(
      'Network error: Please check your internet connection and try again.'
    );
  }

  // 의미: 서버 응답이 있는 경우 상태 코드 확인
  // 이유: 서버 에러에 따른 메시지 커스터마이징
  // 비유: 도서관에서 서버 응답 상태를 확인
  if (error.response) {
    const status = error.response.status;
    if (status === 503) {
      return new Error('Service unavailable: The server is temporarily down.');
    }
    if (status >= 500) {
      return new Error('Server error: Something went wrong on the server.');
    }
    if (status >= 400 && status < 500 && status !== 401) {
      return new Error('Request error: Invalid request.');
    }
  }

  // 의미: 기타 에러 처리
  // 이유: 모든 경우를 커버하기 위해 기본 에러 메시지 제공
  // 비유: 도서관에서 처리되지 않은 에러에 대해 기본 메시지 전달
  return new Error(error.message || 'An unexpected error occurred.');
};
