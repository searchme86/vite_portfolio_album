/**
 * @file useAutoSave.ts
 * @description 드래프트 데이터를 localStorage와 서버에 자동저장하는 커스텀 훅
 */

import { useState, useEffect, useRef } from 'react';
import useAutoSaveMutation from '../../../../../api/draft/mutations/useAutoSaveMutation'; // React Query mutation 훅
import { GetToken } from '@clerk/types';
import type { DraftState } from '../../../../../stores/draft/initialDraftState';

type useAutoSavePropsType = {
  draft: DraftState;
  isSignedIn: boolean | undefined;
  getToken: GetToken;
};

// 자동저장 주기 (밀리초 단위)
const AUTO_SAVE_INTERVAL = 5000; // localStorage 저장 주기: 5초
const SERVER_SYNC_INTERVAL = 10000; // 서버 동기화 주기: 10초

// 드래프트 데이터를 주기적으로 자동저장

export const useAutoSave = ({
  draft,
  isSignedIn,
  getToken,
}: useAutoSavePropsType) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine); // 네트워크 상태
  const previousDraftRef = useRef<DraftState | null>(null); // 이전 드래프트 데이터 저장

  // useAutoSaveMutation 훅 초기화
  const { autoSave: serverAutoSave, isLoading: isServerSaving } =
    useAutoSaveMutation(isSignedIn, getToken);

  // 네트워크 상태 감지
  useEffect(() => {
    const handleOnline = () => {
      console.log('useAutoSave - Network status: Online');
      setIsOnline(true);
    };
    const handleOffline = () => {
      console.log('useAutoSave - Network status: Offline');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // localStorage에 저장하는 함수
  const saveToLocalStorage = (draftData: DraftState) => {
    try {
      const draftKey = `draft_${draftData.draftId || 'default'}`;
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
      };
      localStorage.setItem(draftKey, JSON.stringify(draftToSave));
      console.log('useAutoSave - Saved to localStorage:', draftKey);
    } catch (error) {
      console.error('useAutoSave - Failed to save to localStorage:', error);
    }
  };

  // 서버에 저장하는 함수
  const saveToServer = async (draftData: DraftState) => {
    if (!isOnline || !isSignedIn) {
      console.log(
        'useAutoSave - Skipping server save: Offline or not authenticated'
      );
      return;
    }

    try {
      setIsSaving(true);
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
      };

      await serverAutoSave(draftToSave);
      console.log('useAutoSave - Saved to server:', draftToSave);

      const saveTime = new Date();
      setLastSaved(saveTime);
      console.log('useAutoSave - Saved at:', saveTime);
    } catch (error) {
      console.error('useAutoSave - Server save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // 드래프트 저장 로직 (localStorage + 서버 동기화)
  useEffect(() => {
    // 드래프트 데이터 유효성 검사
    if (!draft) {
      console.warn('useAutoSave - No draft data provided');
      return;
    }

    const isDraftValid = draft.postTitle || draft.postDesc || draft.postContent;
    if (!isDraftValid) {
      console.log('useAutoSave - Draft is empty, skipping save');
      return;
    }

    // 데이터 변경 감지
    const hasChanged =
      JSON.stringify(previousDraftRef.current) !== JSON.stringify(draft);
    if (!hasChanged) {
      console.log('useAutoSave - No changes detected, skipping save');
      return;
    }

    // 이전 데이터 업데이트
    previousDraftRef.current = draft;

    // localStorage에 저장 (5초 간격)
    const localStorageInterval = setInterval(() => {
      saveToLocalStorage(draft);
    }, AUTO_SAVE_INTERVAL);

    // 서버 동기화 (10초 간격, 온라인 상태에서만)
    const serverSyncInterval = setInterval(() => {
      saveToServer(draft);
    }, SERVER_SYNC_INTERVAL);

    // 초기 저장
    saveToLocalStorage(draft);
    saveToServer(draft);

    return () => {
      clearInterval(localStorageInterval);
      clearInterval(serverSyncInterval);
    };
  }, [draft, isOnline, isSignedIn]); // draft, isOnline, isAuthenticated 의존성

  return { isSaving: isSaving || isServerSaving, lastSaved };
};

// **작동 매커니즘**
// 1. `useState`로 `isSaving`, `lastSaved`, `isOnline` 관리.
// 2. `useRef`로 이전 드래프트 데이터 저장하여 변경 감지.
// 3. 네트워크 상태 감지: `navigator.onLine`과 이벤트 리스너로 온라인/오프라인 상태 추적.
// 4. `saveToLocalStorage`: 드래프트 데이터를 localStorage에 저장 (5초 간격).
// 5. `saveToServer`: useAutoSaveMutation으로 서버에 저장 (10초 간격, 온라인 상태에서만).
// 6. 초기 저장 및 주기적 저장 실행.
// 7. `isSaving`과 `lastSaved` 반환.
