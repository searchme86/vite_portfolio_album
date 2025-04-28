// src/api/like/queries/useCheckLikeStatusQuery.js

import { useQuery } from '@tanstack/react-query'; // 의미: 리액트 쿼리 훅 가져오기
// 이유: 데이터 패칭과 캐싱 관리
// 비유: 도서관에서 좋아요 상태 조회 도구

import { axiosCheckLikeStatus } from '../axios/axiosCheckLikeStatus'; // 의미: 좋아요 상태 조회 함수 가져오기
// 이유: 백엔드 API 호출
// 비유: 도서관에서 좋아요 상태 조회 요청서

// 의미: 특정 포스트의 좋아요 상태 조회 쿼리 훅
// 이유: 컴포넌트에서 유저의 좋아요 상태를 패칭하고 상태 관리
// 비유: 도서관에서 손님이 책에 좋아요를 눌렀는지 확인하고 알림
export const useCheckLikeStatusQuery = (postId, safeGetToken) => {
  return useQuery({
    queryKey: ['likeStatus', postId], // 의미: 캐시 키 설정
    // 이유: 캐시 식별을 위해 포스트 ID 포함
    // 비유: 도서관에서 특정 책의 좋아요 상태를 캐싱하기 위한 식별자
    queryFn: async () => {
      const token = safeGetToken ? await safeGetToken() : null; // 의미: 인증 토큰 가져오기
      // 이유: API 요청 헤더에 토큰 추가
      // 비유: 도서관에서 손님의 회원증 번호 확인
      return await axiosCheckLikeStatus(postId, token); // 의미: 좋아요 상태 조회 API 호출
      // 이유: 포스트 ID와 토큰을 전달하여 좋아요 상태 반환
      // 비유: 도서관에서 책의 좋아요 상태 확인
    },
    enabled: !!postId && !!safeGetToken, // 의미: postId와 safeGetToken이 있을 때만 쿼리 실행
    // 이유: 유효하지 않은 요청 방지
    // 비유: 도서관에서 책 번호와 회원증이 있을 때만 상태 확인
  });
};
