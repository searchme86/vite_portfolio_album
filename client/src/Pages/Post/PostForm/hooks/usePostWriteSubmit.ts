/**
 * @file usePostWriteSubmit.ts
 * @description 폼 제출 로직 관리 훅
 * @location src/Pages/Post/PostForm/hooks/usePostWriteSubmit.ts
 */
import { SubmitHandler } from 'react-hook-form'; // @type {Function} - React Hook Form 타입
// @description 제출 핸들러 타입
// @reason 타입 안정성 보장

import type { PostWriteFormData } from './usePostWriteState'; // @type {Object} - 폼 데이터 타입
// @description 폼 데이터 타입 정의
// @reason 타입 안정성 보장

import { GetToken } from '@clerk/types'; // @type {Function} - Clerk 토큰 가져오기 타입
// @description 토큰 가져오기 타입 정의
// @reason 타입 안정성 보장

import { useCreatePost } from '@/api/post/write/useCreatePost'; // @type {Function} - 포스트 생성 훅
// @description 포스트 생성 API 호출
// @reason 포스트 제출

import { usePostWriteNavigation } from './usePostWriteNavigation'; // @type {Function} - 내비게이션 훅
// @description 안전한 내비게이션 처리
// @reason 페이지 이동

export function usePostWriteSubmit(
  postTitle: string,
  postDesc: string,
  postContent: string,
  imageUrls: string[],
  tags: string[],
  getToken: GetToken
) {
  const { safeNavigate } = usePostWriteNavigation(); // 안전한 내비게이션 훅
  // @description 내비게이션 처리
  // @reason 페이지 이동

  const {
    handleSubmit: createPostSubmit,
    isLoading,
    error,
  } = useCreatePost(
    postTitle, // 제목
    postDesc, // 설명
    postContent, // 본문
    imageUrls, // 이미지 URL
    tags, // 태그
    getToken, // 토큰
    safeNavigate // 내비게이션
  ); // 포스트 생성 훅
  // @description 포스트 생성 API 호출
  // @reason 폼 데이터 제출

  const postFormSubmitHandler: SubmitHandler<PostWriteFormData> = (data) => {
    console.log('usePostWriteSubmit - Submitted data:', data);
    // @description 제출 데이터 로그
    // @reason 제출 데이터 확인
    createPostSubmit(new Event('submit') as any); // 포스트 제출
    // @description 포스트 생성 API 호출
    // @reason 데이터 제출
  };

  return {
    postFormSubmitHandler, // 제출 핸들러
    isLoading, // 로딩 상태
    error, // 에러 상태
  };
}
