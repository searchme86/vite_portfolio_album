// src/api/like/queries/usePopularPostsQuery.js

import { useQuery } from '@tanstack/react-query'; // 의미: React Query 훅 가져오기
// 이유: 데이터 패칭 및 캐싱
// 비유: 도서관에서 책 목록 요청 및 캐싱
import { axiosGetPopularPosts } from '../axios/axiosGetPopularPosts'; // 의미: API 요청 함수 가져오기
// 이유: 백엔드 요청
// 비유: 도서관에서 창고에 요청 보내기

// 의미: 인기 포스트 조회 쿼리 훅
// 이유: 페이지네이션으로 인기 포스트 조회
// 비유: 도서관에서 페이지별 인기 책 목록 요청
export const usePopularPostsQuery = (token, page, limit) => {
  console.log('usePopularPostsQuery - Calling axiosGetPopularPosts'); // 의미: 쿼리 호출 로그
  // 이유: 디버깅 용도
  // 비유: 도서관에서 창고에 요청 보내는 과정 확인

  return useQuery({
    queryKey: ['popularPosts', page, limit], // 의미: 쿼리 키 설정
    // 이유: 캐싱 및 쿼리 식별
    // 비유: 도서관에서 요청을 구분하는 라벨
    queryFn: async () => {
      console.log(
        'usePopularPostsQuery - getToken: async (options) => { ... }'
      ); // 의미: 토큰 함수 로그
      // 이유: 토큰 함수 디버깅
      // 비유: 도서관에서 회원증 준비 확인

      const response = await axiosGetPopularPosts(token, page, limit); // 의미: API 요청
      // 이유: 백엔드에서 데이터 패칭
      // 비유: 도서관에서 창고에 책 목록 요청

      console.log(
        'usePopularPostsQuery - axiosGetPopularPosts response:',
        response
      ); // 의미: 응답 데이터 로그
      // 이유: 응답 데이터 디버깅
      // 비유: 도서관에서 창고 응답 확인

      // 여기부터 시작===
      if (!response || !response.data) {
        throw new Error('Failed to fetch popular posts'); // 의미: 응답 또는 데이터 없음 처리
        // 이유: 실제 에러 발생 시 에러 던짐
        // 비유: 창고에서 응답이 없으면 실패로 처리
      }

      const { popularPosts, totalPopularPosts, hasMore } = response.data; // 의미: 응답 데이터 구조 분해
      // 이유: 필요한 데이터 추출
      // 비유: 창고에서 받은 책 목록과 정보 분리

      // 빈 데이터를 에러로 처리하지 않음
      if (!Array.isArray(popularPosts)) {
        throw new Error('Invalid popular posts data'); // 의미: 데이터 형식 에러 처리
        // 이유: 데이터가 배열 형식이 아닌 경우 에러
        // 비유: 책 목록이 리스트 형식이 아니면 실패로 처리
      }

      return { popularPosts, totalPopularPosts, hasMore }; // 의미: 데이터 반환
      // 이유: 쿼리 훅에서 사용
      // 비유: 도서관에서 받은 책 목록과 정보 전달
      // 여기부터 끝===
    },
    enabled: !!token, // 의미: 토큰 존재 시 쿼리 활성화
    // 이유: 토큰 없으면 요청 보내지 않음
    // 비유: 회원증 없으면 창고에 요청 안 보냄
  });
};
