export const formatErrorMessage = (error, customMessage = null) => {
  // 의미: 에러 메시지를 포맷팅하는 공통 유틸리티 함수
  // 이유: 에러 메시지 포맷팅 로직을 중앙화하여 중복 코드 제거 및 보안 강화
  // 비유: 모든 문제를 한 곳에서 깔끔하게 정리해서 설명하는 도구

  const errorMessage = error.message || 'Unknown server error'; // 의미: 에러 메시지 설정
  // 이유: 에러 메시지가 없으면 기본값 제공
  // 비유: 원인을 모르면 "알 수 없음"이라고 적기

  const isProduction = process.env.NODE_ENV === 'production'; // 의미: 현재 환경이 프로덕션인지 확인
  // 이유: 프로덕션 환경에서는 상세 에러 메시지 노출 방지
  // 비유: 손님에게 너무 많은 정보 주지 않기

  // 여기부터 시작===
  // <!---여기수정
  const formattedMessage = customMessage || 'Internal server error'; // 의미: 사용자 정의 메시지 설정
  // 이유: 호출자가 원하는 메시지를 지정할 수 있도록 유연성 제공
  // 비유: 상황에 따라 다른 설명을 준비

  if (isProduction) {
    // 의미: 프로덕션 환경에서는 메시지만 반환
    // 이유: 보안 강화를 위해 상세 정보 숨김
    // 비유: 손님에게 간단히 "문제 생겼어요"만 말하기
    return {
      message: formattedMessage, // 의미: 포맷된 메시지
      // 이유: 사용자 친화적 메시지 제공
      // 비유: 간단한 설명 전달
      code: error.code || 'UNKNOWN_ERROR', // 의미: 에러 코드 추가
      // 이유: 디버깅 시 문제 식별 용이
      // 비유: 문제 번호 붙이기
    };
  }

  return {
    message: formattedMessage, // 의미: 포맷된 메시지
    // 이유: 사용자 친화적 메시지 제공
    // 비유: 간단한 설명 전달
    details: errorMessage, // 의미: 상세 에러 메시지 포함
    // 이유: 개발 환경에서 디버깅 용이성 제공
    // 비유: 개발자에게 문제 원인 상세히 설명
    code: error.code || 'UNKNOWN_ERROR', // 의미: 에러 코드 추가
    // 이유: 디버깅 시 문제 식별 용이
    // 비유: 문제 번호 붙이기
  };
  // 여기부터 끝===
};
