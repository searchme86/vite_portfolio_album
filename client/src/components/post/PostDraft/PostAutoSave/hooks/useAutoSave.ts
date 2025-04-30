/**
 * @file useAutoSave.ts
 * @description 드래프트 데이터를 localStorage와 서버에 자동저장하는 커스텀 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSave.ts
 */
import { useRef } from 'react'; // @type {Function} - React 훅
// @description 참조 관리
// @reason 이전 드래프트 데이터 저장

import { GetToken } from '@clerk/types'; // @type {Function} - Clerk 토큰 가져오기 타입
// @description 토큰 가져오기 타입 정의
// @reason 타입 안정성 보장

import type { DraftState } from '../../../../../stores/draft/initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장

import { useAutoSaveLocalStorage } from './useAutoSaveLocalStorage'; // @type {Function} - localStorage 저장 훅
// @description localStorage 저장 로직
// @reason 저장 분리

import { useAutoSaveServerSync } from './useAutoSaveServerSync'; // @type {Function} - 서버 동기화 훅
// @description 서버 동기화 로직
// @reason 동기화 분리

import { useAutoSaveNetworkStatus } from './useAutoSaveNetworkStatus'; // @type {Function} - 네트워크 상태 훅
// @description 네트워크 상태 감지
// @reason 네트워크 상태 관리

export function useAutoSave(
  draft: DraftState, // @type {Object} - 드래프트 데이터
  isSignedIn: boolean | undefined, // @type {boolean | undefined} - 로그인 상태
  getToken: GetToken // @type {Function} - 토큰 가져오기 함수
) {
  const previousDraftRef = useRef<DraftState | null>(null); // @type {Object | null} - 이전 드래프트 데이터
  // @description 이전 드래프트 데이터 저장
  // @reason 변경 감지

  const isOnline = useAutoSaveNetworkStatus(); // 네트워크 상태 감지
  // @description 네트워크 상태 가져오기
  // @reason 서버 저장 제어

  const { isSaving: isLocalSaving } = useAutoSaveLocalStorage(draft); // localStorage 저장
  // @description localStorage 저장 실행
  // @reason 로컬 저장 관리

  const { isSaving: isServerSaving, lastSaved } = useAutoSaveServerSync(
    draft,
    isSignedIn,
    getToken,
    isOnline
  ); // 서버 동기화
  // @description 서버 동기화 실행
  // @reason 서버 저장 관리

  // 데이터 변경 감지
  const hasChanged =
    JSON.stringify(previousDraftRef.current) !== JSON.stringify(draft);
  // @description 이전 데이터와 현재 데이터 비교
  // @reason 변경 여부 확인
  if (hasChanged) {
    console.log('useAutoSave - Changes detected:', {
      previous: previousDraftRef.current,
      current: draft,
    });
    // @description 변경 감지 로그
    // @reason 디버깅
    previousDraftRef.current = draft; // 이전 데이터 업데이트
    // @description 현재 드래프트 데이터를 이전 데이터로 저장
    // @reason 다음 변경 감지 준비
  }

  // 디버깅: draft 데이터 확인
  console.log('useAutoSave - Draft data:', {
    postTitle: draft.postTitle,
    postDesc: draft.postDesc,
    postContent: draft.postContent,
  });
  // @description 드래프트 데이터 로그
  // @reason 데이터 확인

  // isSaving이 항상 정의되도록 보장
  const finalIsSaving = isLocalSaving || isServerSaving || false; // @type {boolean} - 최종 저장 상태
  // @description isLocalSaving과 isServerSaving이 undefined일 경우 false로 대체
  // @reason isSaving이 undefined가 되지 않도록 보장

  return { isSaving: finalIsSaving, lastSaved }; // 저장 상태와 마지막 저장 시간 반환
  // @description 저장 상태와 마지막 저장 시간 반환
  // @reason 컴포넌트에서 사용
}
