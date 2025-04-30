/**
 * @file useAutoSave.ts
 * @description 드래프트 데이터를 localStorage와 서버에 자동저장하는 커스텀 훅
 */

import { useState, useEffect, useRef } from 'react'; // @type {Function} - React 훅
// @description 상태와 이펙트 관리
// @reason 자동저장 상태 관리

import useAutoSaveMutation from '../../../../../api/draft/mutations/useAutoSaveMutation'; // @type {Function} - 자동저장 뮤테이션 훅
// @description 서버에 드래프트 저장
// @reason 서버 동기화

import { GetToken } from '@clerk/types'; // @type {Function} - Clerk 토큰 가져오기 타입
// @description 토큰 가져오기 타입 정의
// @reason 타입 안정성 보장

import type { DraftState } from '../../../../../stores/draft/initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장

// 자동저장 주기 (밀리초 단위)
const AUTO_SAVE_INTERVAL = 5000; // localStorage 저장 주기: 5초
// @description localStorage 저장 주기 설정
// @reason 주기적 저장으로 데이터 손실 방지

const SERVER_SYNC_INTERVAL = 10000; // 서버 동기화 주기: 10초
// @description 서버 동기화 주기 설정
// @reason 서버와의 동기화 빈도 조절

// 드래프트 데이터를 주기적으로 자동저장
export const useAutoSave = (
  draft: DraftState, // @type {Object} - 드래프트 데이터
  isSignedIn: boolean | undefined, // @type {boolean | undefined} - 로그인 상태
  getToken: GetToken // @type {Function} - 토큰 가져오기 함수
) => {
  const [isSaving, setIsSaving] = useState<boolean>(false); // @type {boolean} - 저장 중 여부
  // @description 저장 상태 관리
  // @reason UI에 저장 상태 표시

  const [lastSaved, setLastSaved] = useState<Date | null>(null); // @type {Date | null} - 마지막 저장 시간
  // @description 마지막 저장 시간 관리
  // @reason 사용자에게 마지막 저장 시간 표시

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine); // @type {boolean} - 네트워크 상태
  // @description 네트워크 상태 관리
  // @reason 오프라인 시 서버 저장 건너뛰기

  const previousDraftRef = useRef<DraftState | null>(null); // @type {Object | null} - 이전 드래프트 데이터
  // @description 이전 드래프트 데이터 저장
  // @reason 변경 감지

  // useAutoSaveMutation 훅 초기화
  const { autoSave: serverAutoSave, isLoading: isServerSaving } =
    useAutoSaveMutation(isSignedIn, getToken); // @type {Object} - 서버 저장 뮤테이션
  // @description 서버 저장 뮤테이션 훅 초기화
  // @reason 서버에 드래프트 저장

  // 네트워크 상태 감지
  useEffect(() => {
    const handleOnline = () => {
      console.log('useAutoSave - Network status: Online');
      setIsOnline(true); // 온라인 상태로 업데이트
    };
    const handleOffline = () => {
      console.log('useAutoSave - Network status: Offline');
      setIsOnline(false); // 오프라인 상태로 업데이트
    };

    window.addEventListener('online', handleOnline); // 온라인 이벤트 리스너 추가
    window.addEventListener('offline', handleOffline); // 오프라인 이벤트 리스너 추가

    return () => {
      window.removeEventListener('online', handleOnline); // 이벤트 리스너 제거
      window.removeEventListener('offline', handleOffline); // 이벤트 리스너 제거
    };
  }, []); // 의존성 배열: 빈 배열로 최초 렌더링 시에만 실행

  // localStorage에 저장하는 함수
  const saveToLocalStorage = (draftData: DraftState) => {
    try {
      const draftKey = `draft_${draftData.draftId || 'default'}`; // @type {string} - localStorage 키
      // @description 드래프트 데이터 저장 키 생성
      // @reason 고유한 키로 데이터 저장
      const draftToSave = {
        postTitle: draftData.postTitle,
        postDesc: draftData.postDesc,
        postContent: draftData.postContent,
        tags: draftData.tags,
        imageUrls: draftData.imageUrls,
        custom: draftData.custom,
        draftId: draftData.draftId,
        createdAt:
          draftData.createdAt?.toISOString() || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isTemporary: draftData.isTemporary,
      }; // @type {Object} - 저장할 드래프트 데이터
      // @description localStorage에 저장할 데이터 준비
      // @reason 데이터 직렬화 준비
      localStorage.setItem(draftKey, JSON.stringify(draftToSave)); // localStorage에 저장
      console.log('useAutoSave - Saved to localStorage:', draftKey);
    } catch (error) {
      console.error('useAutoSave - Failed to save to localStorage:', error);
      // Fallback: 저장 실패 시 로그만 남김
    }
  };

  // 서버에 저장하는 함수
  const saveToServer = async (draftData: DraftState) => {
    if (!isOnline || !isSignedIn) {
      console.log(
        'useAutoSave - Skipping server save: Offline or not authenticated'
      );
      return; // 오프라인 또는 미인증 상태면 저장 건너뛰기
    }

    try {
      setIsSaving(true); // 저장 상태 활성화
      const draftToSave = {
        postTitle: draftData.postTitle,
        postDesc: draftData.postDesc,
        postContent: draftData.postContent,
        tags: draftData.tags,
        imageUrls: draftData.imageUrls,
        custom: draftData.custom,
        draftId: draftData.draftId || '',
        createdAt:
          draftData.createdAt?.toISOString() || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isTemporary: draftData.isTemporary,
      }; // @type {Object} - 서버에 저장할 드래프트 데이터
      // @description 서버에 전송할 데이터 준비
      // @reason 서버 API와의 호환

      await serverAutoSave(draftToSave); // 서버에 저장
      console.log('useAutoSave - Saved to server:', draftToSave);

      const saveTime = new Date(); // 현재 시간
      setLastSaved(saveTime); // 마지막 저장 시간 업데이트
      console.log('useAutoSave - Saved at:', saveTime);
    } catch (error) {
      console.error('useAutoSave - Server save failed:', error);
      // Fallback: 서버 저장 실패 시 로그만 남김
    } finally {
      setIsSaving(false); // 저장 상태 비활성화
    }
  };

  // 드래프트 저장 로직 (localStorage + 서버 동기화)
  useEffect(() => {
    // 디버깅: draft 데이터 확인
    console.log('useAutoSave - Draft data:', {
      postTitle: draft.postTitle,
      postDesc: draft.postDesc,
      postContent: draft.postContent,
    });

    // 드래프트 데이터 유효성 검사
    if (!draft) {
      console.warn('useAutoSave - No draft data provided');
      return; // 드래프트 데이터 없으면 실행 중지
    }

    const isDraftValid = draft.postTitle || draft.postDesc || draft.postContent;
    if (!isDraftValid) {
      console.log('useAutoSave - Draft is empty, skipping save');
      return; // 드래프트 데이터가 비어 있으면 저장 건너뛰기
    }

    // 데이터 변경 감지
    const hasChanged =
      JSON.stringify(previousDraftRef.current) !== JSON.stringify(draft);
    if (!hasChanged) {
      console.log('useAutoSave - No changes detected, skipping save');
      return; // 변경 없으면 저장 건너뛰기
    }

    // 디버깅: 변경 감지 확인
    console.log('useAutoSave - Changes detected:', {
      previous: previousDraftRef.current,
      current: draft,
    });

    // 이전 데이터 업데이트
    previousDraftRef.current = draft; // 현재 드래프트 데이터 저장

    // localStorage에 저장 (5초 간격)
    const localStorageInterval = setInterval(() => {
      saveToLocalStorage(draft); // 주기적으로 localStorage에 저장
    }, AUTO_SAVE_INTERVAL);

    // 서버 동기화 (10초 간격, 온라인 상태에서만)
    const serverSyncInterval = setInterval(() => {
      saveToServer(draft); // 주기적으로 서버에 저장
    }, SERVER_SYNC_INTERVAL);

    // 초기 저장
    saveToLocalStorage(draft); // 최초 localStorage 저장
    saveToServer(draft); // 최초 서버 저장

    return () => {
      clearInterval(localStorageInterval); // 인터벌 정리
      clearInterval(serverSyncInterval); // 인터벌 정리
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
  ]); // draft 전체 대신 개별 속성을 의존성으로 추가

  return { isSaving: isSaving || isServerSaving, lastSaved }; // 저장 상태와 마지막 저장 시간 반환
};

// **작동 매커니즘**
// 1. `useState`로 `isSaving`, `lastSaved`, `isOnline` 관리: 상태 관리.
// 2. `useRef`로 이전 드래프트 데이터 저장하여 변경 감지: 변경 감지 로직.
// 3. 네트워크 상태 감지: `navigator.onLine`과 이벤트 리스너로 온라인/오프라인 상태 추적.
// 4. `saveToLocalStorage`: 드래프트 데이터를 localStorage에 저장 (5초 간격).
// 5. `saveToServer`: useAutoSaveMutation으로 서버에 저장 (10초 간격, 온라인 상태에서만).
// 6. 초기 저장 및 주기적 저장 실행: 최초 저장 후 주기적 실행.
// 7. `isSaving`과 `lastSaved` 반환: 컴포넌트에서 사용.
