export const formatErrorMessage = (error) => {
  // 의미: 에러 메시지를 포맷팅하는 유틸리티 함수
  // 이유: 에러 메시지 포맷팅 로직 분리 및 보안 강화
  // 비유: 문제를 깔끔하게 설명하는 도구
  const errorMessage = error.message || 'Unknown server error'; // 의미: 에러 메시지 설정
  // 이유: 메시지 없으면 기본값 제공
  // 비유: 원인을 모르면 "알 수 없음" 적기

  const isProduction = process.env.NODE_ENV === 'production'; // 의미: 현재 환경이 프로덕션인지 확인
  // 이유: 프로덕션에서는 상세 에러 메시지 노출 방지
  // 비유: 손님에게 너무 많은 정보 주지 않기
  return isProduction ? 'Internal server error' : errorMessage; // 의미: 환경에 따라 메시지 반환
  // 이유: 보안 및 사용자 경험 개선
  // 비유: 상황에 맞게 문제 설명
};
