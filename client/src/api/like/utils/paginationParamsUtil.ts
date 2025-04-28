// src/api/like/utils/paginationParamsUtil.js

// 의미: 페이지네이션 파라미터를 생성하는 함수
// 이유: 페이지와 항목 수를 설정하여 백엔드 요청 준비
// 비유: 도서관에서 페이지 번호와 목록 수를 준비
export const getPaginationParams = (page) => {
  const validatedPage = Math.max(1, page); // 의미: 페이지 번호 검증
  // 이유: 페이지 번호가 1보다 작지 않도록 보장
  // 비유: 도서관에서 페이지 번호가 1 이상인지 확인

  const limit = 10; // 의미: 페이지당 항목 수 설정
  // 이유: 백엔드와 일치하는 기본값 설정
  // 비유: 도서관에서 한 페이지에 보여줄 대여 기록 수 설정

  return { page: validatedPage, limit }; // 의미: 페이지와 제한 파라미터 반환
  // 이유: 페이지네이션 요청에 사용
  // 비유: 도서관에서 페이지 번호와 목록 수를 준비
};
