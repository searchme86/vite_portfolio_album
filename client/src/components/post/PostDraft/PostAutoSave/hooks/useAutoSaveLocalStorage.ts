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
        //====여기부터 수정됨====
        localStorage.removeItem(DRAFT_STORAGE_KEY); // 기존 데이터 삭제 보장
        // @description 기존 로컬 스토리지 데이터 삭제
        // @reason 이전 데이터가 남아 있는 문제 해결
        // @why 중복 저장으로 인해 데이터 누적
        const serializedDraft = JSON.stringify({
          ...draft,
          updatedAt: new Date().toISOString(),
        });
        localStorage.setItem(DRAFT_STORAGE_KEY, serializedDraft);
        // @description 최신 데이터만 저장
        // @reason 중복 방지 및 데이터 갱신
        previousDraftRef.current = { ...draft }; // 깊은 복사로 초기화
        // @description 이전 데이터에 깊은 복사 적용
        // @reason 참조 문제로 인한 변경 감지 실패 방지
        //====여기까지 수정됨====
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
