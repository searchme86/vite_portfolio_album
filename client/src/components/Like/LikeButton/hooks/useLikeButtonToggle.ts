import { useMutation, useQueryClient } from '@tanstack/react-query'; // 의미: React Query 훅 가져오기
// 이유: 데이터 변경 및 캐시 관리
// 비유: 도서관에서 대출 상태 변경 및 게시판 갱신 도구

import { useAuth } from '@clerk/clerk-react'; // 의미: Clerk 인증 훅 가져오기
// 이유: 사용자 인증 상태 확인
// 비유: 도서관에서 손님의 회원증 확인 도구

import { toggleLikeMutation } from '../../../../api/like/mutations/toggleLikeMutation'; // 의미: 좋아요 토글 뮤테이션 함수 가져오기
// 이유: 백엔드에서 좋아요 상태 변경
// 비유: 도서관에서 책 대출/반납 요청

import { invalidateCacheUtil } from '../../../../api/like/utils/invalidateCacheUtil'; // 의미: 캐시 무효화 유틸리티 가져오기
// 이유: 좋아요 토글 후 캐시 갱신
// 비유: 게시판 갱신 도구 가져오기

// 의미: 캐시 무효화 커스텀 훅
// 이유: useQueryClient를 안전하게 사용하기 위해
// 비유: 도서관 사서가 게시판 갱신 도구를 사용하는 규칙
function useInvalidateCache(postId) {
  const queryClient = useQueryClient(); // 의미: React Query의 쿼리 클라이언트 가져오기
  // 이유: 캐시 무효화를 위해 필요
  // 비유: 도서관에서 모든 게시판을 갱신하는 관리자 도구

  // 의미: 캐시 무효화 함수 반환
  // 이유: 좋아요 토글 후 캐시 갱신
  // 비유: 게시판을 갱신하는 동작 정의
  const invalidate = () => {
    invalidateCacheUtil(queryClient, postId); // 의미: 캐시 무효화 실행
    // 이유: 외부 유틸리티에 queryClient 전달
    // 비유: 관리자 도구를 사용하여 게시판 갱신
  };

  return invalidate;
}

// 의미: 좋아요 버튼 토글 훅
// 이유: 좋아요 상태 변경 및 UI 업데이트
// 비유: 도서관에서 대출 버튼 동작 관리
export function useLikeButtonToggle(postId) {
  const { isLoaded, isSignedIn, getToken } = useAuth(); // 의미: 인증 상태와 토큰 가져오기
  // 이유: 사용자 인증 여부와 토큰 필요
  // 비유: 손님의 회원증 확인

  const invalidateCache = useInvalidateCache(postId); // 의미: 캐시 무효화 훅 호출
  // 이유: 좋아요 토글 후 캐시 갱신
  // 비유: 게시판 갱신 준비

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isLoaded) {
        throw new Error('Authentication not loaded'); // 의미: 인증 미완료 시 에러
        // 이유: 요청 방지
        // 비유: 회원증 확인이 완료되지 않으면 요청 중단
      }

      const token = isSignedIn ? await getToken() : null; // 의미: 인증 토큰 가져오기
      // 이유: API 요청 시 인증 필요
      // 비유: 손님의 회원증으로 인증

      return toggleLikeMutation(postId, token); // 의미: 좋아요 토글 뮤테이션 실행
      // 이유: 백엔드에서 좋아요 상태 변경
      // 비유: 도서관에서 책 대출/반납 요청
    },
    onSuccess: () => {
      // 의미: 좋아요 토글 성공 후 캐시 무효화
      // 이유: useLikeCountFetch의 캐시를 갱신하여 최신 좋아요 수 반영
      // 비유: 대출 상태 변경 후 게시판 갱신
      invalidateCache(); // 의미: 캐시 무효화 호출
      // 이유: 커스텀 훅을 통해 안전하게 캐시 갱신
      // 비유: 사서가 게시판 갱신 도구를 사용
    },
    onError: (error) => {
      console.error('useLikeButtonToggle - Error toggling like:', error); // 의미: 에러 로깅
      // 이유: 디버깅
      // 비유: 대출 실패 원인 기록
    },
  });

  return {
    toggleLike: mutation.mutate, // 의미: 토글 함수 반환
    // 이유: 컴포넌트에서 호출 가능
    // 비유: 대출 버튼 클릭 가능
    isLoading: mutation.isLoading, // 의미: 로딩 상태 반환
    // 이유: UI에서 로딩 표시
    // 비유: 손님에게 처리 중 알림
    error: mutation.error, // 의미: 에러 반환
    // 이유: 에러 발생 시 처리
    // 비유: 손님에게 문제 발생 알림
  };
}
