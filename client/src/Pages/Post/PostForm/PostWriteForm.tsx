/**
 * @file PostWriteForm.tsx
 * @description 포스트 작성 폼 컴포넌트
 * @location src/Pages/Post/PostForm/PostWriteForm.tsx
 */
import { memo, useMemo } from 'react'; // @type {Function} - React와 memo 가져오기
// @description React와 memo로 리렌더링 최적화
// @reason 불필요한 리렌더링 방지

import { Form } from '@/components/ui/form'; // @type {Component} - UI 폼 컴포넌트
// @description 폼 UI 구성
// @reason 스타일링된 폼 UI 제공
// @analogy 도서관에서 책 정보를 입력하는 양식

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

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지

interface PostWriteFormProps {
  initialImageUrls?: string[]; // @type {string[]} - 초기 이미지 URL 배열
  // @description 초기 이미지 URL 설정
  // @reason 이미지 업로드 초기값
}

// 컴포넌트 정의
function PostWriteForm({ initialImageUrls = [] }: PostWriteFormProps) {
  const authState = useCheckAuthToken(); // @type {Object} - 인증 상태와 토큰 가져오기
  // @description useCheckAuthToken으로 토큰 가져오기
  // @reason 포스트 생성 및 자동저장에 필요

  const { form, imageUrls, setImageUrls, draftData } = usePostWriteFormSetup(); // @type {Object} - 폼 상태 및 초기화
  // @description 폼 상태, 이미지 URL, 드래프트 데이터 가져오기
  // @reason 폼 관리 및 초기화

  const { handleSubmit, formState, watch } = form; // @type {Object} - 폼 메서드 및 상태
  // @description 폼 제출 핸들러, 상태, 감시 메서드
  // @reason 폼 제어 및 상태 관리

  // 폼 데이터 감지 및 메모이제이션
  const formData = useMemo(() => watch(), [watch]); // @type {PostWriteFormData} - 감지된 폼 데이터
  // @description 모든 폼 필드 값을 실시간으로 감지, 메모이제이션으로 불필요한 객체 생성 방지
  // @reason 입력 값이 제대로 감지되도록 하고 리렌더링 최소화
  // @why useMemo를 사용하여 formData가 불필요하게 재생성되지 않도록 함
  // @mechanism
  // 1. `watch`로 폼 데이터 감지.
  // 2. `useMemo`로 동일한 값일 경우 객체 재생성 방지.

  // 디버깅 로그: watch로 감지된 폼 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log('PostWriteForm - Watched formData:', formData);
  }

  // PostAutoSave로 전달할 데이터 메모이제이션
  const dataForAutoSave = useMemo(
    () => ({
      formData,
      imageUrls,
    }),
    [formData, imageUrls]
  ); // @type {Object} - PostAutoSave로 전달할 데이터
  // @description formData와 imageUrls를 메모이제이션하여 불필요한 객체 생성 방지
  // @reason PostAutoSave로 전달되는 데이터가 불필요하게 재생성되지 않도록 함
  // @why useMemo를 사용하여 동일한 값일 경우 객체 재생성 방지
  // @mechanism
  // 1. `formData`와 `imageUrls`를 객체로 묶음.
  // 2. `useMemo`로 동일한 값일 경우 객체 재생성 방지.

  // 디버깅 로그: PostAutoSave로 전달되는 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log(
      'PostWriteForm - Data passed to PostAutoSave:',
      dataForAutoSave
    );
  }

  usePostWriteDraftSync(form, imageUrls, draftData); // @description 폼 값과 드래프트 동기화
  // @description 폼 값과 드래프트 동기화
  // @reason Zustand 스토어와 동기화
  // @why usePostWriteDraftSync은 최상단에서 호출되어야 함 (React 훅 규칙)
  // @mechanism
  // 1. `form`, `imageUrls`, `draftData`를 전달.
  // 2. Zustand 스토어와 폼 데이터를 디바운싱하여 동기화.

  const { postFormSubmitHandler, isLoading, error } = usePostWriteSubmit(
    watch('postTitle'),
    watch('postDesc'),
    watch('postContent'),
    imageUrls,
    watch('tags'),
    authState.getToken
  ); // @type {Object} - 폼 제출 로직
  // @description 폼 제출 핸들러, 로딩 상태, 에러 상태 가져오기
  // @reason 제출 관리

  // 인증 상태에 따른 UI 렌더링
  let content: JSX.Element;
  if (authState.isAuthFetchingLoadingStatus) {
    content = (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading authentication...</div>
      </div>
    ); // @description 인증 로딩 중 UI
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
    ); // @description 로그인 필요 UI
    // @reason 사용자 인증 요구
  } else if (authState.isSignedIn === undefined) {
    content = (
      <div className="mt-8 text-center text-red-500">
        {authState.authStatusMessage || '인증 상태를 확인할 수 없습니다.'}
      </div>
    ); // @description 인증 상태 불명 UI
    // @reason 사용자 알림
  } else {
    content = (
      <div className="max-w-4xl p-4 mx-auto">
        <div className="mb-8">
          <h1 className="mb-4 text-2xl font-bold">Create a New Post</h1>
          <PostAutoSave formData={formData} imageUrls={imageUrls} />{' '}
          {/* @description PostAutoSave 컴포넌트 */}
          {/* @reason formData와 imageUrls를 PostAutoSave에 전달 */}
          <PostWriteImageUploader
            initialImageUrls={initialImageUrls}
            onImageUrlsChange={setImageUrls}
          />{' '}
          {/* @description 이미지 업로드 컴포넌트 */}
          {/* @reason 이미지 업로드 관리 */}
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(postFormSubmitHandler)} // @description 폼 제출 핸들러
            className="flex flex-col gap-4" // @description 스타일링
          >
            <PostWriteTitleInput /> {/* @description 제목 입력 컴포넌트 */}
            <PostWriteDescriptionTextarea />{' '}
            {/* @description 설명 입력 컴포넌트 */}
            <PostWriteContentEditor /> {/* @description 본문 편집 컴포넌트 */}
            <PostWriteTagManager /> {/* @description 태그 관리 컴포넌트 */}
            <PostWriteSubmitButton
              isLoading={isLoading} // @type {boolean} - 로딩 상태
              isDisabled={!formState.isValid || formState.isSubmitting} // @type {boolean} - 비활성화 여부
            />{' '}
            {/* @description 제출 버튼 컴포넌트 */}
            {error && (
              <div className="text-red-500">
                {error.message || 'An error occurred while submitting the form'}{' '}
                {/* @description 에러 메시지 표시 */}
              </div>
            )}
          </form>
        </Form>
      </div>
    ); // @description 인증 완료 시 폼 UI
    // @reason 사용자 입력 UI 제공
  }

  return content; // @description 최종 UI 반환
  // @reason 화면 렌더링
  // @why content를 조건부로 렌더링하여 인증 상태에 따라 다른 UI 제공
  // @mechanism
  // 1. `authState`를 기반으로 조건 분기.
  // 2. 각 조건에 따라 다른 JSX 반환.
}

// React.memo로 감싸서 불필요한 리렌더링 방지
export default memo(PostWriteForm); // @description memo로 감싸 리렌더링 최적화
// @reason 불필요한 리렌더링 방지
// @why memo를 사용하여 props가 변경되지 않으면 리렌더링 방지
// @mechanism
// 1. `memo`가 props를 비교.
// 2. 동일하면 리렌더링 건너뜀.
// @analogy 도서관에서 동일한 책 정보를 반복적으로 확인하지 않도록 기억

// **작동 매커니즘**
// 1. `useCheckAuthToken`으로 인증 상태 확인.
// 2. `usePostWriteFormSetup`으로 폼 상태 및 초기 데이터 가져오기.
// 3. `watch`로 폼 데이터 감지, `useMemo`로 메모이제이션.
// 4. `usePostWriteDraftSync`으로 폼 데이터와 Zustand 스토어 동기화.
// 5. `usePostWriteSubmit`으로 제출 로직 설정.
// 6. 인증 상태에 따라 적절한 UI 렌더링.
// 7. `memo`로 불필요한 리렌더링 방지.
