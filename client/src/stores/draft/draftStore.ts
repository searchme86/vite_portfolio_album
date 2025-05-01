/**
 * @file draftStore.ts
 * @description Zustand를 사용한 드래프트 상태 관리 스토어
 */
import { create } from 'zustand'; // @type {Function} - Zustand 스토어 생성 함수
// @description Zustand의 create 함수 가져오기
// @reason 스토어 생성 및 상태 관리
// @analogy 도서관에서 장부 시스템 초기화

import { persist, createJSONStorage } from 'zustand/middleware'; // @type {Function} - Zustand 퍼시스트 미들웨어
// @description 상태를 로컬 스토리지에 저장
// @reason 리프레시 후 상태 복원
// @analogy 도서관에서 장부를 저장소에 백업

import { draftSetters } from './draftSetters'; // @type {Object} - 드래프트 상태 변경 함수
import { draftGetters } from './draftGetters'; // @type {Object} - 드래프트 상태 조회 함수
import type { DraftState } from './initialDraftState';

// Zustand 스토어 타입 정의
export type DraftStore = DraftState & {
  updateDraft: (draft: Partial<DraftState>) => void; // @type {Function} - 드래프트 업데이트 메서드
  resetDraft: () => void; // @type {Function} - 드래프트 초기화 메서드
  getPostTitle: () => string; // @type {Function} - 포스트 제목 반환 메서드
  getPostDesc: () => string; // @type {Function} - 포스트 설명 반환 메서드
  getPostContent: () => string; // @type {Function} - 포스트 본문 반환 메서드
  getTags: () => string[]; // @type {Function} - 태그 배열 반환 메서드
  getImageUrls: () => string[]; // @type {Function} - 이미지 URL 배열 반환 메서드
  getCustom: () => Record<string, any>; // @type {Function} - 커스텀 데이터 반환 메서드
  getDraftId: () => string; // @type {Function} - 드래프트 ID 반환 메서드
  getCreatedAt: () => Date | string | undefined; // @type {Function} - 생성 시간 반환 메서드
  getUpdatedAt: () => Date | string | undefined; // @type {Function} - 수정 시간 반환 메서드
  getIsTemporary: () => boolean; // @type {Function} - 임시저장 여부 반환 메서드
};

// Zustand 스토어 생성
const useDraftStore = create<DraftStore>()(
  persist(
    (set, get) => ({
      postTitle: '', // @type {string} - 초기 제목
      postDesc: '', // @type {string} - 초기 설명
      postContent: '', // @type {string} - 초기 본문
      tags: [], // @type {string[]} - 초기 태그 배열
      imageUrls: [], // @type {string[]} - 초기 이미지 URL 배열
      custom: {}, // @type {Record<string, any>} - 초기 커스텀 데이터
      draftId: '', // @type {string} - 초기 드래프트 ID
      createdAt: new Date(), // @type {Date} - 초기 생성 시간
      updatedAt: new Date(), // @type {Date} - 초기 수정 시간
      isTemporary: false, // @type {boolean} - 초기 임시저장 여부
      ...draftGetters(get), // @description 상태 조회 함수 병합
      ...draftSetters(set, get), // @description 상태 변경 함수 병합
    }),
    {
      name: 'draft-storage', // @type {string} - 로컬 스토리지 키 이름
      storage: createJSONStorage(() => localStorage), // @type {Function} - 스토리지 설정
    }
  )
);

// 스토어 내보내기
export default useDraftStore;

// **작동 매커니즘**
// 1. `DraftStore` 타입 정의: 스토어의 상태와 메서드 구조 명시.
// 2. `create`와 `persist`로 스토어 생성: 초기 상태와 퍼시스트 미들웨어 설정.
// 3. `draftGetters`와 `draftSetters` 병합: 상태 조회 및 변경 함수 통합.
// 4. `export default`로 스토어 내보내기: 컴포넌트에서 사용 가능.
// @reason 드래프트 상태를 중앙에서 관리하고 메서드에 직접 접근 가능.
