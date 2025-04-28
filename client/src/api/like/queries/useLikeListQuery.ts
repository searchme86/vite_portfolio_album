// src/api/like/queries/useLikeListQuery.js

import { useInfiniteQuery } from '@tanstack/react-query'; // 의미: 리액트 쿼리 훅 가져오기
// 이유: 무한 스크롤 페이지네이션 관리
// 비유: 도서관에서 대여 기록 목록을 페이지별로 조회하는 도구

import { axiosGetLikeList } from '../axios/axiosGetLikeList'; // 의미: 좋아요 목록 조회 함수 가져오기
// 이유: 백엔드 API 호출
// 비유: 도서관에서 대여 기록 목록 조회 요청서

import { getPaginationParams } from '../utils/paginationParamsUtil'; // 의미: 페이지네이션 파라미터 유틸 가져오기
// 이유: 페이지와 제한 파라미터 생성
// 비유: 도서관에서 페이지와 목록 수를 정리하는 도구

// 여기부터 시작===
// 의미: 특정 포스트의 좋아요 목록 조회 쿼리 훅, safeGetToken 추가
// 이유: 인증 토큰을 API 요청에 추가
// 비유: 도서관에서 책의 좋아요 목록을 확인하고 손님에게 알림
export const useLikeListQuery = (postId, safeGetToken) => {
  return useInfiniteQuery({
    queryKey: ['likes', postId, 'list'], // 의미: 캐시 키 설정
    // 이유: 동일한 포스트 ID와 목록에 대한 캐싱
    // 비유: 도서관에서 특정 책의 대여 기록 목록을 위한 선반 위치
    queryFn: async ({ pageParam = 1 }) => {
      const { page, limit } = getPaginationParams(pageParam); // 의미: 페이지와 제한 파라미터 생성
      // 이유: 페이지네이션 파라미터 설정
      // 비유: 도서관에서 페이지 번호와 목록 수 준비
      const token = safeGetToken ? await safeGetToken() : null; // 의미: 인증 토큰 가져오기 <!---여기추가
      // 이유: API 요청 헤더에 토큰 추가
      // 비유: 도서관에서 손님의 회원증 번호 확인
      return await axiosGetLikeList(postId, token, page, limit); // 의미: 좋아요 목록 조회, 토큰 전달 <!---여기수정
      // 이유: 백엔드에서 페이지별 데이터 조회
      // 비유: 도서관에서 페이지별 대여 기록 목록 조회
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined; // 의미: 다음 페이지 여부 반환
      // 이유: 더 많은 데이터가 있으면 다음 페이지 번호 반환
      // 비유: 도서관에서 더 볼 대여 기록이 있으면 다음 페이지 번호 제공
    },
    enabled: !!postId, // 의미: postId가 있을 때만 쿼리 실행
    // 이유: 유효하지 않은 요청 방지
    // 비유: 도서관에서 책 번호가 있을 때만 대여 기록 조회
  });
};
// 여기부터 끝===
