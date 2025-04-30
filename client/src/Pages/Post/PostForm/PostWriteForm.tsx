/**
 * @file PostWriteForm.tsx
 * @description 포스트 작성 폼 컴포넌트
 * @location src/Pages/Post/PostForm/PostWriteForm.tsx
 */

import { useState, useEffect } from 'react'; // @type {Function} - React 훅
// @description 상태와 이펙트 관리
// @reason 폼 상태 및 이펙트 관리

import { useForm, SubmitHandler } from 'react-hook-form'; // @type {Function} - React Hook Form 훅
// @description 폼 상태 관리 및 유효성 검사
// @reason 폼 입력 관리

import { debounce } from 'lodash'; // @type {Function} - 디바운싱 유틸리티
// @description 입력값 변경 시 디바운싱 적용
// @reason 과도한 업데이트 방지

import { Form } from '@/components/ui/form'; // @type {Component} - UI 폼 컴포넌트
// @description 폼 UI 구성
// @reason 스타일링된 폼 UI 제공

import PostWriteTitleInput from './parts/PostWriteTitleInput'; // @type {Component} - 제목 입력 컴포넌트
// @description 제목 입력 필드
// @reason 제목 입력 UI

import PostWriteDescriptionTextarea from './parts/PostWriteDescriptionTextarea'; // @type {Component} - 설명 입력 컴포넌트
// @description 설명 입력 필드
// @reason 설명 입력 UI

import PostWriteContentEditor from './parts/PostWriteContentEditor'; // @type {Component} - 본문 편집 컴포넌트
// @description 본문 편집기
// @reason 본문 입력 UI

import PostWriteTagManager from './parts/PostWriteTagManager'; // @type {Component} - 태그 관리 컴포넌트
// @description 태그 입력 및 관리
// @reason 태그 입력 UI

import PostWriteSubmitButton from './parts/PostWriteSubmitButton'; // @type {Component} - 제출 버튼 컴포넌트
// @description 폼 제출 버튼
// @reason 제출 UI

import ImageUploadManager from '@/components/handleImage/ImageUploadManager/ImageUploadManager'; // @type {Component} - 이미지 업로드 컴포넌트
// @description 이미지 업로드 및 관리
// @reason 이미지 업로드 UI

import { useCreatePost } from '@/api/post/write/useCreatePost'; // @type {Function} - 포스트 생성 훅
// @description 포스트 생성 API 호출
// @reason 포스트 제출

import { usePostWriteNavigation } from './hooks/usePostWriteNavigation'; // @type {Function} - 내비게이션 훅
// @description 안전한 내비게이션 처리
// @reason 페이지 이동

import { postWriteFormDefaultValues } from './hooks/usePostWriteState'; // @type {Object} - 폼 기본값
// @description 폼 초기값 설정
// @reason 초기 폼 상태 설정

import PostAutoSave from '@/components/post/PostDraft/PostAutoSave/PostAutoSave'; // @type {Component} - 자동저장 컴포넌트
// @description 드래프트 자동저장
// @reason 주기적 저장

import type { PostWriteFormData } from './hooks/usePostWriteState'; // @type {Object} - 폼 데이터 타입
// @description 폼 데이터 타입 정의
// @reason 타입 안정성 보장

import useGetDraftState from '@/stores/draft/useGetDraftState'; // @type {Function} - 드래프트 데이터 가져오기 훅
// @description Zustand 스토어에서 드래프트 데이터 가져오기
// @reason 드래프트 데이터 접근

import useDraftStore from '../../../stores/draft/draftStore'; // @type {Function} - Zustand 스토어 훅
// @description 드래프트 스토어 접근
// @reason 상태 업데이트

import { useCheckAuthToken } from '@/hooks/useCheckUserAuthToken'; // @type {Function} - 인증 상태 확인 훅
// @description 인증 상태와 토큰 가져오기
// @reason 인증 상태 확인

// 폼 컴포넌트 속성 타입 정의
interface PostWriteFormProps {
  initialImageUrls?: string[]; // @type {string[]} - 초기 이미지 URL 배열
  // @description 초기 이미지 URL 설정
  // @reason 이미지 업로드 초기값
}

