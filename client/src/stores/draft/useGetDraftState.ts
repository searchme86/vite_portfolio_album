/**
 * @file useGetDraftState.ts
 * @description Zustand 스토어에서 전체 드래프트 데이터를 가져오는 커스텀 훅
 * @reason 재렌더링 최적화를 위해 createSelectors 사용, 단일 책임 원칙 준수
 * @analogy 도서관에서 모든 책 정보를 빠르게 가져오는 사서
 */

import useDraftStore from './draftStore'; // @type {Function} - Zustand 스토어 훅
// @description 드래프트 스토어 훅 가져오기
// @reason 스토어 데이터 접근

import type { DraftState } from './initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장

// createSelectors와 호환되는 타입 정의
interface DraftSelectorState {
  postTitle: () => string;
  postDesc: () => string;
  postContent: () => string;
  tags: () => string[];
  imageUrls: () => string[];
  custom: () => Record<string, any>;
  draftId: () => string | null;
  createdAt: () => Date | null;
  updatedAt: () => Date | null;
  isTemporary: () => boolean;
  updateDraft: (newState: Partial<DraftState>) => void;
  resetDraft: () => void;
  getPostTitle: () => () => string;
  getPostDesc: () => () => string;
  getPostContent: () => () => string;
  getTags: () => () => string[];
  getImageUrls: () => () => string[];
  getCustom: () => () => Record<string, any>;
  getDraftId: () => () => string | null;
  getCreatedAt: () => () => Date | null;
  getUpdatedAt: () => () => Date | null;
  getIsTemporary: () => () => boolean;
}

// 커스텀 훅 정의
// @description Zustand 스토어에서 전체 드래프트 데이터를 가져옴
// @reason createSelectors로 재렌더링 최적화 및 전체 데이터 접근
const useGetDraftState = (): DraftSelectorState => {
  // useDraftStore.use 셀렉터로 전체 상태를 개별적으로 구독
  const {
    postTitle,
    postDesc,
    postContent,
    tags,
    imageUrls,
    custom,
    draftId,
    createdAt,
    updatedAt,
    isTemporary,
    updateDraft,
    resetDraft,
    getPostTitle,
    getPostDesc,
    getPostContent,
    getTags,
    getImageUrls,
    getCustom,
    getDraftId,
    getCreatedAt,
    getUpdatedAt,
    getIsTemporary,
  } = useDraftStore.use;

  // 구독한 상태와 함수를 객체로 반환
  return {
    postTitle,
    postDesc,
    postContent,
    tags,
    imageUrls,
    custom,
    draftId,
    createdAt,
    updatedAt,
    isTemporary,
    updateDraft,
    resetDraft,
    getPostTitle,
    getPostDesc,
    getPostContent,
    getTags,
    getImageUrls,
    getCustom,
    getDraftId,
    getCreatedAt,
    getUpdatedAt,
    getIsTemporary,
  };
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 드래프트 데이터 선택 가능
export default useGetDraftState;

// **작동 매커니즘**
// 1. `DraftState` 타입 가져오기: `initialDraftState.ts`에서 타입 정의 사용.
// 2. `DraftSelectorState` 타입 정의: createSelectors와 호환되는 타입으로 상태와 함수 정의.
// 3. `useDraftStore.use` 셀렉터로 상태 구독: 각 상태를 개별적으로 구독하여 재렌더링 최적화.
// 4. 객체로 반환: 구독한 상태와 함수를 객체로 반환 (함수 호출 없이 반환).
// 5. `export default`로 훅 내보내기: 컴포넌트에서 사용 가능.
// @reason 드래프트 데이터를 전체적으로 가져오되, createSelectors로 재렌더링 최적화.
