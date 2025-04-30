/**
 * @file useAutoSaveServerSync.ts
 * @description 드래프트 데이터를 서버에 동기화하는 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSaveServerSync.ts
 */
import { useState, useEffect } from 'react'; // @type {Function} - React 훅
// @description 상태와 이펙트 관리
// @reason 저장 상태 및 동기화 관리

import useAutoSaveMutation from '../../../../../api/draft/mutations/useAutoSaveMutation'; // @type {Function} - 자동저장 뮤테이션 훅
// @description 서버에 드래프트 저장
// @reason 서버 동기화

import { GetToken } from '@clerk/types'; // @type {Function} - Clerk 토큰 가져오기 타입
// @description 토큰 가져오기 타입 정의
// @reason 타입 안정성 보장

import type { DraftState } from '../../../../../stores/draft/initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장

const SERVER_SYNC_INTERVAL = 10000; // @type {number} - 서버 동기화 주기 (10초)
// @description 서버 동기화 주기 설정
// @reason 서버와의 동기화 빈도 조절

export function useAutoSaveServerSync(
  draft: DraftState,
  isSignedIn: boolean | undefined,
  getToken: GetToken,
  isOnline: boolean
) {
  const [isSaving, setIsSaving] = useState<boolean>(false); // @type {boolean} - 저장 중 여부
  // @description 서버 저장 중 여부 관리
  // @reason UI에 저장 상태 표시

  const [lastSaved, setLastSaved] = useState<Date | null>(null); // @type {Date | null} - 마지막 저장 시간
  // @description 마지막 저장 시간 관리
  // @reason 사용자에게 마지막 저장 시간 표시

  const { autoSave: serverAutoSave, isLoading: isServerSaving } =
    useAutoSaveMutation(isSignedIn, getToken); // @type {Object} - 서버 저장 뮤테이션
  // @description 서버 저장 뮤테이션 훅 초기화
  // @reason 서버에 드래프트 저장

  const saveToServer = async (draftData: DraftState) => {
    if (!isOnline || !isSignedIn) {
      console.log(
        'useAutoSaveServerSync - Skipping server save: Offline or not authenticated'
      );
      // @description 오프라인 또는 미인증 상태 로그
      // @reason 불필요한 저장 시도 방지
      return; // 오프라인 또는 미인증 상태면 저장 건너뛰기
    }

    try {
      setIsSaving(true); // 저장 상태 활성화
      // @description 저장 상태 활성화
      // @reason UI 업데이트

      // createdAt을 Date 객체로 변환하거나 기본값 제공
      const createdAtValue = draftData.createdAt
        ? draftData.createdAt instanceof Date
          ? draftData.createdAt.toISOString() // Date 객체이면 toISOString 호출
          : new Date(draftData.createdAt).toISOString() // string이면 Date로 변환
        : new Date().toISOString(); // 없으면 현재 시간
      // @description createdAt을 Date 객체로 변환하거나 기본값 설정
      // @reason toISOString 호출 전 Date 객체 보장

      const draftToSave = {
        postTitle: draftData.postTitle || '', // @type {string} - 제목
        postDesc: draftData.postDesc || '', // @type {string} - 설명
        postContent: draftData.postContent || '', // @type {string} - 본문
        tags: draftData.tags || [], // @type {string[]} - 태그
        imageUrls: draftData.imageUrls || [], // @type {string[]} - 이미지 URL
        custom: draftData.custom || {}, // @type {Record<string, any>} - 커스텀 데이터
        draftId: draftData.draftId || '', // @type {string} - 드래프트 ID
        createdAt: createdAtValue, // @type {string} - 생성 시간
        updatedAt: new Date().toISOString(), // @type {string} - 수정 시간
        isTemporary: draftData.isTemporary || false, // @type {boolean} - 임시저장 여부
      }; // @type {Object} - 서버에 저장할 드래프트 데이터
      // @description 서버에 전송할 데이터 준비
      // @reason 서버 API와의 호환
      await serverAutoSave(draftToSave); // 서버에 저장
      // @description 서버 저장 실행
      // @reason 서버 동기화
      console.log('useAutoSaveServerSync - Saved to server:', draftToSave);
      // @description 서버 저장 성공 로그
      // @reason 저장 확인

      const saveTime = new Date(); // @type {Date} - 현재 시간
      // @description 현재 시간 저장
      // @reason 저장 시간 기록
      setLastSaved(saveTime); // 마지막 저장 시간 업데이트
      // @description 마지막 저장 시간 설정
      // @reason UI 업데이트
      console.log('useAutoSaveServerSync - Saved at:', saveTime);
      // @description 저장 시점 로그
      // @reason 저장 시점 확인
    } catch (error) {
      console.error('useAutoSaveServerSync - Server save failed:', error);
      // @description 서버 저장 실패 로그
      // @reason 디버깅 및 오류 추적
      // Fallback: 서버 저장 실패 시 로그만 남김
    } finally {
      setIsSaving(false); // 저장 상태 비활성화
      // @description 저장 상태 비활성화
      // @reason UI 업데이트
    }
  };

  useEffect(() => {
    if (!draft) {
      console.warn('useAutoSaveServerSync - No draft data provided');
      // @description 드래프트 데이터 없음 경고
      // @reason 데이터 유효성 확인
      return; // 드래프트 데이터 없으면 실행 중지
    }

    const isDraftValid = draft.postTitle || draft.postDesc || draft.postContent;
    if (!isDraftValid) {
      console.log('useAutoSaveServerSync - Draft is empty, skipping save');
      // @description 드래프트 데이터 비어 있음 로그
      // @reason 불필요한 저장 방지
      return; // 드래프트 데이터가 비어 있으면 저장 건너뛰기
    }

    saveToServer(draft); // 최초 서버 저장
    // @description 초기 저장 실행
    // @reason 초기 데이터 동기화

    const serverSyncInterval = setInterval(() => {
      saveToServer(draft); // 주기적으로 서버에 저장
      // @description 10초 간격으로 서버 동기화
      // @reason 데이터 일관성 유지
    }, SERVER_SYNC_INTERVAL);

    return () => {
      clearInterval(serverSyncInterval); // 인터벌 정리
      // @description 인터벌 정리
      // @reason 컴포넌트 언마운트 시 리소스 정리
      console.log('useAutoSaveServerSync - Cleanup completed');
      // @description 정리 완료 로그
      // @reason 정리 확인
    };
  }, [
    draft.postTitle,
    draft.postDesc,
    draft.postContent,
    draft.tags,
    draft.imageUrls,
    draft.custom,
    draft.draftId,
    draft.createdAt,
    draft.updatedAt,
    draft.isTemporary,
    isOnline,
    isSignedIn,
  ]); // @description 드래프트 데이터 속성별 의존
  // @reason 변경 감지

  return { isSaving: isSaving || isServerSaving, lastSaved }; // 저장 상태와 마지막 저장 시간 반환
  // @description 서버 저장 상태와 마지막 저장 시간 반환
  // @reason 상위 훅에서 사용
}
