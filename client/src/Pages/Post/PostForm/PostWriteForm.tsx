/**
 * @file PostWriteForm.tsx
 * @description 포스트 작성 폼 컴포넌트
 * @location src/Pages/Post/PostForm/PostWriteForm.tsx
 */
import { memo, useMemo } from 'react'; // @type {Function} - React와 memo 가져오기
// @description React와 memo로 리렌더링 최적화
// @reason 불필요한 리렌더링 방지
// @why memo를 사용하여 불필요한 리렌더링 방지
// @mechanism
// 1. `memo`가 props를 비교.
// 2. 동일하면 리렌더링 건너뜀.
// @analogy 도서관에서 동일한 책 정보를 반복적으로 확인하지 않도록 기억

import { Form } from '@/components/ui/form'; // @type {Component} - UI 폼 컴포넌트
// @description 폼 UI 구성
// @reason 스타일링된 폼 UI 제공
// @analogy 도서관에서 책 정보를 입력하는 양식

import PostWriteTitleInput from './parts/PostWriteTitleInput'; // @type {Component} - 제목 입력 컴포넌트
// @description 제목 입력 필드
// @reason 제목 입력 UI
// @analogy 도서관에서 책 제목 입력란

import PostWriteDescriptionTextarea from './parts/PostWriteDescriptionTextarea'; // @type {Component} - 설명 입력 컴포넌트
// @description 설명 입력 필드
// @reason 설명 입력 UI
// @analogy 도서관에서 책 설명 입력란

import PostWriteContentEditor from './parts/PostWriteContentEditor'; // @type {Component} - 본문 편집 컴포넌트
// @description 본문 편집기
// @reason 본문 입력 UI
// @analogy 도서관에서 책 내용 편집기

import PostWriteTagManager from './parts/PostWriteTagManager'; // @type {Component} - 태그 관리 컴포넌트
// @description 태그 입력 및 관리
// @reason 태그 입력 UI
// @analogy 도서관에서 책 태그 관리

import PostWriteSubmitButton from './parts/PostWriteSubmitButton'; // @type {Component} - 제출 버튼 컴포넌트
// @description 폼 제출 버튼
// @reason 제출 UI
// @analogy 도서관에서 책 제출 버튼

import PostWriteImageUploader from './parts/PostWriteImageUploader'; // @type {Component} - 이미지 업로드 컴포넌트
// @description 이미지 업로드 관리
// @reason 이미지 업로드 UI
// @analogy 도서관에서 책 이미지 업로드

import PostAutoSave from '@/components/post/PostDraft/PostAutoSave/PostAutoSave'; // @type {Component} - 자동저장 컴포넌트
// @description 드래프트 자동저장
// @reason 주기적 저장
// @analogy 도서관에서 책을 주기적으로 저장

import { useCheckAuthToken } from '../../../hooks/useCheckUserAuthToken'; // @type {Function} - 인증 상태 확인 훅
// @description 인증 상태와 토큰 가져오기
// @reason 인증 상태 확인
// @analogy 도서관에서 사서가 사용자 인증 확인

import { usePostWriteFormSetup } from './hooks/usePostWriteFormSetup'; // @type {Function} - 폼 상태 훅
// @description 폼 상태 및 초기화
// @reason 폼 관리
// @analogy 도서관에서 책 입력 양식 준비

import { usePostWriteDraftSync } from './hooks/usePostWriteDraftSync'; // @type {Function} - 드래프트 동기화 훅
// @description 드래프트 동기화
// @reason 상태 동기화
// @analogy 도서관에서 책 정보를 동기화

import { usePostWriteSubmit } from './hooks/usePostWriteSubmit'; // @type {Function} - 제출 훅
// @description 폼 제출 로직
// @reason 제출 관리
// @analogy 도서관에서 책 제출 로직

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지
// @why 로그가 과도하게 출력되지 않도록 제어
// @mechanism
// 1. `process.env.NODE_ENV`로 환경 확인.
// 2. 개발 환경에서만 로그 출력.

interface PostWriteFormProps {
  initialImageUrls?: string[]; // @type {string[]} - 초기 이미지 URL 배열
  // @description 초기 이미지 URL 설정
  // @reason 이미지 업로드 초기값
  // @analogy 도서관에서 초기 책 이미지 설정
}

