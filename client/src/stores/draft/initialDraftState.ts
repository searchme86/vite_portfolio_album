/**
 * @file initialDraftState.ts
 * @description 드래프트 상태 타입 정의
 * @location src/stores/draft/initialDraftState.ts
 */
import { v4 as uuidv4 } from 'uuid'; // @type {Function} - UUID 생성 함수

export interface DraftState {
  postTitle: string; // @type {string}
  postDesc: string; // @type {string}
  postContent: string; // @type {string}
  tags: string[]; // @type {string[]}
  imageUrls: string[]; // @type {string[]}
  custom: Record<string, any>; // @type {Record<string, any>}
  draftId: string; // @type {string}
  createdAt: Date | string | undefined; // @type {Date | string | undefined}
  updatedAt: Date | string | undefined; // @type {Date | string | undefined}
  isTemporary: boolean; // @type {boolean}
}

export const initialDraftState: DraftState = {
  postTitle: '',
  postDesc: '',
  postContent: '',
  tags: [],
  imageUrls: [],
  custom: {},
  draftId: uuidv4(),
  createdAt: undefined,
  updatedAt: undefined,
  isTemporary: false,
};
