/**
 * @file PostAutoSave.tsx
 * @description 드래프트 데이터를 주기적으로 자동저장하고 알림 UI를 표시하는 컴포넌트
 */

import { useAutoSave } from './hooks/useAutoSave';
import AutoSaveNotification from './parts/AutoSaveNotification';
import useGetDraftState from '@/stores/draft/useGetDraftState';
import { useCheckAuthToken } from '@/hooks/useCheckUserAuthToken';

// 자동저장 컴포넌트 정의
function PostAutoSave() {
  const { isSignedIn, getToken } = useCheckAuthToken();
  const draft = useGetDraftState();
  const { isSaving, lastSaved } = useAutoSave(draft, isSignedIn, getToken);

  console.log(' PostAutoSave - draft:', draft);

  return (
    <AutoSaveNotification
      isSaving={isSaving} // @type {boolean} - 저장 중 여부
      lastSaved={lastSaved} // @type {Date | null} - 마지막 저장 시간
    />
  );
}

export default PostAutoSave;
