/**
 * @file draftSetters.ts
 * @description 드래프트 상태를 변경하는 Zustand 액션 함수
 */
import { DraftState } from './initialDraftState';

// 드래프트 상태를 변경하는 함수 정의
// @description set과 get 함수를 사용하여 상태 변경 로직 정의
// @reason 상태 변경 로직 캡슐화
// @analogy 도서관에서 대여 장부를 업데이트
export const draftSetters = (
  set: (fn: (state: DraftState) => DraftState) => void,
  get: () => DraftState
) => ({
  updateDraft: (draft: Partial<DraftState>): void => {
    const currentState = get(); // @type {DraftState} - 현재 Zustand 스토어 상태
    const updatedState: DraftState = {
      postTitle:
        draft.postTitle !== undefined
          ? draft.postTitle
          : currentState.postTitle, // @type {string}
      postDesc:
        draft.postDesc !== undefined ? draft.postDesc : currentState.postDesc, // @type {string}
      postContent:
        draft.postContent !== undefined
          ? draft.postContent
          : currentState.postContent, // @type {string}
      tags: draft.tags !== undefined ? draft.tags : currentState.tags, // @type {string[]}
      imageUrls:
        draft.imageUrls !== undefined
          ? draft.imageUrls
          : currentState.imageUrls, // @type {string[]}
      custom: draft.custom !== undefined ? draft.custom : currentState.custom, // @type {Record<string, any>}
      draftId:
        draft.draftId !== undefined ? draft.draftId : currentState.draftId, // @type {string}
      createdAt:
        draft.createdAt !== undefined
          ? draft.createdAt
          : currentState.createdAt, // @type {Date | string | undefined}
      updatedAt: draft.updatedAt !== undefined ? draft.updatedAt : new Date(), // @type {Date | string | undefined}
      isTemporary:
        draft.isTemporary !== undefined
          ? draft.isTemporary
          : currentState.isTemporary, // @type {boolean}
    };
    set(() => updatedState); // @description Zustand 스토어 상태 업데이트
  },

  resetDraft: (): void => {
    set(() => ({
      postTitle: '', // @type {string}
      postDesc: '', // @type {string}
      postContent: '', // @type {string}
      tags: [], // @type {string[]}
      imageUrls: [], // @type {string[]}
      custom: {}, // @type {Record<string, any>}
      draftId: '', // @type {string}
      createdAt: new Date(), // @type {Date}
      updatedAt: new Date(), // @type {Date}
      isTemporary: false, // @type {boolean}
    })); // @description 초기 상태로 리셋
  },
});
