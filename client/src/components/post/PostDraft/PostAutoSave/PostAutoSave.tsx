/**
 * @file PostAutoSave.tsx
 * @description 드래프트 데이터를 주기적으로 자동저장하고 알림 UI를 표시하는 컴포넌트
 * @location src/components/post/PostDraft/PostAutoSave/PostAutoSave.tsx
 */

import { useAutoSave } from './hooks/useAutoSave'; // @type {Function} - 자동저장 훅
// @description 드래프트 자동저장 로직 가져오기
// @reason 자동저장 기능 사용

import AutoSaveNotification from './parts/AutoSaveNotification'; // @type {Component} - 자동저장 알림 컴포넌트
// @description 저장 상태 알림 UI
// @reason 사용자에게 저장 상태 표시

import useGetDraftState from '@/stores/draft/useGetDraftState'; // @type {Function} - 드래프트 데이터 가져오기 훅
// @description Zustand 스토어에서 드래프트 데이터 가져오기
// @reason 드래프트 데이터 접근

import { useCheckAuthToken } from '@/hooks/useCheckUserAuthToken'; // @type {Function} - 인증 상태 확인 훅
// @description 인증 상태와 토큰 가져오기
// @reason Props drilling 없이 인증 상태 확인

// 자동저장 컴포넌트 정의
function PostAutoSave() {
  const { isSignedIn, getToken } = useCheckAuthToken(); // 인증 상태와 토큰 가져오기
  // @description useCheckAuthToken으로 인증 상태 확인
  // @reason Props drilling 방지

  const draft = useGetDraftState(); // 드래프트 데이터 가져오기
  // @description Zustand 스토어에서 드래프트 데이터 가져오기
  // @reason 자동저장에 필요한 데이터

  const { isSaving, lastSaved } = useAutoSave(draft, isSignedIn, getToken); // 자동저장 훅 호출
  // @description 드래프트 데이터를 자동저장
  // @reason 주기적 저장 실행

  console.log('PostAutoSave - draft:', draft); // 디버깅: 드래프트 데이터 확인

  return (
    <AutoSaveNotification
      isSaving={isSaving} // @type {boolean} - 저장 중 여부
      // @description 저장 상태 전달
      // @reason UI에 저장 상태 표시
      lastSaved={lastSaved} // @type {Date | null} - 마지막 저장 시간
      // @description 마지막 저장 시간 전달
      // @reason UI에 저장 시간 표시
    />
  );
}

export default PostAutoSave;

// **작동 매커니즘**
// 1. `useCheckAuthToken`으로 인증 상태 가져오기: 로그인 상태와 토큰 확인.
// 2. `useGetDraftState`로 드래프트 데이터 가져오기: Zustand 스토어에서 데이터 가져옴.
// 3. `useAutoSave` 훅으로 자동저장 실행: 드래프트 데이터를 주기적으로 저장.
// 4. `AutoSaveNotification`으로 UI 표시: 저장 상태와 시간 표시.
// @reason 드래프트 데이터를 주기적으로 저장하고 사용자에게 상태를 알림.
