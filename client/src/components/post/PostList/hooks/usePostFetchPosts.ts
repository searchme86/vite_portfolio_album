// @file usePostFetchPosts.js
// @description PostList 전용 포스트 페칭 훅
// @reason 포스트 데이터를 페칭하고 Zustand 스토어에 저장
// @analogy 도서관에서 책 목록 가져오기
import { useEffect, useState } from 'react'; // @type {Function} - React 훅
// @description useEffect와 useState 훅 가져오기
// @reason 사이드 이펙트 처리 및 페칭 상태 관리
// @analogy 도서관에서 책 목록 가져오기 작업 준비 및 상태 관리
// @typescript {typeof import('react').useEffect} - React.useEffect 타입
// @typescript {typeof import('react').useState} - React.useState 타입

import { axiosGetPosts } from '../../../../api/like/axios/axiosGetPosts'; // @type {Function} - 포스트 데이터 페칭 함수
// @description 포스트 데이터 페칭 함수 가져오기
// @reason 백엔드에서 포스트 데이터를 가져오기
// @analogy 도서관에서 책 목록 요청 함수 가져오기
// @typescript {(options: { page: number, limit: number, token: string }) => Promise<{ posts: Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }> }>} - 함수 타입

// import { usePostStore } from '../../../../stores/post/postStore'; // @type {Object} - Zustand 스토어
import { usePostStore } from '@/stores/post/postStore';
// @description Zustand 스토어 가져오기
// @reason 상태 관리와 상태 업데이트
// @analogy 도서관에서 장부 관리 시스템 가져오기
// @typescript {Object} - Zustand 스토어 타입

// import useLikeStore from '../../../../stores/like/likeStore'; // @type {Object} - 좋아요 Zustand 스토어
import useLikeStore from '@/stores/like/likeStore';
// @description 좋아요 Zustand 스토어 가져오기
// @reason 좋아요 상태 관리와 초기화
// @analogy 도서관에서 대여 장부 관리 시스템 가져오기
// @typescript {Object} - Zustand 스토어 타입

