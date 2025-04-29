/**
 * @file draftStore.ts
 * @description 드래프트 데이터를 관리하는 Zustand 스토어
 * @reason 드래프트 상태를 중앙에서 관리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록을 중앙에서 관리하는 시스템
 */

import { create } from 'zustand'; // @type {Function} - Zustand 라이브러리
import type { DraftState } from './initialDraftState'; // @type {Object} - 드래프트 상태 타입

// Zustand 스토어 생성
// @description 드래프트 데이터를 관리하는 스토어
// @reason 드래프트 상태를 중앙에서 관리
// @analogy 도서관에서 중앙 대여 기록 시스템
const useDraftStore = create<DraftState>((set) => ({
  postTitle: '', // @type {string} - 초기 제목
  postDesc: '', // @type {string} - 초기 설명
  postContent: '', // @type {string} - 초기 본문
  tags: [], // @type {string[]} - 초기 태그 배열
  imageUrls: [], // @type {string[]} - 초기 이미지 URL 배열
  custom: {}, // @type {Object} - 초기 커스텀 데이터
  draftId: '', // @type {string} - 초기 드래프트 ID
  createdAt: new Date(), // @type {Date} - 초기 생성 시간
  updatedAt: new Date(), // @type {Date} - 초기 수정 시간
  isTemporary: false, // @type {boolean} - 초기 임시저장 여부
  updateDraft: (draft: DraftState) => set((state) => ({ ...state, ...draft })), // @description 드래프트 데이터 업데이트
  // @reason 새로운 드래프트 데이터로 상태 갱신
  // @analogy 도서관에서 대여 기록을 새로운 정보로 갱신
}));

// 스토어 내보내기
// @description 스토어를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 드래프트 상태 사용 가능
// @analogy 도서관에서 중앙 기록 시스템을 공유
export default useDraftStore;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터와 `updateDraft` 함수 구조 명시.
// 2. `create`로 Zustand 스토어 생성: 초기 상태와 `updateDraft` 함수 정의.
// 3. `updateDraft` 함수 구현: 새로운 드래프트 데이터로 상태 갱신.
// 4. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 5. 컴포넌트에서 `useDraftStore`를 사용하여 드래프트 상태 관리 및 업데이트.
// @reason 드래프트 상태를 중앙에서 관리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 중앙 대여 기록 시스템.