// 컴포넌트 정의
function PostWriteForm({ initialImageUrls = [] }: PostWriteFormProps) {
  const authState = useCheckAuthToken(); // @type {Object} - 인증 상태와 토큰 가져오기
  // @description useCheckAuthToken으로 인증 상태와 토큰 가져오기
  // @reason 포스트 생성 및 자동저장에 필요
  // @why 인증 상태를 확인하여 제출 및 저장 가능 여부 결정
  // @mechanism
  // 1. `useCheckAuthToken` 호출로 `isSignedIn`, `getToken` 등 반환.
  // 2. `authState`로 상태 관리.

  const { form, imageUrls, setImageUrls, draftData } = usePostWriteFormSetup(); // @type {Object} - 폼 상태 및 초기화
  // @description 폼 상태, 이미지 URL, 드래프트 데이터 가져오기
  // @reason 폼 관리 및 초기화
  // @why 폼 상태를 중앙에서 관리하여 컴포넌트 간 데이터 공유
  // @mechanism
  // 1. `usePostWriteFormSetup` 호출로 `form`, `imageUrls`, `setImageUrls`, `draftData` 반환.
  // 2. 각 값을 컴포넌트에서 사용.
  // @analogy 도서관에서 책 입력 양식과 이미지, 드래프트 데이터 준비

  const { handleSubmit, formState, watch } = form; // @type {Object} - 폼 메서드 및 상태
  // @description 폼 제출 핸들러, 상태, 감시 메서드
  // @reason 폼 제어 및 상태 관리
  // @why `handleSubmit`으로 제출 처리, `formState`로 상태 관리, `watch`로 데이터 감시
  // @mechanism
  // 1. `form` 객체에서 `handleSubmit`, `formState`, `watch` 추출.
  // 2. 각 메서드와 상태를 사용하여 폼 관리.

  // 폼 데이터 감지 및 메모이제이션
  const formData = useMemo(() => watch(), [watch]); // @type {Object} - 감지된 폼 데이터
  // @description 모든 폼 필드 값을 실시간으로 감지, 메모이제이션으로 불필요한 객체 생성 방지
  // @reason 입력 값이 제대로 감지되도록 하고 리렌더링 최소화
  // @why useMemo를 사용하여 formData가 불필요하게 재생성되지 않도록 함
  // @mechanism
  // 1. `watch`로 폼 데이터 감지.
  // 2. `useMemo`로 동일한 값일 경우 객체 재생성 방지.
  // @analogy 도서관에서 책 정보를 실시간으로 감시하고 기록

  // 디버깅 로그: watch로 감지된 폼 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log('PostWriteForm - Watched formData:', formData); // @description 감지된 폼 데이터 로그
    // @reason 폼 데이터 상태 확인
    // @why 디버깅 시 데이터 추적
    // @analogy 도서관에서 책 정보가 제대로 입력되었는지 확인
  }

  // PostAutoSave로 전달할 데이터 메모이제이션
  const dataForAutoSave = useMemo(
    () => ({
      formData, // @type {Object} - 폼 데이터
      // @description 자동저장에 사용할 폼 데이터
      // @reason PostAutoSave에서 폼 데이터 사용
      imageUrls, // @type {string[]} - 이미지 URL 배열
      // @description 자동저장에 사용할 이미지 URL
      // @reason PostAutoSave에서 이미지 URL 사용
    }),
    [formData, imageUrls]
  ); // @type {Object} - PostAutoSave로 전달할 데이터
  // @description formData와 imageUrls를 메모이제이션하여 불필요한 객체 생성 방지
  // @reason PostAutoSave로 전달되는 데이터가 불필요하게 재생성되지 않도록 함
  // @why useMemo를 사용하여 동일한 값일 경우 객체 재생성 방지
  // @mechanism
  // 1. `formData`와 `imageUrls`를 객체로 묶음.
  // 2. `useMemo`로 동일한 값일 경우 객체 재생성 방지.
  // @analogy 도서관에서 자동저장 데이터를 한 번 정리한 후 같은 정보는 다시 정리하지 않음

  // 디버깅 로그: PostAutoSave로 전달되는 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log(
      'PostWriteForm - Data passed to PostAutoSave:',
      dataForAutoSave
    ); // @description PostAutoSave로 전달된 데이터 로그
    // @reason 전달 데이터 상태 확인
    // @why 디버깅 시 데이터 추적
    // @analogy 도서관에서 자동저장 데이터가 제대로 전달되었는지 확인
  }

  // 드래프트 동기화 (draftData의 createdAt이 Date 타입으로 보장됨)
  usePostWriteDraftSync(form, imageUrls, draftData); // @type {void} - 드래프트 동기화 훅 호출
  // @description 폼 값과 드래프트 동기화
  // @reason Zustand 스토어와 동기화
  // @why usePostWriteDraftSync은 최상단에서 호출되어야 함 (React 훅 규칙)
  // @mechanism
  // 1. `form`, `imageUrls`, `draftData`를 전달.
  // 2. Zustand 스토어와 폼 데이터를 디바운싱하여 동기화.
  // @analogy 도서관에서 책 정보와 저장된 드래프트 데이터를 동기화

  const { postFormSubmitHandler, isLoading, error } = usePostWriteSubmit(
    watch('postTitle'), // @type {string} - 포스트 제목
    watch('postDesc'), // @type {string} - 포스트 설명
    watch('postContent'), // @type {string} - 포스트 본문
    imageUrls, // @type {string[]} - 이미지 URL 배열
    watch('tags'), // @type {string[]} - 태그 배열
    authState.getToken // @type {Function} - 토큰 가져오기 함수
  ); // @type {Object} - 폼 제출 로직
  // @description 폼 제출 핸들러, 로딩 상태, 에러 상태 가져오기
  // @reason 제출 관리
  // @why 폼 데이터를 제출 로직에 전달하여 서버로 전송
  // @mechanism
  // 1. `watch`로 각 필드 값 감시.
  // 2. `usePostWriteSubmit` 호출로 제출 로직 실행.
  // @analogy 도서관에서 책 정보를 제출 로직에 전달

  // 인증 상태에 따른 UI 렌더링
  let content: JSX.Element; // @type {JSX.Element} - 렌더링할 UI
  // @description 인증 상태에 따라 다른 UI를 저장
  // @reason 조건부 렌더링
  if (authState.isAuthFetchingLoadingStatus) {
    content = (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">
          Loading authentication... {/* @description 인증 로딩 메시지 */}
          {/* @reason 사용자 대기 상태 표시 */}
        </div>
      </div>
    ); // @type {JSX.Element} - 인증 로딩 중 UI
    // @description 인증 로딩 중일 때 표시할 UI
    // @reason 사용자에게 로딩 상태 알림
    // @analogy 도서관에서 사서가 인증 확인 중임을 알림
  } else if (authState.isSignedIn === false) {
    content = (
      <div className="mt-8 text-center text-red-500">
        {authState.authStatusMessage || '로그인이 필요합니다.'}
        {/* @description 인증 실패 메시지 */}
        {/* @reason 사용자에게 로그인 필요 알림 */}
        <div className="mt-4">
          <a href="/login" className="text-blue-500 underline">
            로그인 페이지로 이동 {/* @description 로그인 링크 */}
            {/* @reason 사용자에게 로그인 페이지로 이동 경로 제공 */}
          </a>
        </div>
      </div>
    ); // @type {JSX.Element} - 로그인 필요 UI
    // @description 로그인 필요 시 표시할 UI
    // @reason 사용자 인증 요구
    // @analogy 도서관에서 로그인하지 않은 사용자에게 알림
  } else if (authState.isSignedIn === undefined) {
    content = (
      <div className="mt-8 text-center text-red-500">
        {authState.authStatusMessage || '인증 상태를 확인할 수 없습니다.'}
        {/* @description 인증 상태 불명 메시지 */}
        {/* @reason 사용자에게 인증 오류 알림 */}
      </div>
    ); // @type {JSX.Element} - 인증 상태 불명 UI
    // @description 인증 상태 불명 시 표시할 UI
    // @reason 사용자 알림
    // @analogy 도서관에서 인증 상태를 알 수 없을 때 알림
  } else {
    content = (
      <div className="max-w-4xl p-4 mx-auto">
        <div className="mb-8">
          <h1 className="mb-4 text-2xl font-bold">
            Create a New Post {/* @description 폼 제목 */}
            {/* @reason 사용자에게 폼 목적 표시 */}
          </h1>
          <PostAutoSave formData={formData} imageUrls={imageUrls} />{' '}
          {/* @type {JSX.Element} - PostAutoSave 컴포넌트 */}
          {/* @description formData와 imageUrls를 PostAutoSave에 전달 */}
          {/* @reason 주기적 자동저장 실행 */}
          <PostWriteImageUploader
            initialImageUrls={initialImageUrls} // @type {string[]} - 초기 이미지 URL
            // @description 초기 이미지 URL 전달
            // @reason 초기값 설정
            onImageUrlsChange={setImageUrls} // @type {Function} - 이미지 URL 변경 핸들러
            // @description 이미지 URL 변경 시 호출
            // @reason 이미지 상태 업데이트
          />{' '}
          {/* @type {JSX.Element} - 이미지 업로드 컴포넌트 */}
          {/* @description 이미지 업로드 관리 */}
          {/* @reason 사용자 이미지 업로드 가능 */}
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(postFormSubmitHandler)} // @type {Function} - 폼 제출 핸들러
            // @description 폼 제출 시 postFormSubmitHandler 호출
            // @reason 폼 데이터 제출
            className="flex flex-col gap-4" // @type {string} - 스타일링 클래스
            // @description 폼 레이아웃 스타일링
            // @reason 깔끔한 UI 구성
          >
            <PostWriteTitleInput />{' '}
            {/* @type {JSX.Element} - 제목 입력 컴포넌트 */}
            {/* @description 제목 입력 필드 렌더링 */}
            {/* @reason 사용자 제목 입력 */}
            <PostWriteDescriptionTextarea />{' '}
            {/* @type {JSX.Element} - 설명 입력 컴포넌트 */}
            {/* @description 설명 입력 필드 렌더링 */}
            {/* @reason 사용자 설명 입력 */}
            <PostWriteContentEditor />{' '}
            {/* @type {JSX.Element} - 본문 편집 컴포넌트 */}
            {/* @description 본문 편집기 렌더링 */}
            {/* @reason 사용자 본문 입력 */}
            <PostWriteTagManager />{' '}
            {/* @type {JSX.Element} - 태그 관리 컴포넌트 */}
            {/* @description 태그 관리 렌더링 */}
            {/* @reason 사용자 태그 입력 */}
            <PostWriteSubmitButton
              isLoading={isLoading} // @type {boolean} - 로딩 상태
              // @description 제출 중 로딩 상태 전달
              // @reason 제출 버튼 상태 표시
              isDisabled={!formState.isValid || formState.isSubmitting} // @type {boolean} - 비활성화 여부
              // @description 폼 유효성 및 제출 상태에 따라 버튼 비활성화
              // @reason 잘못된 제출 방지
            />{' '}
            {/* @type {JSX.Element} - 제출 버튼 컴포넌트 */}
            {/* @description 제출 버튼 렌더링 */}
            {/* @reason 폼 제출 가능 */}
            {error && (
              <div className="text-red-500">
                {error.message || 'An error occurred while submitting the form'}{' '}
                {/* @type {string} - 에러 메시지 */}
                {/* @description 제출 에러 메시지 표시 */}
                {/* @reason 사용자에게 에러 알림 */}
              </div>
            )}
          </form>
        </Form>
      </div>
    ); // @type {JSX.Element} - 인증 완료 시 폼 UI
    // @description 인증 완료 시 표시할 폼 UI
    // @reason 사용자 입력 UI 제공
    // @analogy 도서관에서 인증된 사용자에게 책 입력 양식 제공
  }

  return content; // @type {JSX.Element} - 최종 UI 반환
  // @description 최종 UI를 렌더링
  // @reason 화면에 적절한 UI 표시
  // @why content를 조건부로 렌더링하여 인증 상태에 따라 다른 UI 제공
  // @mechanism
  // 1. `authState`를 기반으로 조건 분기.
  // 2. 각 조건에 따라 다른 JSX 반환.
  // @analogy 도서관에서 사용자 상태에 따라 다른 안내 제공
}

