import { useQuery } from '@tanstack/react-query'; // 의미: React Query의 useQuery 훅 가져오기
// 이유: 데이터 패칭과 캐싱 관리
// 비유: 도서관에서 책 정보를 가져오는 도구

import { useAuth } from '@clerk/clerk-react'; // 의미: Clerk 인증 훅 가져오기
// 이유: 사용자 인증 상태 확인
// 비유: 도서관에서 손님의 회원증 확인 도구

import { axiosGetLikeCount } from '../../../../api/like/axios/axiosGetLikeCount'; // 의미: 좋아요 카운트 조회 API 함수 가져오기
// 이유: 백엔드에서 좋아요 수 가져오기
// 비유: 도서관에서 책의 좋아요 수를 확인하는 요청

// 의미: 좋아요 카운트를 가져오는 커스텀 훅
// 이유: 포스트별 좋아요 수를 가져오기
// 비유: 도서관에서 책마다 몇 명이 좋아했는지 확인
export function useLikeCountFetch(postId, initialCount) {
  console.log('useLikeCountFetch - Hook called, postId:', postId); // 의미: 훅 호출 디버깅
  // 이유: postId 값 확인
  // 비유: 손님이 요청한 책 번호 확인 로그

  const { isLoaded, isSignedIn, getToken } = useAuth(); // 의미: 인증 상태와 토큰 가져오기
  // 이유: 사용자 인증 여부와 토큰 필요
  // 비유: 손님의 회원증 확인

  const queryResult = useQuery({
    queryKey: ['likeCount', postId], // 의미: 쿼리 키 설정
    // 이유: React Query 캐싱 및 데이터 패칭 관리
    // 비유: 도서관에서 특정 책의 좋아요 수를 저장할 서랍
    queryFn: async () => {
      if (!isLoaded || !isSignedIn) {
        // 의미: 인증 상태 확인
        // 이유: 인증되지 않은 경우 기본값 반환
        // 비유: 회원증 없는 손님은 기본값 처리
        return 0;
      }

      const token = await getToken(); // 의미: 인증 토큰 가져오기
      // 이유: API 요청 시 인증 필요
      // 비유: 손님의 회원증으로 인증

      const response = await axiosGetLikeCount(postId, token); // 의미: 좋아요 카운트 조회
      // 이유: 백엔드에서 데이터 가져오기
      // 비유: 도서관에서 좋아요 수 확인 요청

      return response?.count ?? 0; // 의미: 응답에서 카운트 반환, 없으면 0
      // 이유: 안전한 값 반환
      // 비유: 책의 좋아요 수가 없으면 0으로 처리
    },
    enabled: isLoaded && isSignedIn, // 의미: 쿼리 활성화 조건
    // 이유: 인증 완료 시에만 실행
    // 비유: 회원증 확인 후에만 요청 처리
    initialData: initialCount || 0, // 의미: 초기 데이터 설정, 부모로부터 받은 값을 사용
    // 이유: 로딩 중일 때 부모로부터 받은 값을 우선 표시
    // 비유: 손님이 기다리는 동안 부모가 제공한 값을 표시
  });

  return {
    data: queryResult.data, // 의미: 쿼리 데이터 반환
    // 이유: 컴포넌트에서 사용
    // 비유: 손님에게 좋아요 수 전달
    isLoading: queryResult.isLoading, // 의미: 로딩 상태 반환
    // 이유: UI에서 로딩 상태 표시
    // 비유: 손님에게 처리 중임을 알림
    error: queryResult.error, // 의미: 에러 반환
    // 이유: 에러 발생 시 처리
    // 비유: 손님에게 문제 발생 알림
  };
}
