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
  isSaving: boolean;
  lastSaved: Date | null;
}

export function useAutoSave(
  draft: DraftState,
  isSignedIn: boolean | undefined,
  getToken: () => Promise<string | null>
): AutoSaveResult {
  const previousDraftRef = useRef<DraftState | null>(null);

  const isOnline = useAutoSaveNetworkStatus();
  const { isSaving: isLocalSaving } = useAutoSaveLocalStorage(draft);
  const { isSaving: isServerSaving, lastSaved } = useAutoSaveServerSync(
    draft,
    isOnline,
    isSignedIn,
    getToken
  );

  const hasChanged =
    JSON.stringify(previousDraftRef.current) !== JSON.stringify(draft);
  if (hasChanged) {
    console.log('useAutoSave - Changes detected:', {
      previous: previousDraftRef.current,
      current: draft,
    });
    previousDraftRef.current = draft;
  }

  console.log('useAutoSave - Draft data:', {
    postTitle: draft.postTitle,
    postDesc: draft.postDesc,
    postContent: draft.postContent,
  });

  const finalIsSaving = isLocalSaving || isServerSaving || false;

  return { isSaving: finalIsSaving, lastSaved: lastSaved || new Date() };
}
