// api/like/queries/useFetchPopularPostsQuery.js

import { useInfiniteQuery } from '@tanstack/react-query'; // 의미: React Query의 useInfiniteQuery 훅 가져오기
// 이유: 무한 스크롤 데이터 패칭
// 비유: 도서관에서 페이지를 넘기며 책 목록 가져오기

import { useAuth } from '@clerk/clerk-react'; // 의미: Clerk 인증 훅 가져오기
// 이유: 사용자 인증 상태 확인
// 비유: 도서관에서 손님의 회원증 확인 도구

import { axiosGetPopularPosts } from '../axios/axiosGetPopularPosts.js'; // 의미: 인기 포스트 조회 API 함수 가져오기
// 이유: 백엔드에서 인기 포스트 가져오기
// 비유: 도서관에서 인기 책 목록 요청

// 의미: 인기 포스트 무한 쿼리 훅
// 이유: 무한 스크롤로 인기 포스트 조회
// 비유: 도서관에서 페이지별 인기 책 목록 무한 요청
export const useFetchPopularPostsQuery = (limit) => {
  const { getToken } = useAuth(); // 의미: 인증 토큰 가져오기
  // 이유: API 요청 시 인증 필요
  // 비유: 손님의 회원증으로 인증

  const tokenPromise = getToken(); // 의미: 토큰 비동기 요청
  // 이유: 인증 토큰을 비동기적으로 가져옴
  // 비유: 손님의 회원증을 준비
  console.log('useFetchPopularPostsQuery - Token promise created'); // 의미: 토큰 요청 디버깅
  // 이유: 토큰 요청 상태 확인
  // 비유: 회원증 준비 로그

  return useInfiniteQuery({
    queryKey: ['popularPosts', limit], // 의미: 쿼리 키 설정
    // 이유: React Query 캐싱 및 데이터 패칭 관리
    // 비유: 도서관에서 인기 책 목록을 저장할 서랍
    queryFn: async ({ pageParam = 1 }) => {
      console.log('useFetchPopularPostsQuery - Fetching page:', pageParam); // 의미: 페이지 요청 디버깅
      // 이유: 요청된 페이지 확인
      // 비유: 요청된 페이지 번호 확인 로그

      const token = await tokenPromise; // 의미: 토큰 가져오기
      // 이유: API 요청 시 필요
      // 비유: 손님의 회원증 확인
      console.log('useFetchPopularPostsQuery - Token resolved:', token); // 의미: 토큰 획득 디버깅
      // 이유: 토큰 상태 확인
      // 비유: 회원증 확인 로그

      const response = await axiosGetPopularPosts(token, pageParam, limit); // 의미: 인기 포스트 조회
      // 이유: 백엔드에서 데이터 가져오기
      // 비유: 도서관에서 인기 책 목록 요청
      console.log('useFetchPopularPostsQuery - Response:', response); // 의미: 응답 디버깅
      // 이유: 응답 데이터 확인
      // 비유: 요청 결과 확인 로그

      // 여기부터 시작===
      // 의미: 응답 데이터에서 직접 구조 분해
      // 이유: axiosGetPopularPosts가 이미 { posts, hasMore } 형태로 반환 (response.data 아님)
      // 비유: 도서관에서 상자가 아니라 바로 책 목록을 받음
      const { posts: popularPosts, hasMore } = response; // <!---여기수정: response.data가 아니라 response에서 직접 구조 분해
      // totalPopularPosts는 응답에 없으므로 제거
      if (!Array.isArray(popularPosts)) {
        throw new Error('Invalid popular posts data');
      }
      return { popularPosts, totalPopularPosts: popularPosts.length, hasMore }; // totalPopularPosts는 대체값으로 계산
      // 여기부터 끝===
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log('useFetchPopularPostsQuery - getNextPageParam:', {
        lastPage,
        allPages,
      }); // 의미: 다음 페이지 계산 디버깅
      // 이유: 페이지네이션 상태 확인
      // 비유: 다음 페이지 여부 확인 로그
      return lastPage.hasMore ? allPages.length + 1 : undefined; // 의미: 다음 페이지 번호 계산
      // 이유: 무한 스크롤 페이지네이션
      // 비유: 다음 페이지가 있으면 페이지 번호 증가
    },
    enabled: !!getToken, // 의미: 쿼리 활성화 조건
    // 이유: 토큰이 있을 때만 실행
    // 비유: 회원증 확인 후에만 요청 처리
  });
};