// @description PostList 전용 포스트 페칭 훅
// @param {Object} params - 훅 매개변수
// @param {string | null} params.token - 사용자 토큰
// @param {boolean} params.isLoaded - Clerk 로딩 상태
// @param {number} params.currentPage - 현재 페이지 번호
// @typescript { params: { token: string | null, isLoaded: boolean, currentPage: number } } - 매개변수 타입
export const usePostFetchPosts = ({ token, isLoaded, currentPage }) => {
  const addPostsData = usePostStore((state) => state.addPostsData); // @type {Function} - 포스트 데이터 추가 함수
  // @description 포스트 데이터 추가 함수 가져오기
  // @reason 새 데이터를 기존 데이터에 추가
  // @analogy 도서관에서 책 목록 추가
  // @typescript {(data: { pages: Array<Array>, pageParams: Array<number> }) => void} - 함수 타입

  const setInitialLikes = useLikeStore((state) => state.setInitialLikes); // @type {Function} - 초기 좋아요 상태 설정 함수
  // @description 초기 좋아요 상태와 수 설정 함수 가져오기
  // @reason 백엔드 데이터로 초기화
  // @analogy 도서관에서 책 목록에 따라 대여 상태 초기화
  // @typescript {(posts: Array<{ _id: string, likesCount: number }>) => void} - 함수 타입

  const [hasFetched, setHasFetched] = useState(false); // @type {boolean} - 페칭 상태 관리
  // @description 페칭이 이미 완료되었는지 여부 관리
  // @reason 중복 페칭 방지
  // @analogy 도서관에서 책 목록을 이미 가져왔는지 확인
  // @typescript {boolean} - 상태 타입

  const [retryCount, setRetryCount] = useState(0); // @type {number} - 페칭 재시도 횟수
  // @description 페칭 실패 시 재시도 횟수 관리
  // @reason 안정적인 데이터 페칭 보장
  // @analogy 도서관에서 책 목록 요청 실패 시 재시도
  // @typescript {number} - 상태 타입

  useEffect(() => {
    // @description 포스트 데이터 페칭
    // @reason 백엔드에서 포스트 데이터 가져오기
    // @analogy 도서관에서 책 목록 가져오기
    const fetchPosts = async () => {
      if (token && !hasFetched && retryCount < 3) {
        try {
          const response = await axiosGetPosts({
            page: currentPage,
            limit: 10,
            token,
          }); // @type {Object} - 포스트 데이터 응답
          // @description 현재 페이지 번호로 포스트 데이터 요청
          // @reason 동적으로 페이지 데이터를 페칭
          // @analogy 도서관 창고에서 현재 선반 번호로 책 목록 요청
          // @typescript {{ posts: Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }> }} - 응답 타입

          console.log('usePostFetchPosts - Fetched response:', response); // @description 페칭된 응답 데이터 로깅
          // @reason 디버깅, 데이터 확인
          // @analogy 도서관에서 책 목록 응답 확인 기록

          console.log('Fetched posts count:', response.posts?.length); // @description 페칭된 포스트 개수 확인
          // @reason 데이터가 제대로 반환되었는지 확인
          // @analogy 도서관에서 가져온 책 개수 확인

          addPostsData({ pages: [response], pageParams: [currentPage] }); // @description 페칭한 데이터 저장
          // @reason 동적으로 현재 페이지 번호를 pageParams로 전달
          // @analogy 도서관에서 현재 선반 번호와 함께 책 목록 저장

          setInitialLikes(response.posts); // @description 초기 좋아요 상태와 수 설정
          // @reason 백엔드 데이터로 초기화, useLikeStore로 이동
          // @analogy 도서관에서 책 목록에 따라 대여 상태 초기화

          setHasFetched(true); // @description 페칭 완료 상태로 설정
          // @reason 중복 페칭 방지
          // @analogy 도서관에서 책 목록 가져오기 완료 표시

          setRetryCount(0); // @description 재시도 카운트 초기화
          // @reason 성공 시 재시도 필요 없음
          // @analogy 도서관에서 책 목록 가져오기 성공 시 재시도 중단
        } catch (error) {
          console.error('usePostFetchPosts - Error fetching posts:', error); // @description 에러 로깅
          // @reason 디버깅
          // @analogy 도서관에서 책 목록 가져오기 실패 기록

          setRetryCount((prev) => prev + 1); // @description 재시도 횟수 증가
          // @reason 페칭 실패 시 재시도
          // @analogy 도서관에서 책 목록 요청 실패 시 재시도 카운트 증가

          if (retryCount < 3) {
            setTimeout(() => fetchPosts(), 1000); // @description 1초 후 재시도
            // @reason 네트워크 문제 등으로 인한 실패 복구
            // @analogy 도서관에서 책 목록 요청 실패 후 잠시 후 재시도
          }
        }
      }
    };

    if (isLoaded) {
      fetchPosts(); // @description 페칭 실행
      // @reason 로딩 완료 후 데이터 페칭
      // @analogy 도서관에서 사서 준비 완료 후 책 목록 가져오기
    }
  }, [token, isLoaded, retryCount, currentPage]); // @type {Array} - 의존성 배열
  // @description 의존성 배열
  // @reason token, isLoaded, retryCount, currentPage 변경 시 포스트 데이터 갱신
  // @analogy 도서관에서 인증 키 변경 시 책 목록 갱신
  // @typescript {Array<unknown>} - 의존성 배열 타입

  const loadNextPage = () => {
    setHasFetched(false); // @description 페칭 가능 상태로 초기화
    // @reason 다음 페이지 페칭 허용
    // @analogy 도서관에서 다음 선반 책을 가져올 준비
  };

  return { loadNextPage }; // @type {Object} - 페이지 증가 함수 반환
  // @description 페이지 증가 함수 반환
  // @reason 외부에서 다음 페이지 로드 가능
  // @analogy 도서관에서 다음 선반으로 이동하는 버튼 제공
  // @typescript {{ loadNextPage: () => void }} - 반환 타입
};
