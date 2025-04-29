/**
 * @file draftStore.ts
 * @description Zustand 스토어를 생성하고 초기 상태, Getter, Setter를 통합하는 파일
 * @reason 상태 관리 로직을 중앙에서 관리하여 일관성 유지
 * @analogy 도서관에서 대여 기록부를 중앙 관리하는 시스템 구축
 */

import { create } from 'zustand'; // @type {Function} - Zustand 스토어 생성 함수
// @description Zustand 라이브러리에서 스토어 생성 함수 가져오기
// @reason 상태 관리 스토어 생성
// @analogy 도서관에서 중앙 관리 시스템 준비

import initialDraftState from './initialDraftState'; // @type {Object} - 초기 상태
// @description 초기 상태 가져오기
// @reason 스토어 초기화 시 기본값 설정
// @analogy 도서관에서 초기화된 대여 기록부 가져오기

import createDraftGetters from './draftGetters'; // @type {Function} - Getter 함수 생성
// @description Getter 함수 가져오기
// @reason 상태 접근 로직 통합
// @analogy 도서관에서 대여 기록 조회 창구 가져오기

import createDraftSetters from './draftSetters'; // @type {Function} - Setter 함수 생성
// @description Setter 함수 가져오기
// @reason 상태 업데이트 로직 통합
// @analogy 도서관에서 대여 기록 업데이트 창구 가져오기

// 드래프트 상태 타입 정의 (initialDraftState.ts와 동일)
// @type {Object} - 드래프트 데이터의 구조
// @description 드래프트 데이터의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
// @analogy 도서관에서 대여 기록부의 형식을 미리 정의

import { DraftState } from './initialDraftState'; // @type {Object} - 드래프트 상태 타입

// 스토어 타입 정의
// @type {Object} - 스토어의 구조 (상태 + Getter + Setter)
// @description 스토어의 전체 타입을 정의
// @reason TypeScript에서 스토어의 타입 안정성 보장
// @analogy 도서관에서 중앙 관리 시스템의 구조 정의
type DraftStore = DraftState &
  ReturnType<typeof createDraftGetters> &
  ReturnType<typeof createDraftSetters>;

// Zustand 스토어 생성
// @description 초기 상태, Getter, Setter를 통합하여 스토어 생성
// @reason 상태 관리 로직을 중앙에서 관리
// @analogy 도서관에서 중앙 관리 시스템 구축
const useDraftStore = create<DraftStore>((set, get) => {
  const initialState = initialDraftState || {}; // @type {DraftState} - Fallback: 빈 객체
  // @description 초기 상태 가져오기, 없으면 빈 객체
  // @reason 초기 상태가 없으면 애플리케이션 충돌 방지

  const getters = createDraftGetters(initialState); // @type {Object} - Getter 함수
  // @description Getter 함수 생성
  // @reason 상태 접근 로직 통합

  const setters = createDraftSetters(set); // @type {Object} - Setter 함수
  // @description Setter 함수 생성
  // @reason 상태 업데이트 로직 통합

  console.log('DraftStore initialized:', initialState); // @description 디버깅용 로그
  // @description 스토어 초기화 상태 출력
  // @reason 초기화 상태 확인

  return {
    ...initialState, // 초기 상태
    ...getters, // Getter 함수
    ...setters, // Setter 함수
  };
});

// 스토어 내보내기
// @description 스토어를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 상태 관리 가능
// @analogy 도서관에서 중앙 관리 시스템을 공유
export default useDraftStore;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `DraftStore` 타입 정의: 상태, Getter, Setter 통합 타입 명시.
// 3. `initialDraftState` 가져오기: 초기 상태 설정.
// 4. `createDraftGetters` 호출: Getter 함수 생성.
// 5. `createDraftSetters` 호출: Setter 함수 생성.
// 6. `create` 함수로 Zustand 스토어 생성: 초기 상태, Getter, Setter 통합.
// 7. `console.log`로 디버깅 가능하도록 출력.
// 8. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 9. 컴포넌트에서 `useDraftStore`를 사용하여 상태 관리.
// @reason 상태 관리 로직을 중앙에서 관리하여 일관성 유지.
// @analogy 도서관에서 중앙 관리 시스템을 통해 대여 기록 관리.
