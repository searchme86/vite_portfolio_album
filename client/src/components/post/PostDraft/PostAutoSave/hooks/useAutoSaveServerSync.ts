/**
 * @file useAutoSaveServerSync.ts
 * @description 드래프트 데이터를 서버에 자동저장하는 커스텀 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSaveServerSync.ts
 */
import { useEffect, useRef, useState } from 'react';
import useAutoSaveMutation from '../../../../../api/draft/mutations/useAutoSaveMutation';
import type { DraftState } from '../../../../../stores/draft/initialDraftState';

interface AutoSaveServerSyncResult {
  isSaving: boolean;
  lastSaved: Date | null;
}

export default function useAutoSaveServerSync(
  draftData: DraftState,
  isOnline: boolean,
  isSignedIn: boolean | undefined,
  getToken: () => Promise<string | null>
): AutoSaveServerSyncResult {
  const { autoSave, isPending, error, data } = useAutoSaveMutation();
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [isSavingLocal, setIsSavingLocal] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousDraftRef = useRef<DraftState | null>(null);

  const saveToServer = async () => {
    const hasChanged =
      JSON.stringify(previousDraftRef.current) !== JSON.stringify(draftData);
    if (!hasChanged) {
      console.log('useAutoSaveServerSync - No changes detected, skipping save');
      setIsSavingLocal(false);
      return;
    }

    if (!isOnline) {
      console.log('useAutoSaveServerSync - Offline, skipping server save');
      setIsSavingLocal(false);
      return;
    }

    if (isSignedIn !== true) {
      console.log(
        'useAutoSaveServerSync - Not signed in, skipping server save'
      );
      setIsSavingLocal(false);
      return;
    }

    const token = await getToken();
    if (!token) {
      console.log('useAutoSaveServerSync - No token, skipping server save');
      setIsSavingLocal(false);
      return;
    }

    if (
      !draftData.postTitle ||
      draftData.postTitle.trim() === '' ||
      !draftData.postContent ||
      draftData.postContent.trim() === '' ||
      draftData.postContent === '<p><br></p>' ||
      !draftData.draftId ||
      draftData.draftId.trim() === ''
    ) {
      console.log(
        'useAutoSaveServerSync - Missing required fields, skipping save:',
        draftData
      );
      setIsSavingLocal(false);
      return;
    }

    //====여기부터 수정됨====
    setIsSavingLocal(true);
    console.log(
      'useAutoSaveServerSync - Attempting to save draft to server:',
      draftData
    );
    await autoSave(draftData);
    previousDraftRef.current = { ...draftData }; // 깊은 복사로 변경 감지 보장
    // @description 이전 데이터에 깊은 복사 적용
    // @reason 동일한 참조 문제로 인해 변경 감지 실패 방지
    //====여기까지 수정됨====
  };

  useEffect(() => {
    if (data?.success) {
      const now = new Date();
      setLastSaved(now);
      setIsSavingLocal(false);
      console.log('useAutoSaveServerSync - Last saved updated:', now);
    } else if (error) {
      console.log('useAutoSaveServerSync - Save failed:', error.message);
      setLastSaved(new Date());
      setIsSavingLocal(false);
    } else if (!data && !error) {
      console.log('useAutoSaveServerSync - No data, keeping default lastSaved');
    }
  }, [data, error]);

  useEffect(() => {
    console.log('useAutoSaveServerSync - Setting up auto-save interval');
    //====여기부터 수정됨====
    intervalRef.current = setInterval(async () => {
      await saveToServer();
    }, 5000); // 5초로 단축
    // @description 인터벌을 5초로 변경
    // @reason 10초 이내 애니메이션 트리거 보장
    // @why 30초 설정으로 인해 지연 발생
    //====여기까지 수정됨====

    if (error) {
      console.log(
        'useAutoSaveServerSync - Error occurred, but continuing auto-save:',
        error.message
      );
    }

    return () => {
      if (intervalRef.current) {
        console.log('useAutoSaveServerSync - Cleaning up auto-save interval');
        clearInterval(intervalRef.current);
      }
    };
  }, [draftData, error, isOnline, isSignedIn]);

  return {
    isSaving: isSavingLocal || isPending,
    lastSaved,
  };
}