function PostWriteForm({ initialImageUrls = [] }: PostWriteFormProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls); // @type {string[]} - 이미지 URL 상태
  // @description 이미지 URL 관리
  // @reason 이미지 업로드 상태 관리

  const draft = useGetDraftState(); // 드래프트 데이터 가져오기
  // @description Zustand 스토어에서 드래프트 데이터 가져오기
  // @reason 폼 초기값 및 자동저장 데이터

  // draft 속성 추출
  // @description draft 값을 개별 변수로 추출하여 useMemo 내부 참조 방지
  // @reason React 훅 규칙 위반 방지
  const {
    postTitle,
    postDesc,
    postContent,
    tags,
    custom,
    draftId,
    createdAt,
    isTemporary,
  } = draft;

  const updateDraft = useDraftStore.use.updateDraft(); // 드래프트 업데이트 함수
  // @description Zustand 스토어의 드래프트 업데이트 함수
  // @reason 상태 업데이트

  const authState = useCheckAuthToken(); // 인증 상태와 토큰 가져오기
  // @description useCheckAuthToken으로 토큰 가져오기
  // @reason 포스트 생성 및 자동저장에 필요

  // 인증 상태 처리
  // @description 인증 로딩 및 실패 상태에 따른 UI 표시
  // @reason 사용자 경험 개선
  if (authState.isAuthFetchingLoadingStatus) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading authentication...</div>
      </div>
    );
  }

  if (authState.isSignedIn === false) {
    return (
      <div className="mt-8 text-center text-red-500">
        {authState.authStatusMessage || '로그인이 필요합니다.'}
        <div className="mt-4">
          <a href="/login" className="text-blue-500 underline">
            로그인 페이지로 이동
          </a>
        </div>
      </div>
    );
  }

  if (authState.isSignedIn === undefined) {
    return (
      <div className="mt-8 text-center text-red-500">
        {authState.authStatusMessage || '인증 상태를 확인할 수 없습니다.'}
      </div>
    );
  }

  const form = useForm<PostWriteFormData>({
    mode: 'onChange', // @type {string} - 폼 변경 시 유효성 검사
    // @description 폼 변경 시 즉시 유효성 검사
    // @reason 실시간 유효성 검사
    defaultValues: postWriteFormDefaultValues, // 최소화된 초기값 설정
  });

  const { handleSubmit, formState, watch, reset } = form; // 폼 메서드 및 상태
  // @description 폼 제출 핸들러, 상태, 감시 메서드, 리셋 메서드
  // @reason 폼 제어 및 상태 관리

  const { safeNavigate } = usePostWriteNavigation(); // 안전한 내비게이션 훅
  // @description 내비게이션 처리
  // @reason 페이지 이동

  const {
    handleSubmit: createPostSubmit,
    isLoading,
    error,
  } = useCreatePost(
    watch('postTitle'), // 제목 감시
    watch('postDesc'), // 설명 감시
    watch('postContent'), // 본문 감시
    imageUrls, // 이미지 URL
    watch('tags'), // 태그 감시
    authState.getToken, // 토큰
    safeNavigate // 내비게이션
  ); // 포스트 생성 훅
  // @description 포스트 생성 API 호출
  // @reason 폼 데이터 제출

  // draft 변경 시 폼 값 업데이트
  // @description draft 값이 변경될 때 폼 초기값 업데이트
  // @reason 초기 로드 시 draft 값 반영
  useEffect(() => {
    reset({
      ...postWriteFormDefaultValues, // 기본값 병합
      postTitle: postTitle || '', // 드래프트 제목 초기값
      postDesc: postDesc || '', // 드래프트 설명 초기값
      postContent: postContent || '', // 드래프트 본문 초기값
      tags: tags || [], // 드래프트 태그 초기값
    }); // 폼 초기값 리셋
  }, [reset, postTitle, postDesc, postContent, tags]); // draft 속성 변경 시 실행

  // 폼 값 변경 감지 및 Zustand 스토어 업데이트
  useEffect(() => {
    const updateDraftDebounced = debounce((formValues: PostWriteFormData) => {
      console.log('PostWriteForm - Form values changed:', formValues);
      updateDraft({
        postTitle: formValues.postTitle || '', // 제목 업데이트
        postDesc: formValues.postDesc || '', // 설명 업데이트
        postContent: formValues.postContent || '', // 본문 업데이트
        tags: formValues.tags || [], // 태그 업데이트
        imageUrls: imageUrls, // 이미지 URL 동기화
        custom: custom, // 커스텀 데이터 유지
        draftId: draftId, // 드래프트 ID 유지
        createdAt: createdAt, // 생성 시간 유지
        updatedAt: new Date(), // 수정 시간 업데이트
        isTemporary: isTemporary, // 임시저장 여부 유지
      });
    }, 500); // 500ms 지연

    const subscription = watch((value) => {
      updateDraftDebounced(value); // 폼 값 변경 시 디바운싱 후 업데이트
    });

    return () => {
      subscription.unsubscribe(); // 구독 해제
      updateDraftDebounced.cancel(); // 디바운싱 취소
    };
  }, [watch, updateDraft, imageUrls, custom, draftId, createdAt, isTemporary]); // draft 속성 사용

  // imageUrls 변경 시 Zustand 스토어 업데이트
  useEffect(() => {
    console.log('PostWriteForm - Image URLs updated in draft:', imageUrls);
    updateDraft({
      postTitle: postTitle, // 제목 유지
      postDesc: postDesc, // 설명 유지
      postContent: postContent, // 본문 유지
      tags: tags, // 태그 유지
      imageUrls: imageUrls, // 이미지 URL 업데이트
      custom: custom, // 커스텀 데이터 유지
      draftId: draftId, // 드래프트 ID 유지
      createdAt: createdAt, // 생성 시간 유지
      updatedAt: new Date(), // 수정 시간 업데이트
      isTemporary: isTemporary, // 임시저장 여부 유지
    });
  }, [
    imageUrls,
    updateDraft,
    postTitle,
    postDesc,
    postContent,
    tags,
    custom,
    draftId,
    createdAt,
    isTemporary,
  ]); // draft 속성 사용

  const postFormSubmitHandler: SubmitHandler<PostWriteFormData> = (data) => {
    console.log('PostWriteForm - Submitted data:', data);
    createPostSubmit(new Event('submit') as any); // 포스트 제출
  };

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">Create a New Post</h1>
        <PostAutoSave /> {/* PostAutoSave 컴포넌트 */}
        {/* @description 자동저장 컴포넌트 렌더링 */}
        {/* @reason 드래프트 주기적 저장 */}
        <ImageUploadManager
          postId="temp" // @type {string} - 임시 포스트 ID
          initialImageUrls={initialImageUrls} // 초기 이미지 URL
          onImageUrlsChange={(urls) => {
            console.log('PostWriteForm - Image URLs updated:', urls);
            setImageUrls(urls || []); // 이미지 URL 업데이트
          }}
          progressBarColor="bg-blue-600" // @type {string} - 진행 바 색상
          minImages={1} // @type {number} - 최소 이미지 수
          maxImages={10} // @type {number} - 최대 이미지 수
          showSlide={false} // @type {boolean} - 슬라이드 표시 여부
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(postFormSubmitHandler)} // 폼 제출 핸들러
          className="flex flex-col gap-4" // 스타일링
        >
          <PostWriteTitleInput /> {/* 제목 입력 컴포넌트 */}
          <PostWriteDescriptionTextarea /> {/* 설명 입력 컴포넌트 */}
          <PostWriteContentEditor /> {/* 본문 편집 컴포넌트 */}
          <PostWriteTagManager /> {/* 태그 관리 컴포넌트 */}
          <PostWriteSubmitButton
            isLoading={isLoading} // @type {boolean} - 로딩 상태
            isDisabled={!formState.isValid || formState.isSubmitting} // @type {boolean} - 비활성화 여부
          />
          {error && (
            <div className="text-red-500">
              {error.message || 'An error occurred while submitting the form'}{' '}
              {/* 에러 메시지 표시 */}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

export default PostWriteForm;

// **작동 매커니즘**
// 1. `useCheckAuthToken`으로 인증 상태 가져오기: 로그인 상태와 토큰 확인.
// 2. 인증 상태 처리: 로딩, 실패, 미인증 상태에 따라 UI 표시.
// 3. `useGetDraftState`로 드래프트 데이터 가져오기: Zustand 스토어에서 데이터 가져옴.
// 4. `draft` 속성 추출: `useMemo` 내부에서 훅 호출 방지.
// 5. `useForm`으로 폼 상태 관리: 폼 입력값 관리 및 유효성 검사.
// 6. `useEffect`로 draft 변경 시 폼 초기값 업데이트: 초기 로드 시 반영.
// 7. `useEffect`로 폼 값 및 이미지 URL 변경 감지: 디바운싱 후 Zustand 스토어 업데이트.
// 8. `PostAutoSave`로 자동저장 실행: 드래프트 데이터를 주기적으로 저장.
// 9. 폼 렌더링 및 제출: 사용자 입력을 받아 포스트 생성.
