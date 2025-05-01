/**
 * @file PostAutoSave.tsx
 * @description 드래프트 데이터를 주기적으로 자동저장하고 알림 UI를 표시하는 컴포넌트
 * @location src/components/post/PostDraft/PostAutoSave/PostAutoSave.tsx
 */
import { memo, useMemo } from 'react'; // @type {Function} - React와 memo 가져오기
// @description React와 memo로 리렌더링 최적화
// @reason 불필요한 리렌더링 방지

import { useAutoSave } from './hooks/useAutoSave'; // @type {Function} - 자동저장 훅
// @description 드래프트 자동저장 로직 가져오기
// @reason 자동저장 기능 사용

import AutoSaveNotification from './parts/AutoSaveNotification'; // @type {Component} - 자동저장 알림 컴포넌트
// @description 저장 상태 알림 UI
// @reason 사용자에게 저장 상태 표시

import { useCheckAuthToken } from '@/hooks/useCheckUserAuthToken'; // @type {Function} - 인증 상태 확인 훅
// @description 인증 상태와 토큰 가져오기
// @reason Props drilling 없이 인증 상태 확인

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지

interface PostWriteFormData {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 포스트 태그
}

interface DraftState {
  postTitle: string; // @type {string} - 드래프트 제목
  postDesc: string; // @type {string} - 드래프트 설명
  postContent: string; // @type {string} - 드래프트 본문
  tags: string[]; // @type {string[]} - 드래프트 태그
  imageUrls: string[]; // @type {string[]} - 드래프트 이미지 URL
  custom: Record<string, any>; // @type {Record<string, any>} - 커스텀 데이터
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: Date | string | undefined; // @type {Date | string | undefined} - 생성 시간
  updatedAt: Date | string | undefined; // @type {Date | string | undefined} - 수정 시간
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

interface PostAutoSaveProps {
  formData: PostWriteFormData; // @type {Object} - 폼 데이터
  // @description 폼 데이터 전달
  // @reason 드래프트 데이터 생성
  imageUrls: string[]; // @type {string[]} - 이미지 URL 배열
  // @description 이미지 URL 전달
  // @reason 드래프트 데이터에 포함
}

// 자동저장 컴포넌트 정의
function PostAutoSave({ formData, imageUrls }: PostAutoSaveProps) {
  const { isSignedIn, getToken } = useCheckAuthToken(); // @type {Object} - 인증 상태와 토큰 가져오기
  // @description useCheckAuthToken으로 인증 상태 확인
  // @reason Props drilling 방지

  // 드래프트 데이터 생성 및 메모이제이션
  const draft = useMemo(
    () => ({
      postTitle: formData.postTitle || '',
      postDesc: formData.postDesc || '',
      postContent: formData.postContent || '',
      tags: formData.tags || [],
      imageUrls: imageUrls || [],
      custom: {},
      draftId: formData.postTitle
        ? `draft_${formData.postTitle}`
        : 'default_draft', // @description 간단한 draftId 생성
      createdAt: new Date(),
      updatedAt: new Date(),
      isTemporary: true,
    }),
    [formData, imageUrls]
  ); // @type {DraftState} - 드래프트 데이터
  // @description 드래프트 데이터 생성 및 메모이제이션
  // @reason 불필요한 객체 생성 방지
  // @why useMemo를 사용하여 동일한 값일 경우 객체 재생성 방지
  // @mechanism
  // 1. `formData`와 `imageUrls`를 기반으로 드래프트 데이터 생성.
  // 2. `useMemo`로 동일한 값일 경우 객체 재생성 방지.

  // 디버깅 로그: 드래프트 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log('PostAutoSave - draft:', draft);
  }

  const { isSaving, lastSaved } = useAutoSave(draft, isSignedIn, getToken); // @type {Object} - 자동저장 훅 호출
  // @description 드래프트 데이터를 자동저장
  // @reason 주기적 저장 실행

  return (
    <AutoSaveNotification
      isSaving={isSaving} // @type {boolean} - 저장 중 여부
      // @description 저장 상태 전달
      // @reason UI에 저장 상태 표시
      lastSaved={lastSaved} // @type {string | null} - 마지막 저장 시간
      // @description 마지막 저장 시간 전달
      // @reason UI에 저장 시간 표시
    />
  );
}

export default memo(PostAutoSave); // @description memo로 감싸 리렌더링 최적화
// @reason 불필요한 리렌더링 방지
// @why memo를 사용하여 props가 변경되지 않으면 리렌더링 방지
// @mechanism
// 1. `memo`가 props를 비교.
// 2. 동일하면 리렌더링 건너뜀.

// **작동 매커니즘**
// 1. `useCheckAuthToken`으로 인증 상태 가져오기: 로그인 상태와 토큰 확인.
// 2. `useMemo`로 드래프트 데이터 생성: formData와 imageUrls 기반으로 생성.
// 3. `useAutoSave` 훅으로 자동저장 실행: 드래프트 데이터를 주기적으로 저장.
// 4. `AutoSaveNotification`으로 UI 표시: 저장 상태와 시간 표시.
// 5. `memo`로 불필요한 리렌더링 방지.
