/**
 * @file useAutoSave.ts
 * @description 드래프트 데이터를 localStorage와 서버에 자동저장하는 커스텀 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSave.ts
 */
import { useRef } from 'react';
import type { DraftState } from '../../../../../stores/draft/initialDraftState';
import { useAutoSaveLocalStorage } from './useAutoSaveLocalStorage';
import useAutoSaveServerSync from './useAutoSaveServerSync';
import { useAutoSaveNetworkStatus } from './useAutoSaveNetworkStatus';

interface AutoSaveResult {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
  lastSaved: Date | null; // @type {Date | null} - 마지막 저장 시간
}

export function useAutoSave(
  draft: DraftState, // @type {DraftState} - 드래프트 데이터
  isSignedIn: boolean | undefined, // @type {boolean | undefined} - 로그인 상태
  getToken: () => Promise<string | null> // @type {Function} - 토큰 가져오기 함수
): AutoSaveResult {
  const previousDraftRef = useRef<DraftState | null>(null); // @type {DraftState | null} - 이전 드래프트 데이터
  // @description 이전 드래프트 데이터 저장
  // @reason 변경 감지

  const isOnline = useAutoSaveNetworkStatus(); // @type {boolean} - 네트워크 상태
  // @description 네트워크 상태 확인
  // @reason 서버 저장 제어

  const { isSaving: isLocalSaving } = useAutoSaveLocalStorage(draft); // @type {Object} - 로컬 저장 상태
  // @description 로컬 저장 실행 및 상태 가져오기
  // @reason 로컬 저장 관리

  const { isSaving: isServerSaving, lastSaved } = useAutoSaveServerSync(
    draft,
    isOnline,
    isSignedIn,
    getToken
  ); // @type {Object} - 서버 저장 상태
  // @description 서버 저장 실행 및 상태 가져오기
  // @reason 서버 저장 관리

  // 데이터 변경 감지
  const hasChanged =
    JSON.stringify(previousDraftRef.current) !== JSON.stringify(draft); // @type {boolean} - 변경 여부
  // @description 이전 데이터와 현재 데이터 비교
  // @reason 변경 여부 확인
  if (hasChanged) {
    console.log('useAutoSave - Changes detected:', {
      previous: previousDraftRef.current,
      current: draft,
    });
    // @description 변경 감지 로그
    // @reason 변경 상태 확인
    previousDraftRef.current = draft; // @type {DraftState} - 이전 데이터 업데이트
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
  // @reason 데이터 상태 확인

  // isSaving이 항상 정의되도록 보장
  const finalIsSaving = isLocalSaving || isServerSaving || false; // @type {boolean} - 최종 저장 상태
  // @description 로컬 또는 서버 저장 중 여부 확인
  // @reason undefined 방지

  return {
    isSaving: finalIsSaving,
    lastSaved: lastSaved || new Date(), // @type {Date} - null이면 기본값 설정
    // @description lastSaved가 null일 경우 현재 시간으로 대체
    // @reason AutoSaveNotification에서 null 방지
    // @analogy 도서관에서 저장 시간이 없으면 현재 시간으로 기록
  };
}
