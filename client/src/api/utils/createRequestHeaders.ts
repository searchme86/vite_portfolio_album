// 여기부터 시작===

// 의미: API 요청 헤더를 생성하는 유틸리티 함수
// 이유: 헤더 생성 로직을 독립적으로 관리
// 비유: 도서관에서 요청서에 회원증을 붙이는 부서
export const createRequestHeaders = (token) => {
  // 의미: 토큰 값을 로그로 출력
  // 이유: 디버깅을 위해 토큰 값 확인
  // 비유: 회원증 번호를 확인하기 위해 기록
  console.log('createRequestHeaders - Received token:', token);
  // <!---여기추가

  // 의미: 토큰이 문자열인지 확인하고, 객체일 경우 변환 시도
  // 이유: 잘못된 토큰 형식으로 인해 요청이 실패하는 것을 방지
  // 비유: 회원증이 진짜인지 확인하고, 잘못된 경우 수정
  let validatedToken = token;
  if (typeof token !== 'string') {
    if (token && typeof token === 'object' && token.jwt) {
      validatedToken = token.jwt; // 의미: 객체에서 jwt 필드를 추출
      // 이유: Clerk에서 반환하는 토큰 객체 처리
      // 비유: 회원증 카드에서 번호만 추출
    } else {
      throw new Error(`Token must be a string, received: ${typeof token}`);
    }
  }

  // 의미: Authorization 헤더 생성
  // 이유: 백엔드에서 인증을 위해 필요
  // 비유: 요청서에 회원증 번호를 적어 넣음
  return {
    Authorization: `Bearer ${validatedToken}`,
  };
};

// 여기부터 끝===
