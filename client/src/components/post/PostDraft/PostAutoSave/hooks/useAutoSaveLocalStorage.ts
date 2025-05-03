/**
 * @file useAutoSaveLocalStorage.ts
 * @description 드래프트 데이터를 localStorage에 자동저장하는 커스텀 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSaveLocalStorage.ts
 */
import { useEffect, useState, useRef } from 'react';
import type { DraftState } from '../../../../../stores/draft/initialDraftState';

interface AutoSaveLocalStorageResult {
  isSaving: boolean;
}

const DRAFT_STORAGE_KEY = 'draft_data';

export function useAutoSaveLocalStorage(
  draft: DraftState
): AutoSaveLocalStorageResult {
  const [isSaving, setIsSaving] = useState(false);
  const previousDraftRef = useRef<DraftState | null>(null);

  useEffect(() => {
    const hasChanged =
      JSON.stringify(previousDraftRef.current) !== JSON.stringify(draft);
    if (!hasChanged) {
      console.log(
        'useAutoSaveLocalStorage - No changes detected, skipping save'
      );
      return;
    }

    const saveToLocalStorage = async () => {
      try {
        setIsSaving(true);
        const serializedDraft = JSON.stringify({
          ...draft,
          updatedAt: new Date().toISOString(),
        });
        localStorage.setItem(DRAFT_STORAGE_KEY, serializedDraft);
        // @description 최신 데이터만 저장
        // @reason 이전 데이터 삭제 대신 최신으로 덮어쓰기
        // @why 사용자가 이전 데이터 삭제를 원하지 않음
        previousDraftRef.current = { ...draft };
        console.log('useAutoSaveLocalStorage - Saved to localStorage:', draft);
      } catch (error) {
        console.error('useAutoSaveLocalStorage - Failed to save:', error);
      } finally {
        setIsSaving(false);
      }
    };

    saveToLocalStorage();
  }, [draft]);

  return {
    isSaving,
  };
}
