// src/api/post/write/useCreatePostMutation.js

// ===여기부터 코드 작업시작======
// 1. 포스트 생성을 위한 React Query 뮤테이션 훅
// 2. createPostApi를 사용하여 서버 요청
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createPostApi } from './createPostApi';

// 1. useCreatePostMutation 훅 정의
// 2. 포스트 생성 뮤테이션 로직 처리
export const useCreatePostMutation = (safeGetToken, safeNavigate) => {
  // 1. React Query 클라이언트 가져오기
  // 2. 캐시 무효화에 사용
  const queryClient = useQueryClient();

  // 1. queryClient가 유효한지 확인
  // 2. 오류 방지를 위해 폴백 처리
  const safeQueryClient =
    queryClient && typeof queryClient.invalidateQueries === 'function'
      ? queryClient
      : {
          invalidateQueries: () => {
            console.log(
              'useCreatePostMutation - Fallback invalidateQueries called'
            );
          },
        };

  // 1. 뮤테이션 정의
  // 2. createPostApi를 호출하여 포스트 생성
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      // 1. 인증 토큰을 저장할 변수
      // 2. 기본값은 빈 문자열
      let token = '';

      // 여기부터 시작===
      // <!---여기수정
      // 1. safeGetToken 호출 시 에러 처리
      // 2. 토큰 가져오기 실패 시 폴백 처리
      try {
        token = await safeGetToken();
        console.log('useCreatePostMutation - Token retrieved:', token);
      } catch (tokenError) {
        // 1. 토큰 가져오기 실패 시 에러 로그
        // 2. 디버깅을 위해 에러 정보 출력
        console.error(
          'useCreatePostMutation - Failed to retrieve token:',
          tokenError
        );
        // 1. 토큰을 빈 문자열로 폴백
        // 2. API 요청이 실패하지 않도록 처리
        token = '';
      }
      // 여기부터 끝===

      // 여기부터 시작===
      // <!---여기수정
      // 1. createPostApi 호출 시 에러 처리
      // 2. API 요청 실패 시 에러 throw
      try {
        // 1. API 요청 실행
        // 2. createPostApi 호출
        const response = await createPostApi(newPost, token);
        console.log('useCreatePostMutation - API response:', response);
        return response;
      } catch (apiError) {
        // 1. API 요청 실패 시 에러 로그
        // 2. 디버깅을 위해 에러 정보 출력
        console.error('useCreatePostMutation - API request failed:', apiError);
        // 1. 에러를 상위로 throw
        // 2. onError 콜백에서 처리
        throw apiError;
      }
      // 여기부터 끝===
    },
    onSuccess: async (data) => {
      // 1. 성공 메시지 표시
      // 2. 사용자 피드백 제공
      // 여기부터 시작===
      // <!---여기수정
      // 1. toast.success 호출 시 에러 처리
      // 2. toast 실패 시 폴백 처리
      try {
        toast.success('Post created successfully');
        console.log('useCreatePostMutation - Post created successfully');
      } catch (toastError) {
        // 1. toast 호출 실패 시 에러 로그
        // 2. 디버깅을 위해 에러 정보 출력
        console.error(
          'useCreatePostMutation - Failed to show success toast:',
          toastError
        );
        // 1. 사용자 피드백을 콘솔로 폴백
        // 2. toast가 실패해도 사용자에게 메시지 전달
        console.log(
          'useCreatePostMutation - Post created successfully (toast failed)'
        );
      }
      // 여기부터 끝===

      // 여기부터 시작===
      // <!---여기수정
      // 1. 캐시 무효화 시 에러 처리
      // 2. invalidateQueries 실패 시 폴백 처리
      try {
        // 1. 캐시 무효화
        // 2. 최신 데이터 반영
        safeQueryClient.invalidateQueries(['posts']);
        console.log('useCreatePostMutation - Cache invalidated successfully');
      } catch (cacheError) {
        // 1. 캐시 무효화 실패 시 에러 로그
        // 2. 디버깅을 위해 에러 정보 출력
        console.error(
          'useCreatePostMutation - Failed to invalidate cache:',
          cacheError
        );
        // 1. 캐시 무효화 실패 시 로그로 폴백
        // 2. 사용자 경험에 큰 영향 없도록 처리
        console.log(
          'useCreatePostMutation - Cache invalidation failed, proceeding'
        );
      }
      // 여기부터 끝===

      // 여기부터 시작===
      // <!---여기수정
      // 1. 페이지 이동 시 에러 처리
      // 2. safeNavigate 실패 시 폴백 처리
      try {
        // 1. 페이지 이동
        // 2. 포스트 목록으로 리다이렉트
        safeNavigate('/posts?sort=trending');
        console.log('useCreatePostMutation - Navigation successful');
      } catch (navError) {
        // 1. 네비게이션 실패 시 에러 로그
        // 2. 디버깅을 위해 에러 정보 출력
        console.error('useCreatePostMutation - Navigation failed:', navError);
        // 1. 네비게이션 실패 시 로그로 폴백
        // 2. 사용자 경험에 큰 영향 없도록 처리
        console.log(
          'useCreatePostMutation - Navigation failed, user may need to navigate manually'
        );
      }
      // 여기부터 끝===
    },
    onError: (error) => {
      // 여기부터 시작===
      // <!---여기수정
      // 1. 에러 메시지 구체화
      // 2. 에러 유형에 따라 다른 메시지 표시
      let errorMessage = 'Failed to create post';
      if (error?.response) {
        // 1. 서버 응답 에러 처리
        // 2. 서버에서 반환한 메시지 사용
        errorMessage = error.response.data?.message || 'Server error occurred';
      } else if (error?.request) {
        // 1. 네트워크 에러 처리
        // 2. 요청이 서버에 도달하지 않은 경우
        errorMessage = 'Network error: Unable to reach the server';
      } else {
        // 1. 기타 에러 처리
        // 2. 알 수 없는 에러
        errorMessage = 'An unexpected error occurred';
      }

      // 1. 에러 메시지 표시
      // 2. 사용자 피드백 제공
      try {
        toast.error(errorMessage);
        console.error('useCreatePostMutation - Error creating post:', error);
      } catch (toastError) {
        // 1. toast 호출 실패 시 에러 로그
        // 2. 디버깅을 위해 에러 정보 출력
        console.error(
          'useCreatePostMutation - Failed to show error toast:',
          toastError
        );
        // 1. 사용자 피드백을 콘솔로 폴백
        // 2. toast가 실패해도 에러 메시지 전달
        console.log(
          'useCreatePostMutation - Error:',
          errorMessage,
          '(toast failed)'
        );
      }
      // 여기부터 끝===
    },
  });

  // 1. 뮤테이션 객체 반환
  // 2. 상위 훅에서 사용
  return mutation;
};
// ===여기부터 코드 작업종료======
