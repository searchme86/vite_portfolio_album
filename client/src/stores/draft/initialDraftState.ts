/**
 * @file initialDraftState.ts
 * @description 드래프트 상태 타입 정의
 * @location src/stores/draft/initialDraftState.ts
 */
import { v4 as uuidv4 } from 'uuid'; // @type {Function} - UUID 생성 함수
// @description 고유 ID 생성
// @reason 초기 draftId 생성

// 드래프트 상태 타입 정의
export interface DraftState {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 포스트 태그
  imageUrls: string[]; // @type {string[]} - 이미지 URL
  custom: Record<string, any>; // @type {Record<string, any>} - 커스텀 데이터
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: Date | string | undefined; // @type {Date | string | undefined} - 생성 시간
  updatedAt: Date | string | undefined; // @type {Date | string | undefined} - 수정 시간
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

// 초기 드래프트 상태 정의
export const initialDraftState: DraftState = {
  postTitle: '', // @type {string} - 초기 제목
  postDesc: '', // @type {string} - 초기 설명
  postContent: '', // @type {string} - 초기 본문
  tags: [], // @type {string[]} - 초기 태그
  imageUrls: [], // @type {string[]} - 초기 이미지 URL
  custom: {}, // @type {Record<string, any>} - 초기 커스텀 데이터
  draftId: uuidv4(), // @type {string} - 초기 드래프트 ID (UUID로 생성)
  createdAt: undefined, // @type {undefined} - 초기 생성 시간
  updatedAt: undefined, // @type {undefined} - 초기 수정 시간
  isTemporary: false, // @type {boolean} - 초기 임시저장 여부
};
