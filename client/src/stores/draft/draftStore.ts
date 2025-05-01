/**
 * @file draftStore.ts
 * @description Zustand를 사용한 드래프트 상태 관리 스토어
 */
import { create } from 'zustand'; // @type {Function}
import { persist, createJSONStorage } from 'zustand/middleware'; // @type {Function}
import { draftSetters } from './draftSetters';
import { draftGetters } from './draftGetters';
import type { DraftState } from './initialDraftState';

export type DraftStore = DraftState & {
  updateDraft: (draft: Partial<DraftState>) => void;
  resetDraft: () => void;
  getPostTitle: () => string;
  getPostDesc: () => string;
  getPostContent: () => string;
  getTags: () => string[];
  getImageUrls: () => string[];
  getCustom: () => Record<string, any>;
  getDraftId: () => string;
  getCreatedAt: () => Date | string | undefined;
  getUpdatedAt: () => Date | string | undefined;
  getIsTemporary: () => boolean;
};

const useDraftStore = create<DraftStore>()(
  persist(
    (set, get) => ({
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
      ...draftGetters(get),
      ...draftSetters(set, get),
    }),
    {
      name: 'draft-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDraftStore;
