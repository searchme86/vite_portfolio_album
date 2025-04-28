export const getDefaultPageNumber = () => {
  // 의미: 페이지 번호의 기본값 반환
  // 이유: 쿼리에서 페이지가 없거나 유효하지 않을 때 대비
  // 비유: 도서관에서 몇 페이지 책을 읽을지 안 정하면 첫 페이지부터 시작
  return 1;
};

export const getDefaultLimitNumber = () => {
  // 의미: 페이지당 포스트 수의 기본값 반환
  // 이유: 쿼리에서 제한이 없거나 유효하지 않을 때 대비
  // 비유: 한 번에 몇 권 빌릴지 안 정하면 2권만 빌리기로 함
  return 2;
};

export const getDefaultTagValue = () => {
  // 의미: 태그의 기본값 반환 (빈 문자열)
  // 이유: 쿼리에서 태그가 없을 때 기본 처리 제공
  // 비유: 책 주제를 안 정하면 "아무 주제"로 시작
  return '';
};
