/**
 * @file draftGetters.ts
 * @description 드래프트 Zustand 스토어에서 상태를 가져오는 함수 정의
 */

import { DraftStateType } from './initialDraftState';

// 드래프트 상태를 가져오는 함수 정의
// @description get 함수를 사용하여 상태를 읽기 전용으로 반환
// @reason 상태 캡슐화 및 읽기 전용 접근 제공
// @analogy 도서관에서 대여 장부를 읽기 전용으로 제공
export const draftGetters = (get: () => DraftStateType) => ({
  // getPostTitle: 포스트 제목 반환
  // @type {() => string}
  // @description 포스트 제목을 반환
  // @reason 컴포넌트에서 제목 표시
  // @analogy 도서관에서 책 제목 확인
  getPostTitle: (): string => {
    const postTitle = get().postTitle; // @type {string} - 현재 포스트 제목
    // @description 현재 포스트 제목 가져오기
    // @reason 컴포넌트에서 제목 조회
    return postTitle || ''; // @type {string} - Fallback: 빈 문자열
    // @description 값이 없으면 빈 문자열 반환
    // @reason 애플리케이션 충돌 방지
  },

  // getPostDesc: 포스트 설명 반환
  // @type {() => string}
  // @description 포스트 설명을 반환
  // @reason 컴포넌트에서 설명 표시
  // @analogy 도서관에서 책 설명 확인
  getPostDesc: (): string => {
    const postDesc = get().postDesc; // @type {string} - 현재 포스트 설명
    // @description 현재 포스트 설명 가져오기
    // @reason 컴포넌트에서 설명 조회
    return postDesc || ''; // @type {string} - Fallback: 빈 문자열
    // @description 값이 없으면 빈 문자열 반환
    // @reason 애플리케이션 충돌 방지
  },

  // getPostContent: 포스트 본문 반환
  // @type {() => string}
  // @description 포스트 본문을 반환
  // @reason 컴포넌트에서 본문 표시
  // @analogy 도서관에서 책 내용 확인
  getPostContent: (): string => {
    const postContent = get().postContent; // @type {string} - 현재 포스트 본문
    // @description 현재 포스트 본문 가져오기
    // @reason 컴포넌트에서 본문 조회
    return postContent || ''; // @type {string} - Fallback: 빈 문자열
    // @description 값이 없으면 빈 문자열 반환
    // @reason 애플리케이션 충돌 방지
  },

  // getTags: 태그 배열 반환
  // @type {() => string[]}
  // @description 태그 배열을 반환
  // @reason 컴포넌트에서 태그 표시
  // @analogy 도서관에서 책 태그 확인
  getTags: (): string[] => {
    const tags = get().tags; // @type {string[]} - 현재 태그 배열
    // @description 현재 태그 배열 가져오기
    // @reason 컴포넌트에서 태그 조회
    return tags || []; // @type {string[]} - Fallback: 빈 배열
    // @description 값이 없으면 빈 배열 반환
    // @reason 애플리케이션 충돌 방지
  },

  // getImageUrls: 이미지 URL 배열 반환
  // @type {() => string[]}
  // @description 이미지 URL 배열을 반환
  // @reason 컴포넌트에서 이미지 표시
  // @analogy 도서관에서 책 이미지 확인
  getImageUrls: (): string[] => {
    const imageUrls = get().imageUrls; // @type {string[]} - 현재 이미지 URL 배열
    // @description 현재 이미지 URL 배열 가져오기
    // @reason 컴포넌트에서 이미지 조회
    return imageUrls || []; // @type {string[]} - Fallback: 빈 배열
    // @description 값이 없으면 빈 배열 반환
    // @reason 애플리케이션 충돌 방지
  },

  // getCustom: 커스텀 데이터 반환
  // @type {() => { [key: string]: any }}
  // @description 커스텀 데이터를 반환
  // @reason 컴포넌트에서 커스텀 데이터 표시
  // @analogy 도서관에서 책 커스텀 정보 확인
  getCustom: (): { [key: string]: any } => {
    const custom = get().custom; // @type {Object} - 현재 커스텀 데이터
    // @description 현재 커스텀 데이터 가져오기
    // @reason 컴포넌트에서 커스텀 데이터 조회
    return custom || {}; // @type {Object} - Fallback: 빈 객체
    // @description 값이 없으면 빈 객체 반환
    // @reason 애플리케이션 충돌 방지
  },

  // getDraftId: 드래프트 ID 반환
  // @type {() => string}
  // @description 드래프트 ID를 반환
  // @reason 컴포넌트에서 드래프트 ID 표시
  // @analogy 도서관에서 책 ID 확인
  getDraftId: (): string => {
    const draftId = get().draftId; // @type {string} - 현재 드래프트 ID
    // @description 현재 드래프트 ID 가져오기
    // @reason 컴포넌트에서 드래프트 ID 조회
    return draftId || ''; // @type {string} - Fallback: 빈 문자열
    // @description 값이 없으면 빈 문자열 반환
    // @reason 애플리케이션 충돌 방지
  },

  // getCreatedAt: 생성 시간 반환
  // @type {() => Date}
  // @description 생성 시간을 반환
  // @reason 컴포넌트에서 생성 시간 표시
  // @analogy 도서관에서 책 생성 시간 확인
  getCreatedAt: (): Date => {
    const createdAt = get().createdAt; // @type {Date} - 현재 생성 시간
    // @description 현재 생성 시간 가져오기
    // @reason 컴포넌트에서 생성 시간 조회
    return createdAt || new Date(); // @type {Date} - Fallback: 현재 날짜
    // @description 값이 없으면 현재 날짜 반환
    // @reason 애플리케이션 충돌 방지
  },

  // getUpdatedAt: 수정 시간 반환
  // @type {() => Date}
  // @description 수정 시간을 반환
  // @reason 컴포넌트에서 수정 시간 표시
  // @analogy 도서관에서 책 수정 시간 확인
  getUpdatedAt: (): Date => {
    const updatedAt = get().updatedAt; // @type {Date} - 현재 수정 시간
    // @description 현재 수정 시간 가져오기
    // @reason 컴포넌트에서 수정 시간 조회
    return updatedAt || new Date(); // @type {Date} - Fallback: 현재 날짜
    // @description 값이 없으면 현재 날짜 반환
    // @reason 애플리케이션 충돌 방지
  },

  // getIsTemporary: 임시저장 여부 반환
  // @type {() => boolean}
  // @description 임시저장 여부를 반환
  // @reason 컴포넌트에서 임시저장 상태 표시
  // @analogy 도서관에서 책 임시 대여 여부 확인
  getIsTemporary: (): boolean => {
    const isTemporary = get().isTemporary; // @type {boolean} - 현재 임시저장 여부
    // @description 현재 임시저장 여부 가져오기
    // @reason 컴포넌트에서 임시저장 여부 조회
    return isTemporary || false; // @type {boolean} - Fallback: false
    // @description 값이 없으면 false 반환
    // @reason 애플리케이션 충돌 방지
  },
});

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: Zustand 스토어의 상태 구조 명시.
// 2. `draftGetters` 함수 정의: `get` 함수를 사용하여 상태를 읽기 전용으로 반환.
// 3. 각 getter 함수 구현: 상태 필드별로 접근 함수 제공 (getPostTitle, getDraftId 등).
// 4. Fallback 처리: 각 필드에 기본값 제공으로 데이터 없음 시 애플리케이션 충돌 방지.
// 5. `export`로 내보내기: `draftStore.ts`에서 사용 가능.
// @reason 드래프트 상태를 읽기 전용으로 제공하여 캡슐화 및 재사용성 향상.
// @analogy 도서관에서 대여 장부를 읽기 전용으로 제공.
