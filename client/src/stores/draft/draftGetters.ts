/**
 * @file draftGetters.ts
 * @description 드래프트 Zustand 스토어에서 상태를 가져오는 함수 정의
 */
import { DraftState } from './initialDraftState';

// 드래프트 상태를 가져오는 함수 정의
// @description get 함수를 사용하여 상태를 읽기 전용으로 반환
// @reason 상태 캡슐화 및 읽기 전용 접근 제공
// @analogy 도서관에서 대여 장부를 읽기 전용으로 제공
export const draftGetters = (get: () => DraftState) => ({
  getPostTitle: (): string => {
    const postTitle = get().postTitle; // @type {string} - 현재 포스트 제목
    return postTitle || ''; // @type {string} - Fallback: 빈 문자열
  },

  getPostDesc: (): string => {
    const postDesc = get().postDesc; // @type {string} - 현재 포스트 설명
    return postDesc || ''; // @type {string} - Fallback: 빈 문자열
  },

  getPostContent: (): string => {
    const postContent = get().postContent; // @type {string} - 현재 포스트 본문
    return postContent || ''; // @type {string} - Fallback: 빈 문자열
  },

  getTags: (): string[] => {
    const tags = get().tags; // @type {string[]} - 현재 태그 배열
    return tags || []; // @type {string[]} - Fallback: 빈 배열
  },

  getImageUrls: (): string[] => {
    const imageUrls = get().imageUrls; // @type {string[]} - 현재 이미지 URL 배열
    return imageUrls || []; // @type {string[]} - Fallback: 빈 배열
  },

  getCustom: (): Record<string, any> => {
    const custom = get().custom; // @type {Record<string, any>} - 현재 커스텀 데이터
    return custom || {}; // @type {Record<string, any>} - Fallback: 빈 객체
  },

  getDraftId: (): string => {
    const draftId = get().draftId; // @type {string} - 현재 드래프트 ID
    return draftId || ''; // @type {string} - Fallback: 빈 문자열
  },

  getCreatedAt: (): Date | string | undefined => {
    const createdAt = get().createdAt; // @type {Date | string | undefined} - 현재 생성 시간
    return createdAt || new Date(); // @type {Date} - Fallback: 현재 날짜
  },

  getUpdatedAt: (): Date | string | undefined => {
    const updatedAt = get().updatedAt; // @type {Date | string | undefined} - 현재 수정 시간
    return updatedAt || new Date(); // @type {Date} - Fallback: 현재 날짜
  },

  getIsTemporary: (): boolean => {
    const isTemporary = get().isTemporary; // @type {boolean} - 현재 임시저장 여부
    return isTemporary || false; // @type {boolean} - Fallback: false
  },
});
