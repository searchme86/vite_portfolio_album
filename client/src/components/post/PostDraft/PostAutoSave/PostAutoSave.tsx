<<<<<<< HEAD
/**
 * @file PostAutoSave.tsx
 * @description 드래프트 데이터를 주기적으로 자동저장하고 알림 UI를 표시하는 컴포넌트
 * @location src/components/post/PostDraft/PostAutoSave/PostAutoSave.tsx
 */
import { memo, useMemo } from 'react'; // @type {Function} - React와 memo 가져오기
// @description React와 memo로 리렌더링 최적화
// @reason 불필요한 리렌더링 방지
// @why memo를 사용하여 불필요한 리렌더링 방지
// @mechanism
// 1. `memo`가 props를 비교.
// 2. 동일하면 리렌더링 건너뜀.
// @analogy 도서관에서 동일한 책 정보를 반복적으로 확인하지 않도록 기억

import { useAutoSave } from './hooks/useAutoSave'; // @type {Function} - 자동저장 훅
// @description 드래프트 자동저장 로직 가져오기
// @reason 자동저장 기능 사용
// @analogy 도서관에서 책 정보를 자동으로 저장하는 시스템

import AutoSaveNotification from './parts/AutoSaveNotification'; // @type {Component} - 자동저장 알림 컴포넌트
// @description 저장 상태 알림 UI
// @reason 사용자에게 저장 상태 표시
// @analogy 도서관에서 저장 상태를 사용자에게 알리는 게시판

import { useCheckAuthToken } from '@/hooks/useCheckUserAuthToken'; // @type {Function} - 인증 상태 확인 훅
// @description 인증 상태와 토큰 가져오기
// @reason Props drilling 없이 인증 상태 확인
// @analogy 도서관에서 사서가 사용자 인증을 확인하는 절차

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지
// @why 로그가 과도하게 출력되지 않도록 제어
// @mechanism
// 1. `process.env.NODE_ENV`로 환경 확인.
// 2. 개발 환경에서만 로그 출력.

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
  // @description useCheckAuthToken으로 인증 상태와 토큰 가져오기
  // @reason Props drilling 방지
  // @why 인증 상태를 확인하여 서버 저장 여부 결정
  // @mechanism
  // 1. `useCheckAuthToken` 호출로 `isSignedIn`과 `getToken` 반환.
  // 2. `isSignedIn`으로 로그인 상태 확인, `getToken`으로 토큰 가져오기.

  // 드래프트 데이터 생성 및 메모이제이션
  const draft: DraftState = useMemo(
    () => ({
      postTitle: formData.postTitle || '', // @type {string} - 포스트 제목, 빈 문자열로 폴백
      // @description 폼 데이터에서 제목 가져오기
      // @reason 제목이 없으면 빈 문자열로 초기화
      postDesc: formData.postDesc || '', // @type {string} - 포스트 설명, 빈 문자열로 폴백
      // @description 폼 데이터에서 설명 가져오기
      // @reason 설명이 없으면 빈 문자열로 초기화
      postContent: formData.postContent || '', // @type {string} - 포스트 본문, 빈 문자열로 폴백
      // @description 폼 데이터에서 본문 가져오기
      // @reason 본문이 없으면 빈 문자열로 초기화
      tags: formData.tags || [], // @type {string[]} - 포스트 태그, 빈 배열로 폴백
      // @description 폼 데이터에서 태그 가져오기
      // @reason 태그가 없으면 빈 배열로 초기화
      imageUrls: imageUrls || [], // @type {string[]} - 이미지 URL, 빈 배열로 폴백
      // @description props에서 이미지 URL 가져오기
      // @reason 이미지 URL이 없으면 빈 배열로 초기화
      custom: {}, // @type {Record<string, any>} - 커스텀 데이터, 빈 객체로 초기화
      // @description 커스텀 데이터 초기화
      // @reason 현재 커스텀 데이터 미사용
      draftId: formData.postTitle
        ? `draft_${formData.postTitle}`
        : 'default_draft', // @type {string} - 드래프트 ID, 기본값으로 폴백
      // @description 제목 기반으로 드래프트 ID 생성
      // @reason 고유 ID 생성, 제목 없으면 기본값 사용
      createdAt: new Date(), // @type {Date} - 생성 시간
      // @description 현재 시간으로 생성 시간 설정
      // @reason 드래프트 생성 시간 기록
      updatedAt: new Date(), // @type {Date} - 수정 시간
      // @description 현재 시간으로 수정 시간 설정
      // @reason 드래프트 수정 시간 기록
      isTemporary: true, // @type {boolean} - 임시저장 여부
      // @description 임시저장 상태 설정
      // @reason 자동저장 데이터는 임시저장으로 간주
    }),
    [formData, imageUrls]
  ); // @type {DraftState} - 드래프트 데이터
  // @description 드래프트 데이터 생성 및 메모이제이션
  // @reason 불필요한 객체 생성 방지
  // @why useMemo를 사용하여 동일한 값일 경우 객체 재생성 방지
  // @mechanism
  // 1. `formData`와 `imageUrls`를 기반으로 드래프트 데이터 생성.
  // 2. `useMemo`로 동일한 값일 경우 객체 재생성 방지.
  // @analogy 도서관에서 책 정보를 한 번 정리한 후 같은 정보는 다시 정리하지 않음

  // 디버깅 로그: 드래프트 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log('PostAutoSave - draft:', draft); // @description 생성된 드래프트 데이터 출력
    // @reason 드래프트 데이터가 올바르게 생성되었는지 확인
    // @analogy 도서관에서 책 정보가 제대로 정리되었는지 확인
  }

  const { isSaving, lastSaved } = useAutoSave(draft, isSignedIn, getToken); // @type {Object} - 자동저장 훅 호출
  // @description 드래프트 데이터를 자동저장
  // @reason 주기적 저장 실행
  // @why useAutoSave 훅을 사용하여 로컬과 서버에 데이터를 자동저장
  // @mechanism
  // 1. `draft`, `isSignedIn`, `getToken`을 `useAutoSave`에 전달.
  // 2. `useAutoSave`가 로컬과 서버에 데이터 저장 후 상태 반환.
  // @analogy 도서관에서 책 정보를 자동 저장 시스템에 전달

  return (
    <AutoSaveNotification
      isSaving={isSaving} // @type {boolean} - 저장 중 여부
      // @description 저장 상태 전달
      // @reason UI에 저장 상태 표시
      // @why isSaving으로 저장 진행 상태를 사용자에게 표시
      lastSaved={lastSaved} // @type {Date | null} - 마지막 저장 시간
      // @description 마지막 저장 시간 전달
      // @reason UI에 저장 시간 표시
      // @why lastSaved로 마지막 저장 시간을 사용자에게 표시
    />
  ); // @description AutoSaveNotification 컴포넌트 렌더링
  // @reason 저장 상태와 시간을 UI로 표시
  // @mechanism
  // 1. `isSaving`과 `lastSaved`를 props로 전달.
  // 2. `AutoSaveNotification`이 이를 기반으로 UI 렌더링.
  // @analogy 도서관에서 저장 상태를 게시판에 표시
}

