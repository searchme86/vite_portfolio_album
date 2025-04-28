// api/like/queries/useLikeCountQuery.js

import { useQuery } from '@tanstack/react-query'; // 의미: 리액트 쿼리 훅 가져오기
// 이유: 데이터 패칭과 캐싱 관리
// 비유: 도서관에서 책 대여 횟수 조회 도구

import { axiosGetLikeCount } from '../axios/axiosGetLikeCount'; // 의미: 좋아요 수 조회 함수 가져오기
// 이유: 백엔드 API 호출
// 비유: 도서관에서 대여 횟수 조회 요청서

// 의미: 특정 포스트의 좋아요 수 조회 쿼리 훅
// 이유: 컴포넌트에서 좋아요 수를 패칭하고 상태 관리
// 비유: 도서관에서 책의 좋아요 수를 확인하고 손님에게 알림
export const useLikeCountQuery = (postId) => {
  return useQuery({
    queryKey: ['likes', postId], // 의미: 캐시 키 설정
    // 이유: 캐시 식별을 위해 포스트 ID 포함
    // 비유: 도서관에서 특정 책의 좋아요 수를 캐싱하기 위한 식별자
    queryFn: () => axiosGetLikeCount(postId), // 의미: 데이터 패칭 함수
    // 이유: 백엔드에서 좋아요 수 조회
    // 비유: 도서관에서 책 대여 횟수 확인
    enabled: !!postId, // 의미: postId가 있을 때만 쿼리 실행
    // 이유: 유효하지 않은 요청 방지
    // 비유: 도서관에서 책 번호가 있을 때만 대여 횟수 확인
  });
};
