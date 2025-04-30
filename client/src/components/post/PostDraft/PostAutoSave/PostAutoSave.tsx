/**
 * @file PostAutoSave.tsx
 * @description 드래프트 데이터를 주기적으로 자동저장하고 알림 UI를 표시하는 컴포넌트
 */

import useAutoSave from './hooks/useAutoSave';
import AutoSaveNotification from './parts/AutoSaveNotification';
import useGetDraftState from '@/stores/draft/useGetDraftState';

// 자동저장 컴포넌트 정의
function PostAutoSave() {
  const draft = useGetDraftState();
  const { isSaving, lastSaved } = useAutoSave(draft); // @type {Object} - 자동저장 상태

  return (
    <AutoSaveNotification
      isSaving={isSaving} // @type {boolean} - 저장 중 여부
      lastSaved={lastSaved} // @type {Date | null} - 마지막 저장 시간
    />
  );
}

export default PostAutoSave;
