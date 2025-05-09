/**
 * @file PostWriteForm.tsx
 * @description 포스트 작성 폼 컴포넌트
 * @location src/Pages/Post/PostForm/PostWriteForm.tsx
 */
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

import PostWriteImageUploader from './parts/PostWriteImageUploader'; // @type {Component} - 이미지 업로드 컴포넌트
// @description 이미지 업로드 관리
// @reason 이미지 업로드 UI

import PostAutoSave from '@/components/post/PostDraft/PostAutoSave/PostAutoSave'; // @type {Component} - 자동저장 컴포넌트
// @description 드래프트 자동저장
// @reason 주기적 저장

import { useCheckAuthToken } from '../../../hooks/useCheckUserAuthToken'; // @type {Function} - 인증 상태 확인 훅
// @description 인증 상태와 토큰 가져오기
// @reason 인증 상태 확인

import { usePostWriteFormSetup } from './hooks/usePostWriteFormSetup'; // @type {Function} - 폼 상태 훅
// @description 폼 상태 및 초기화
// @reason 폼 관리

import { usePostWriteDraftSync } from './hooks/usePostWriteDraftSync'; // @type {Function} - 드래프트 동기화 훅
// @description 드래프트 동기화
// @reason 상태 동기화

import { usePostWriteSubmit } from './hooks/usePostWriteSubmit'; // @type {Function} - 제출 훅
// @description 폼 제출 로직
// @reason 제출 관리

interface PostWriteFormProps {
  initialImageUrls?: string[]; // @type {string[]} - 초기 이미지 URL 배열
  // @description 초기 이미지 URL 설정
  // @reason 이미지 업로드 초기값
}

function PostWriteForm({ initialImageUrls = [] }: PostWriteFormProps) {
  const authState = useCheckAuthToken(); // 인증 상태와 토큰 가져오기
  // @description useCheckAuthToken으로 토큰 가져오기
  // @reason 포스트 생성 및 자동저장에 필요

  const { form, setImageUrls, draftData } = usePostWriteFormSetup(); // 폼 상태 및 초기화
  // @description 폼 상태, 이미지 URL 설정 함수, 드래프트 데이터 가져오기
  // @reason 폼 관리 및 초기화

  const { handleSubmit, formState, watch } = form; // 폼 메서드 및 상태
  // @description 폼 제출 핸들러, 상태, 감시 메서드
  // @reason 폼 제어 및 상태 관리

  // **디버깅 로그 추가**: watch로 감지된 폼 데이터 확인
  const formData = watch(); // @type {PostWriteFormData} - 감지된 폼 데이터
  // @description 모든 폼 필드 값을 실시간으로 감지
  // @reason 입력 값이 제대로 감지되는지 확인
  console.log('PostWriteForm - Watched formData:', formData);
  // @description 감지된 폼 데이터 출력
  // @reason 폼 값이 제대로 감지되는지 확인

  // **디버깅 로그 추가**: PostAutoSave로 전달되는 데이터 확인
  console.log('PostWriteForm - Data passed to PostAutoSave:', {
    formData,
  });
  // @description PostAutoSave로 전달된 데이터 출력
  // @reason 데이터가 제대로 전달되는지 확인

  usePostWriteDraftSync(form, draftData); // 드래프트 동기화
  // @description 폼 값과 드래프트 동기화
  // @reason Zustand 스토어와 동기화

  const { postFormSubmitHandler, isLoading, error } = usePostWriteSubmit(
    watch('postTitle'),
    watch('postDesc'),
    watch('postContent'),
    watch('imageUrls'), // @type {string[]} - form에서 imageUrls 가져오기
    watch('tags'),
    authState.getToken
  ); // 폼 제출 로직
  // @description 폼 제출 핸들러, 로딩 상태, 에러 상태 가져오기
  // @reason 제출 관리

  // 인증 상태에 따른 UI 렌더링
  let content: JSX.Element;
  if (authState.isAuthFetchingLoadingStatus) {
    content = (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading authentication...</div>
      </div>
    );
    // @description 인증 로딩 중 UI
    // @reason 사용자 대기 상태 표시
  } else if (authState.isSignedIn === false) {
    content = (
      <div className="mt-8 text-center text-red-500">
        {authState.authStatusMessage || '로그인이 필요합니다.'}
        <div className="mt-4">
          <a href="/login" className="text-blue-500 underline">
            로그인 페이지로 이동
          </a>
        </div>
      </div>
    );
    // @description 로그인 필요 UI
    // @reason 사용자 인증 요구
  } else if (authState.isSignedIn === undefined) {
    content = (
      <div className="mt-8 text-center text-red-500">
        {authState.authStatusMessage || '인증 상태를 확인할 수 없습니다.'}
      </div>
    );
    // @description 인증 상태 불명 UI
    // @reason 사용자 알림
  } else {
    content = (
      <div className="relative max-w-4xl p-4 mx-auto">
        <div className="mb-8">
          <h1 className="mb-4 text-2xl font-bold">Create a New Post</h1>
          <PostAutoSave formData={formData} /> {/* PostAutoSave 컴포넌트 */}
          {/* @description formData를 PostAutoSave에 전달 */}
          {/* @reason 자동저장 로직에서 폼 데이터 사용 */}
          <PostWriteImageUploader />
          {/* 이미지 업로드 컴포넌트 */}
          {/* @description 이미지 업로드 UI */}
          {/* @reason 이미지 업로드 관리 */}
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
            />{' '}
            {/* 제출 버튼 컴포넌트 */}
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
    // @description 인증 완료 시 폼 UI
    // @reason 사용자 입력 UI 제공
  }

  return content; // 최종 UI 반환
  // @description 최종 UI 반환
  // @reason 화면 렌더링
}

export default PostWriteForm;
