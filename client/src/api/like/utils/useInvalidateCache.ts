// api/like/utils/useInvalidateCache.js

import { useQueryClient } from '@tanstack/react-query'; // 의미: React Query의 쿼리 클라이언트 가져오기
// 이유: 캐시 무효화를 위해 필요
// 비유: 도서관에서 게시판 갱신 도구를 가져옴

// 의미: 캐시 무효화 유틸리티 함수
// 이유: 좋아요 관련 캐시를 갱신하여 최신 데이터 반영
// 비유: 도서관에서 모든 게시판을 최신 상태로 갱신
function invalidateCacheUtil(queryClient, postId) {
  // 의미: 쿼리 클라이언트를 인자로 받아 사용
  // 이유: 일반 함수에서 useQueryClient 훅을 호출할 수 없으므로
  // 비유: 도서관 관리자가 직접 게시판 갱신 도구를 전달받음
  queryClient.invalidateQueries(['likes', postId]); // 의미: 좋아요 관련 캐시 무효화
  // 이유: 관련 데이터 갱신
  // 비유: 대출 상태 관련 게시판 갱신

  queryClient.invalidateQueries(['likeCount', postId]); // 의미: useLikeCountFetch의 캐시 무효화
  // 이유: 좋아요 수를 표시하는 컴포넌트가 최신 데이터를 반영하도록
  // 비유: 좋아요 수 게시판도 갱신
}

// 의미: 캐시 무효화 커스텀 훅
// 이유: 여러 컴포넌트에서 재사용 가능
// 비유: 도서관에서 게시판 갱신 도구를 창고에 보관
export function useInvalidateCache(postId) {
  const queryClient = useQueryClient(); // 의미: 쿼리 클라이언트 가져오기
  // 이유: 캐시 무효화에 필요
  // 비유: 도서관 관리자가 게시판 갱신 도구 준비

  // 의미: 캐시 무효화 함수 반환
  // 이유: 좋아요 토글 후 캐시 갱신
  // 비유: 게시판을 갱신하는 동작 정의
  const invalidate = () => {
    invalidateCacheUtil(queryClient, postId); // 의미: 캐시 무효화 실행
    // 이유: 내부 유틸리티 함수 호출
    // 비유: 관리자 도구를 사용하여 게시판 갱신
  };

  return invalidate; // 의미: 캐시 무효화 함수 반환
  // 이유: 컴포넌트에서 사용
  // 비유: 도서관에서 갱신 도구를 손님에게 전달
}