export default memo(PostAutoSave); // @description memo로 감싸 리렌더링 최적화
// @reason 불필요한 리렌더링 방지
// @why memo를 사용하여 props가 변경되지 않으면 리렌더링 방지
// @mechanism
// 1. `memo`가 props를 비교.
// 2. 동일하면 리렌더링 건너뜀.
// @analogy 도서관에서 동일한 책 정보를 반복적으로 확인하지 않도록 기억

// **작동 매커니즘**
// 1. `useCheckAuthToken`으로 인증 상태 가져오기: 로그인 상태와 토큰 확인.
// 2. `useMemo`로 드래프트 데이터 생성: formData와 imageUrls 기반으로 생성.
// 3. `useAutoSave` 훅으로 자동저장 실행: 드래프트 데이터를 주기적으로 저장.
// 4. `AutoSaveNotification`으로 UI 표시: 저장 상태와 시간 표시.
// 5. `memo`로 불필요한 리렌더링 방지.
// @reason 드래프트 데이터를 주기적으로 저장하고 사용자에게 상태를 알림
// @analogy 도서관에서 책 정보를 저장하고 사서에게 상태를 알리는 시스템
=======
import { useAutoSave } from './hooks/useAutoSave';
import AutoSaveNotification from './parts/AutoSaveNotification';
import useGetDraftState from '@/stores/draft/useGetDraftState';
import { useCheckAuthToken } from '@/hooks/useCheckUserAuthToken';

interface PostAutoSaveProps {
  formData: {
    postTitle: string;
    postDesc: string;
    postContent: string;
    tags: string[];
  };
  imageUrls: string[];
}

function PostAutoSave({ formData, imageUrls }: PostAutoSaveProps) {
  const { isSignedIn, getToken } = useCheckAuthToken();
  const draftFromStore = useGetDraftState();

  const draft = {
    ...draftFromStore,
    postTitle: formData.postTitle || draftFromStore.postTitle,
    postDesc: formData.postDesc || draftFromStore.postDesc,
    postContent: formData.postContent || draftFromStore.postContent,
    tags: formData.tags || draftFromStore.tags,
    imageUrls: imageUrls || draftFromStore.imageUrls,
  };

  const { isSaving, lastSaved } = useAutoSave(draft, isSignedIn, getToken);

  console.log('PostAutoSave - draft:', draft);

  return <AutoSaveNotification isSaving={isSaving} lastSaved={lastSaved} />;
}

export default PostAutoSave;
>>>>>>> 628107a (🐛 [최신수정] 이전 커밋으로 이동하여 타입 및 인자수 에러를 수정하고 최신으로 커밋함)