export default memo(PostWriteForm); // @type {Function} - memo로 감싸 리렌더링 최적화
// @description memo로 감싸 불필요한 리렌더링 방지
// @reason props가 변경되지 않으면 리렌더링 방지
// @why memo를 사용하여 성능 최적화
// @mechanism
// 1. `memo`가 props를 비교.
// 2. 동일하면 리렌더링 건너뜀.
// @analogy 도서관에서 동일한 책 정보를 반복적으로 확인하지 않도록 기억

// **작동 매커니즘**
// 1. `useCheckAuthToken`으로 인증 상태 확인: 로그인 상태와 토큰 확인.
// 2. `usePostWriteFormSetup`으로 폼 상태 및 초기 데이터 가져오기: 폼, 이미지 URL, 드래프트 데이터 초기화.
// 3. `watch`로 폼 데이터 감지, `useMemo`로 메모이제이션: 불필요한 객체 생성 방지.
// 4. `usePostWriteDraftSync`으로 폼 데이터와 Zustand 스토어 동기화: 디바운싱으로 성능 최적화.
// 5. `usePostWriteSubmit`으로 제출 로직 설정: 서버로 데이터 전송.
// 6. 인증 상태에 따라 적절한 UI 렌더링: 로딩, 로그인 필요, 폼 UI 등.
// 7. `memo`로 불필요한 리렌더링 방지: 성능 최적화.
// @reason 사용자가 포스트 작성 폼을 통해 데이터를 입력하고 제출 가능하도록 함
// @analogy 도서관에서 사용자가 책 정보를 입력하고 제출하는 시스템
