/**
 * @file toggleLikeMutation.js
 * @description 좋아요 토글 뮤테이션을 위한 React Query 훅
 * @reason 좋아요 상태 변경 요청과 캐시 관리
 * @analogy 도서관에서 대여 요청과 선반 정리
 */
import { useMutation } from '@tanstack/react-query'; // @type {Function} - 리액트 쿼리 훅
// @description 리액트 쿼리 훅 가져오기
// @reason 뮤테이션과 캐시 관리를 위해 사용
// @analogy 도서관에서 대여 요청(뮤테이션)과 선반 정리(캐시 관리)를 위한 도구

import { axiosToggleLikeForUser } from '../axios/axiosToggleLikeForUser'; // @type {Function} - 좋아요 토글 함수
// @description 좋아요 토글 함수 가져오기
// @reason 좋아요 토글 요청
// @analogy 도서관에서 손님의 대여 요청서를 처리

export const useToggleLikeMutation = (isAuthenticated, safeGetToken) => {
  return useMutation({
    mutationFn: async (postId) => {
      console.log(
        'useToggleLikeMutation - Mutation started for postId:',
        postId
      );

      const token = safeGetToken ? await safeGetToken() : null;
      // 추가된 로그: 토큰 값 확인
      console.log('useToggleLikeMutation - Retrieved token:', token);

      console.log('useToggleLikeMutation - Mutation params:', {
        postId,
        token,
        isAuthenticated,
      });

      try {
        const response = await axiosToggleLikeForUser(postId, token);
        console.log('useToggleLikeMutation - Mutation response:', response);
        return response;
      } catch (error) {
        console.error('useToggleLikeMutation - API call failed:', {
          message: error.message,
          stack: error.stack,
          response: error.response ? error.response.data : null,
        });
        throw error;
      }
    },
    onError: (error) => {
      console.error('useToggleLikeMutation - Toggle like mutation error:', {
        message: error.message,
        stack: error.stack,
      });
    },
  });
};
