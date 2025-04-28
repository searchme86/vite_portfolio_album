// 의미: API 요청 에러를 처리하는 유틸리티 함수
// 이유: 에러 처리 로직을 중앙에서 관리
// 비유: 도서관에서 창고 요청 실패 시 보고서를 작성하는 부서
export const handleApiError = (error) => {
  // 의미: 에러 메시지 로그
  // 이유: 디버깅을 위해 에러 원인 기록
  // 비유: 창고 요청 실패 원인을 기록
  console.error('API Request Error:', error.message);

  // 의미: 에러를 상위로 전달
  // 이유: 상위 컴포넌트에서 에러를 처리하도록 함
  // 비유: 실패 원인을 상부에 보고
  throw new Error('Failed to fetch data from API');
};
