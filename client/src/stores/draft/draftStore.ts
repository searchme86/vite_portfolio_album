/**
 * @file draftStore.ts
 * @description 드래프트 데이터를 관리하는 Zustand 스토어
 * @location src/stores/draft/draftStore.ts
 */
import { create } from 'zustand'; // @type {Function} - Zustand 스토어 생성 함수
// @description Zustand로 스토어 생성
// @reason 상태 관리
// @why Zustand로 중앙 상태 관리
// @mechanism
// 1. `create` 호출로 스토어 생성.
// 2. 상태와 메서드 정의.
// @analogy 도서관에서 책 데이터를 저장하는 저장소

// 드래프트 데이터 인터페이스 정의
interface DraftStore {
  postTitle: string; // @type {string} - 드래프트 제목
  postDesc: string; // @type {string} - 드래프트 설명
  postContent: string; // @type {string} - 드래프트 본문
  tags: string[]; // @type {string[]} - 드래프트 태그
  imageUrls: string[]; // @type {string[]} - 드래프트 이미지 URL
  custom: Record<string, any>; // @type {Record<string, any>} - 커스텀 데이터
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: Date; // @type {Date} - 생성 시간 (수정됨)
  updatedAt: Date; // @type {Date} - 수정 시간 (수정됨)
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
  setDraftData: (data: Partial<DraftStore>) => void; // @type {Function} - 드래프트 데이터 설정 함수
}

// 스토어 생성
const useDraftStore = create<DraftStore>((set) => ({
  postTitle: '', // @type {string} - 초기 제목
  // @description 초기값으로 빈 문자열 설정
  // @reason 초기화
  postDesc: '', // @type {string} - 초기 설명
  // @description 초기값으로 빈 문자열 설정
  // @reason 초기화
  postContent: '', // @type {string} - 초기 본문
  // @description 초기값으로 빈 문자열 설정
  // @reason 초기화
  tags: [], // @type {string[]} - 초기 태그
  // @description 초기값으로 빈 배열 설정
  // @reason 초기화
  imageUrls: [], // @type {string[]} - 초기 이미지 URL
  // @description 초기값으로 빈 배열 설정
  // @reason 초기화
  custom: {}, // @type {Record<string, any>} - 초기 커스텀 데이터
  // @description 초기값으로 빈 객체 설정
  // @reason 초기화
  draftId: '', // @type {string} - 초기 드래프트 ID
  // @description 초기값으로 빈 문자열 설정
  // @reason 초기화
  createdAt: new Date(), // @type {Date} - 초기 생성 시간
  // @description 초기값으로 현재 시간 설정
  // @reason 초기화
  updatedAt: new Date(), // @type {Date} - 초기 수정 시간
  // @description 초기값으로 현재 시간 설정
  // @reason 초기화
  isTemporary: false, // @type {boolean} - 초기 임시저장 여부
  // @description 초기값으로 false 설정
  // @reason 초기화
  setDraftData: (data) =>
    set((state) => ({
      ...state,
      ...data,
      createdAt: data.createdAt
        ? new Date(data.createdAt)
        : state.createdAt || new Date(), // @type {Date} - 생성 시간 보장
      // @description 생성 시간을 Date 타입으로 보장
      // @reason 타입 에러 방지 및 일관성 유지
      updatedAt: new Date(), // @type {Date} - 데이터 업데이트 시 수정 시간 갱신
      // @description 데이터 변경 시 수정 시간 갱신
      // @reason 최신 수정 시간 기록
    })), // @type {Function} - 드래프트 데이터 설정
  // @description 드래프트 데이터 업데이트
  // @reason 데이터 동기화
  // @why setDraftData로 스토어 상태 업데이트
  // @mechanism
  // 1. `set` 함수로 스토어 상태 업데이트.
  // 2. 새로운 `data`와 `createdAt`, `updatedAt` 반영.
  // @analogy 도서관에서 책 데이터를 저장소에 업데이트
}));

export default useDraftStore;

// **작동 매커니즘**
// 1. `create`로 스토어 생성: Zustand 스토어 초기화.
// 2. 초기 상태 정의: 각 속성에 초기값 설정.
// 3. `setDraftData` 함수 정의: 드래프트 데이터 업데이트 및 수정 시간 갱신.
// 4. 스토어 반환: 컴포넌트에서 사용 가능.
// @reason 드래프트 데이터를 중앙에서 관리하여 컴포넌트 간 데이터 공유
// @analogy 도서관에서 책 데이터를 중앙 저장소에서 관리
