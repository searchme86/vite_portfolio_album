/**
 * @file draftGetters.ts
 * @description 드래프트 데이터에 접근하는 Getter 함수를 정의하는 파일
 * @reason 데이터 접근 로직을 별도로 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록부를 조회하는 창구를 별도로 마련
 */

// 드래프트 상태 타입 정의 (initialDraftState.ts와 동일)
// @type {Object} - 드래프트 데이터의 구조
// @description 드래프트 데이터의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
// @analogy 도서관에서 대여 기록부의 형식을 미리 정의

import { DraftState } from './initialDraftState';

// Getter 함수 타입 정의
// @type {Object} - Getter 함수들의 객체
// @description Getter 함수들의 타입을 정의
// @reason Getter 함수의 반환값 타입 명시
// @analogy 도서관에서 대여 기록 조회 결과의 형식을 정의
interface DraftGetters {
  getPostTitle: () => string;
  getPostDesc: () => string;
  getPostContent: () => string;
  getTags: () => string[];
  getImageUrls: () => string[];
  getCustom: () => { [key: string]: any };
  getDraftId: () => string;
  getCreatedAt: () => Date;
  getUpdatedAt: () => Date;
  getIsTemporary: () => boolean;
  getDraft: () => DraftState;
}

// Getter 함수 생성
// @description 스토어 상태를 기반으로 Getter 함수 정의
// @reason 상태 접근 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상
// @analogy 도서관에서 대여 기록 조회 창구를 통해 기록을 확인
const createDraftGetters = (state: DraftState): DraftGetters => ({
  getPostTitle: () => {
    const postTitle = state.postTitle || ''; // @type {string} - Fallback: 빈 문자열
    // @description 포스트 제목 반환, 없으면 빈 문자열
    // @reason 데이터가 없을 경우 애플리케이션 충돌 방지
    console.log('getPostTitle:', postTitle); // @description 디버깅용 로그
    return postTitle;
  },
  getPostDesc: () => {
    const postDesc = state.postDesc || ''; // @type {string} - Fallback: 빈 문자열
    // @description 포스트 설명 반환, 없으면 빈 문자열
    // @reason 데이터가 없을 경우 애플리케이션 충돌 방지
    console.log('getPostDesc:', postDesc); // @description 디버깅용 로그
    return postDesc;
  },
  getPostContent: () => {
    const postContent = state.postContent || ''; // @type {string} - Fallback: 빈 문자열
    // @description 포스트 본문 반환, 없으면 빈 문자열
    // @reason 데이터가 없을 경우 애플리케이션 충돌 방지
    console.log('getPostContent:', postContent); // @description 디버깅용 로그
    return postContent;
  },
  getTags: () => {
    const tags = state.tags || []; // @type {string[]} - Fallback: 빈 배열
    // @description 포스트 태그 배열 반환, 없으면 빈 배열
    // @reason 데이터가 없을 경우 애플리케이션 충돌 방지
    console.log('getTags:', tags); // @description 디버깅용 로그
    return tags;
  },
  getImageUrls: () => {
    const imageUrls = state.imageUrls || []; // @type {string[]} - Fallback: 빈 배열
    // @description 이미지 URL 배열 반환, 없으면 빈 배열
    // @reason 데이터가 없을 경우 애플리케이션 충돌 방지
    console.log('getImageUrls:', imageUrls); // @description 디버깅용 로그
    return imageUrls;
  },
  getCustom: () => {
    const custom = state.custom || {}; // @type {Object} - Fallback: 빈 객체
    // @description 사용자 정의 데이터 반환, 없으면 빈 객체
    // @reason 데이터가 없을 경우 애플리케이션 충돌 방지
    console.log('getCustom:', custom); // @description 디버깅용 로그
    return custom;
  },
  getDraftId: () => {
    const draftId = state.draftId || ''; // @type {string} - Fallback: 빈 문자열
    // @description 드래프트 ID 반환, 없으면 빈 문자열
    // @reason 데이터가 없을 경우 애플리케이션 충돌 방지
    console.log('getDraftId:', draftId); // @description 디버깅용 로그
    return draftId;
  },
  getCreatedAt: () => {
    const createdAt = state.createdAt || new Date(); // @type {Date} - Fallback: 현재 시간
    // @description 생성 시간 반환, 없으면 현재 시간
    // @reason 데이터가 없을 경우 애플리케이션 충돌 방지
    console.log('getCreatedAt:', createdAt); // @description 디버깅용 로그
    return createdAt;
  },
  getUpdatedAt: () => {
    const updatedAt = state.updatedAt || new Date(); // @type {Date} - Fallback: 현재 시간
    // @description 업데이트 시간 반환, 없으면 현재 시간
    // @reason 데이터가 없을 경우 애플리케이션 충돌 방지
    console.log('getUpdatedAt:', updatedAt); // @description 디버깅용 로그
    return updatedAt;
  },
  getIsTemporary: () => {
    const isTemporary = state.isTemporary || false; // @type {boolean} - Fallback: false
    // @description 임시저장 여부 반환, 없으면 false
    // @reason 데이터가 없을 경우 애플리케이션 충돌 방지
    console.log('getIsTemporary:', isTemporary); // @description 디버깅용 로그
    return isTemporary;
  },
  getDraft: () => {
    // @description 전체 드래프트 데이터 반환
    // @reason 전체 데이터 접근 필요 시 사용
    console.log('getDraft:', state); // @description 디버깅용 로그
    return state;
  },
});

// Getter 함수 내보내기
// @description Getter 함수를 다른 파일에서 사용할 수 있도록 내보냄
// @reason Zustand 스토어에서 Getter로 사용
// @analogy 도서관에서 대여 기록 조회 창구를 공유
export default createDraftGetters;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `DraftGetters` 타입 정의: Getter 함수의 반환값 타입 명시.
// 3. `createDraftGetters` 함수가 상태(`state`)를 받아 Getter 객체 생성.
// 4. 각 Getter 함수는 상태에서 특정 속성을 반환, Fallback 값으로 충돌 방지.
// 5. `console.log`로 디버깅 가능하도록 출력.
// 6. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 7. Zustand 스토어(`draftStore.ts`)에서 이 Getter 함수를 통합하여 사용.
// @reason 데이터 접근 로직을 별도로 분리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 대여 기록 조회 창구를 통해 기록을 확인.
