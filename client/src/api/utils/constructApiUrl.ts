// // 의미: API URL을 구성하는 유틸리티 함수
// // 이유: URL 생성 로직을 독립적으로 관리하여 재사용 가능하게 함
// // 비유: 도서관에서 창고 요청서 주소를 따로 작성하는 부서
// export const constructApiUrl = (baseUrl, path, page, limit) => {
//   // 의미: 기본 URL이 없으면 로컬호스트로 설정
//   // 이유: 환경 변수가 누락될 경우를 대비
//   // 비유: 주소록이 없으면 기본 창고 주소 사용
//   const apiBaseUrl = baseUrl || 'http://localhost:3000';

//   // 의미: page와 limit이 유효한지 확인
//   // 이유: 잘못된 쿼리 파라미터를 방지
//   // 비유: 요청서에 페이지와 개수 정보가 제대로 적혔는지 확인
//   const validatedPage = typeof page === 'string' ? page : '1';
//   const validatedLimit = typeof limit === 'number' ? limit : 10;

//   // 의미: 최종 URL 구성
//   // 이유: API 요청에 필요한 경로와 쿼리 파라미터를 조합
//   // 비유: 도서관에서 창고에 보낼 요청서 주소 작성
//   return `${apiBaseUrl}${path}?page=${validatedPage}&limit=${validatedLimit}`;
// };

// constructApiUrl.js (../../../../api/like/axios/constructApiUrl)

export const constructApiUrl = (baseUrl, path, page, limit) => {
  const apiBaseUrl = baseUrl || 'http://localhost:3000';
  const validatedPage = typeof page === 'string' ? page : '1';
  const validatedLimit = typeof limit === 'number' ? limit : 10;
  return `${apiBaseUrl}${path}?page=${validatedPage}&limit=${validatedLimit}`;
};
