// // api/like/queries/invalidateCacheUtil.js

// /**
//  * 의미: 캐시 무효화 유틸리티 함수
//  * 이유: 좋아요 관련 캐시를 갱신하여 최신 데이터 반영
//  * 비유: 도서관에서 모든 게시판을 최신 상태로 갱신
//  * @param {object} queryClient - React Query의 쿼리 클라이언트
//  * @param {string} postId - 포스트 ID
//  */
// export function invalidateCacheUtil(queryClient, postId) {
//   // 의미: 쿼리 클라이언트를 인자로 받아 사용
//   // 이유: 일반 함수에서 useQueryClient 훅을 호출할 수 없으므로
//   // 비유: 도서관 관리자가 직접 게시판 갱신 도구를 전달받음

//   queryClient.invalidateQueries(['likes', postId]); // 의미: 좋아요 관련 캐시 무효화
//   // 이유: 관련 데이터 갱신
//   // 비유: 대출 상태 관련 게시판 갱신

//   queryClient.invalidateQueries(['likeCount', postId]); // 의미: useLikeCountFetch의 캐시 무효화
//   // 이유: 좋아요 수를 표시하는 컴포넌트가 최신 데이터를 반영하도록
//   // 비유: 좋아요 수 게시판도 갱신
// }
