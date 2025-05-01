/**
 * @file draftGetters.ts
 * @description 드래프트 Zustand 스토어에서 상태를 가져오는 함수 정의
 */
import { DraftState } from './initialDraftState';

export const draftGetters = (get: () => DraftState) => ({
  getPostTitle: (): string => get().postTitle || '',
  getPostDesc: (): string => get().postDesc || '',
  getPostContent: (): string => get().postContent || '',
  getTags: (): string[] => get().tags || [],
  getImageUrls: (): string[] => get().imageUrls || [],
  getCustom: (): Record<string, any> => get().custom || {},
  getDraftId: (): string => get().draftId || '',
  getCreatedAt: (): Date | string | undefined => get().createdAt || new Date(),
  getUpdatedAt: (): Date | string | undefined => get().updatedAt || new Date(),
  getIsTemporary: (): boolean => get().isTemporary || false,
});
