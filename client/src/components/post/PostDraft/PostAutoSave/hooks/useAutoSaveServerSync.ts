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
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const saveToServer = async () => {
    if (!isOnline) {
      console.log('useAutoSaveServerSync - Offline, skipping server save');
      return;
    }

    if (isSignedIn !== true) {
      console.log(
        'useAutoSaveServerSync - Not signed in, skipping server save'
      );
      return;
    }

    const token = await getToken();
    if (!token) {
      console.log('useAutoSaveServerSync - No token, skipping server save');
      return;
    }

    console.log(
      'useAutoSaveServerSync - Attempting to save draft to server:',
      draftData
    );

    autoSave(draftData);
  };

  useEffect(() => {
    if (data?.success) {
      const now = new Date();
      setLastSaved(now);
      console.log('useAutoSaveServerSync - Last saved updated:', now);
    } else if (!data && !error) {
      // 데이터가 없고 에러도 없으면 기본값 설정
      setLastSaved(new Date());
      console.log('useAutoSaveServerSync - No data, setting default lastSaved');
    } else if (error) {
      console.log('useAutoSaveServerSync - Save failed:', error.message);
      setLastSaved(new Date()); // 에러 발생 시에도 기본값 설정
    }
  }, [data, error]);

  useEffect(() => {
    console.log('useAutoSaveServerSync - Setting up auto-save interval');

    intervalRef.current = setInterval(async () => {
      await saveToServer();
    }, 30000);

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
    isSaving: isPending,
    lastSaved,
  };
}
