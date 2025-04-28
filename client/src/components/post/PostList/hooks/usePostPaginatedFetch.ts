// @file usePostPaginatedFetch.js
// @description 포스트 데이터를 페이지네이션으로 페칭하는 훅
// @reason 페이지네이션을 관리하여 여러 페이지 데이터를 페칭
// @analogy 도서관에서 선반 번호를 관리하며 책 목록 가져오기
import { useState, useCallback } from 'react'; // @type {Function} - React 훅
// @description useState와 useCallback 훅 가져오기
// @reason 상태 관리와 함수 메모이제이션
// @analogy 도서관에서 선반 번호 관리와 책 가져오기 준비
// @typescript {typeof import('react').useState} - React.useState 타입
// @typescript {typeof import('react').useCallback} - React.useCallback 타입

import { usePostFetchPosts } from './usePostFetchPosts'; // @type {Function} - 포스트 페칭 훅
// @description 포스트 페칭 훅 가져오기
// @reason 페이지 데이터를 페칭
// @analogy 도서관에서 책 목록 페칭 도구 가져오기
// @typescript {(params: { token: string | null, isLoaded: boolean }) => { loadNextPage: () => void }} - 훅 타입

// @description 포스트 데이터를 페이지네이션으로 페칭하는 훅
// @param {Object} params - 훅 매개변수
// @param {string | null} params.token - 사용자 토큰
// @param {boolean} params.isLoaded - Clerk 로딩 상태
// @returns {Object} - 페이지네이션 관련 상태와 함수
// @typescript { params: { token: string | null, isLoaded: boolean } } - 매개변수 타입
export const usePostPaginatedFetch = ({ token, isLoaded }) => {
  const [currentPage, setCurrentPage] = useState(1); // @type {number} - 현재 페이지 번호
  // @description 현재 페칭할 페이지 번호 관리
  // @reason 동적으로 페이지 번호를 전달하여 여러 페이지 페칭 가능
  // @analogy 도서관에서 현재 가져올 선반 번호 관리
  // @typescript {number} - 상태 타입

  const { loadNextPage: fetchNextPage } = usePostFetchPosts({
    token,
    isLoaded,
    currentPage, // @description 현재 페이지 번호 전달
    // @reason 페이지 번호에 따라 데이터 페칭
    // @analogy 도서관에서 현재 선반 번호로 책 목록 요청
  });

  const loadNextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1); // @description 페이지 번호 증가
    // @reason 다음 페이지 번호로 업데이트
    // @analogy 도서관에서 다음 선반 번호로 이동

    fetchNextPage(); // @description 다음 페이지 데이터 페칭
    // @reason 페이지 번호 증가 후 데이터 페칭
    // @analogy 도서관에서 다음 선반의 책 목록 가져오기
  }, [fetchNextPage]);

  return {
    currentPage, // @type {number} - 현재 페이지 번호
    // @description 현재 페이지 번호 반환
    // @reason 외부에서 현재 페이지 확인 가능
    // @analogy 도서관에서 현재 선반 번호 확인
    loadNextPage, // @type {Function} - 다음 페이지 로드 함수
    // @description 다음 페이지 로드 함수 반환
    // @reason 외부에서 다음 페이지 로드 가능
    // @analogy 도서관에서 다음 선반으로 이동하는 버튼
  }; // @typescript {{ currentPage: number, loadNextPage: () => void }} - 반환 타입
};
