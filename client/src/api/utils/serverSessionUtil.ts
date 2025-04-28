// src/api/utils/serverSessionUtil.js

// 의미: 서버 세션 정보를 로컬 스토리지에서 가져오는 함수
// 이유: 세션 유효성 검증 및 요청에 세션 정보 추가
// 비유: 도서관에서 서버 방문 기록을 확인
export const getServerSession = () => {
  // 의미: 로컬 스토리지에서 서버 세션 정보 가져오기
  // 이유: 클라이언트에서 저장된 세션 정보 사용
  // 비유: 도서관에서 저장된 방문 기록 확인
  const session = localStorage.getItem('serverSession');

  // 의미: 세션 정보가 존재하는지 확인
  // 이유: 세션이 없으면 null 반환
  // 비유: 도서관에서 방문 기록이 있는지 확인
  if (!session) {
    return null;
  }

  try {
    // 의미: 세션 정보를 JSON으로 파싱
    // 이유: 문자열로 저장된 데이터를 객체로 변환
    // 비유: 도서관에서 기록된 정보를 읽을 수 있는 형태로 변환
    const parsedSession = JSON.parse(session);

    // 의미: 파싱된 세션 정보 반환
    // 이유: 요청 인터셉터에서 사용
    // 비유: 도서관에서 확인된 방문 기록 반환
    return parsedSession;
  } catch (error) {
    // 의미: 파싱 에러 처리
    // 이유: 잘못된 데이터 처리 방지
    // 비유: 도서관에서 잘못된 기록 처리
    console.error('Failed to parse server session:', error);
    return null;
  }
};

// 여기부터 시작=== <!---여기추가
// 의미: 서버 세션 ID를 가져오는 함수
// 이유: 세션 ID만 필요한 경우 사용
// 비유: 도서관에서 방문 기록의 ID만 추출
export const getServerSessionId = () => {
  // 의미: 서버 세션 정보 가져오기
  // 이유: 세션 객체에서 ID 추출
  // 비유: 도서관에서 방문 기록 전체를 확인
  const session = getServerSession();

  // 의미: 세션이 존재하고 ID 속성이 있는지 확인
  // 이유: 유효하지 않은 세션 처리
  // 비유: 도서관에서 방문 기록에 ID가 있는지 확인
  if (session && session.id) {
    // 의미: 세션 ID 반환
    // 이유: 요청에 세션 ID 추가
    // 비유: 도서관에서 방문 기록 ID 반환
    return session.id;
  }

  // 의미: 세션이 없거나 ID가 없는 경우 null 반환
  // 이유: 세션 ID가 없음을 명시
  // 비유: 도서관에서 방문 기록 ID가 없음을 알림
  return null;
};
// 여기부터 끝===

// 의미: 서버 세션 정보를 저장하는 함수
// 이유: 세션 정보를 로컬 스토리지에 저장
// 비유: 도서관에서 방문 기록을 저장
export const setServerSession = (session) => {
  // 의미: 세션 정보가 유효한지 확인
  // 이유: 잘못된 데이터 저장 방지
  // 비유: 도서관에서 기록이 유효한지 확인
  if (!session || typeof session !== 'object') {
    console.error('Invalid session data');
    return;
  }

  try {
    // 의미: 세션 정보를 JSON 문자열로 변환
    // 이유: 로컬 스토리지에 문자열로 저장
    // 비유: 도서관에서 기록을 저장 가능한 형태로 변환
    const sessionString = JSON.stringify(session);

    // 의미: 로컬 스토리지에 세션 정보 저장
    // 이유: 이후 요청에서 사용
    // 비유: 도서관에서 방문 기록 저장
    localStorage.setItem('serverSession', sessionString);
  } catch (error) {
    // 의미: 저장 에러 처리
    // 이유: 저장 실패 시 에러 로깅
    // 비유: 도서관에서 기록 저장 실패 시 기록
    console.error('Failed to save server session:', error);
  }
};

// 의미: 서버 세션 정보를 삭제하는 함수
// 이유: 세션 종료 시 정리
// 비유: 도서관에서 방문 기록 삭제
export const clearServerSession = () => {
  // 의미: 로컬 스토리지에서 세션 정보 삭제
  // 이유: 세션 종료 처리
  // 비유: 도서관에서 방문 기록 삭제
  localStorage.removeItem('serverSession');
};
