/**
 * @file draftSetters.ts
 * @description 드래프트 상태를 변경하는 Zustand 액션 함수
 */
import { DraftState } from './initialDraftState';

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부

export const draftSetters = (
  set: (fn: (state: DraftState) => DraftState) => void,
  get: () => DraftState
) => ({
  updateDraft: (draft: Partial<DraftState>): void => {
    const currentState = get(); // @type {DraftState} - 현재 Zustand 스토어 상태

    // 새로운 상태와 현재 상태 비교
    const hasChanges =
      (draft.postTitle !== undefined &&
        draft.postTitle !== currentState.postTitle) ||
      (draft.postDesc !== undefined &&
        draft.postDesc !== currentState.postDesc) ||
      (draft.postContent !== undefined &&
        draft.postContent !== currentState.postContent) ||
      (draft.tags !== undefined &&
        JSON.stringify(draft.tags) !== JSON.stringify(currentState.tags)) ||
      (draft.imageUrls !== undefined &&
        JSON.stringify(draft.imageUrls) !==
          JSON.stringify(currentState.imageUrls)) ||
      (draft.custom !== undefined &&
        JSON.stringify(draft.custom) !== JSON.stringify(currentState.custom)) ||
      (draft.draftId !== undefined && draft.draftId !== currentState.draftId) ||
      (draft.createdAt !== undefined &&
        draft.createdAt !== currentState.createdAt) ||
      (draft.updatedAt !== undefined &&
        draft.updatedAt !== currentState.updatedAt) ||
      (draft.isTemporary !== undefined &&
        draft.isTemporary !== currentState.isTemporary);

    if (!hasChanges) {
      if (isDebugMode) {
        console.log('draftSetters - No changes detected, skipping update');
      }
      return; // @description 변경 사항이 없으면 업데이트 중단
    }

    const updatedState: DraftState = {
      postTitle:
        draft.postTitle !== undefined
          ? draft.postTitle
          : currentState.postTitle,
      postDesc:
        draft.postDesc !== undefined ? draft.postDesc : currentState.postDesc,
      postContent:
        draft.postContent !== undefined
          ? draft.postContent
          : currentState.postContent,
      tags: draft.tags !== undefined ? draft.tags : currentState.tags,
      imageUrls:
        draft.imageUrls !== undefined
          ? draft.imageUrls
          : currentState.imageUrls,
      custom: draft.custom !== undefined ? draft.custom : currentState.custom,
      draftId:
        draft.draftId !== undefined ? draft.draftId : currentState.draftId,
      createdAt:
        draft.createdAt !== undefined
          ? draft.createdAt
          : currentState.createdAt,
      updatedAt: draft.updatedAt !== undefined ? draft.updatedAt : new Date(),
      isTemporary:
        draft.isTemporary !== undefined
          ? draft.isTemporary
          : currentState.isTemporary,
    };
    set(() => updatedState); // @description Zustand 스토어 상태 업데이트
    if (isDebugMode) {
      console.log('draftSetters - Draft state updated:', updatedState);
    }
  },

  resetDraft: (): void => {
    set(() => ({
      postTitle: '',
      postDesc: '',
      postContent: '',
      tags: [],
      imageUrls: [],
      custom: {},
      draftId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isTemporary: false,
    }));
    if (isDebugMode) {
      console.log('draftSetters - Draft state reset');
    }
  },
});
