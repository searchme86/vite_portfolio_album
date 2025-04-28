// 여기부터 시작===

import { useQuery } from '@tanstack/react-query'; // 의미: 데이터 페칭 훅 가져오기
// 이유: 서버에서 좋아요 상태를 가져오기 위해 사용
// 비유: 도서관에서 책의 좋아요 상태 확인

import { useAuth } from '@clerk/clerk-react'; // 의미: Clerk 인증 훅 가져오기
// 이유: 인증 상태 확인 및 토큰 가져오기
// 비유: 도서관에서 회원증 확인

import { axiosCheckLikeStatus } from '../../../../api/like/axios/axiosCheckLikeStatus'; // 의미: 좋아요 상태 조회 함수 가져오기
// 이유: 백엔드에서 좋아요 상태를 가져오기 위해 필요
// 비유: 도서관에서 책의 좋아요 상태 요청
// <!---여기수정: 경로를 사용자가 요청한 대로 수정

// 의미: 좋아요 상태를 가져오는 커스텀 훅
// 이유: 포스트별 좋아요 상태를 가져오기
// 비유: 도서관에서 내가 책을 좋아했는지 확인
export function useLikeButtonState(postId) {
  // 의미: 훅 호출 로그
  // 이유: 디버깅을 위해 훅 호출 확인
  // 비유: 도서관에서 요청 기록 남기기
  console.log('useLikeButtonState - Hook called, postId:', postId);

  // 의미: 인증 상태와 토큰 가져오기
  // 이유: API 요청에 필요한 인증 정보 확인
  // 비유: 도서관에서 회원증 확인
  const { isLoaded, isSignedIn, getToken } = useAuth();

  // 의미: 좋아요 상태 조회 쿼리 설정
  // 이유: React Query를 사용해 데이터 페칭
  // 비유: 도서관에서 책의 좋아요 상태 조회
  const queryResult = useQuery({
    queryKey: ['likeStatus', postId], // 의미: 쿼리 캐시 키
    // 이유: 동일한 포스트의 좋아요 상태를 캐시
    // 비유: 같은 책의 좋아요 상태를 다시 요청하지 않도록 기록
    queryFn: async () => {
      // 의미: 인증이 완료되지 않았을 경우 기본값 반환
      // 이유: API 요청을 하지 않음
      // 비유: 회원증이 없으면 요청하지 않음
      if (!isLoaded || !isSignedIn) {
        return { isLiked: false };
      }

      // 의미: 토큰 가져오기
      // 이유: API 요청에 필요한 인증 토큰
      // 비유: 요청서에 회원증 붙이기
      const token = await getToken();
      console.log('useLikeButtonState - Token resolved:', token);

      // 의미: 좋아요 상태 조회
      // 이유: 백엔드에서 데이터 가져오기
      // 비유: 도서관에서 좋아요 상태 확인 요청
      const response = await axiosCheckLikeStatus(postId, token);

      // 의미: 응답 데이터 로그
      // 이유: 디버깅을 위해 결과 확인
      // 비유: 도서관에서 받은 좋아요 상태 확인
      console.log('useLikeButtonState - Extracted isLiked:', response?.isLiked);

      // 의미: 응답 데이터 반환
      // 이유: 쿼리 훅에서 사용할 데이터 제공
      // 비유: 도서관에서 받은 좋아요 상태 정리
      return { isLiked: response?.isLiked ?? false };
    },
    enabled: isLoaded && isSignedIn, // 의미: 쿼리 실행 조건
    // 이유: 인증이 완료된 경우에만 실행
    // 비유: 회원증이 준비된 경우에만 요청
    initialData: { isLiked: false }, // 의미: 초기 데이터 설정
    // 이유: 데이터가 로드되기 전에 false로 초기화하여 undefined 방지
    // 비유: 좋아요 상태가 없어도 false로 시작
  });

  // 의미: 쿼리 결과 반환
  // 이유: 컴포넌트에서 사용할 데이터 제공
  // 비유: 도서관에서 받은 좋아요 상태 전달
  return {
    isLiked: queryResult.data.isLiked,
    stateLoading: queryResult.isLoading, // <!---여기수정: stateLoading 값을 올바르게 설정
    // 의미: 로딩 상태를 명확히 반환
    // 이유: undefined가 아닌 실제 로딩 상태를 제공
    // 비유: 도서관에서 좋아요 상태 확인 중인지 알려줌
    stateError: queryResult.error, // <!---여기수정: stateError 값을 올바르게 설정
    // 의미: 에러 상태를 명확히 반환
    // 이유: undefined가 아닌 실제 에러 상태를 제공
    // 비유: 도서관에서 좋아요 상태 확인 실패 시 에러 알려줌
  };
}

// 여기부터 끝===
