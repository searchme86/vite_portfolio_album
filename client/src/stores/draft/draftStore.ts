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
// @description 상태 변경 로직 가져오기
// @reason 드래프트 상태 변경 로직 분리
// @analogy 도서관에서 장부 업데이트 도구 가져오기

import { draftGetters } from './draftGetters'; // @type {Object} - 드래프트 상태 조회 함수
// @description 상태 조회 로직 가져오기
// @reason 드래프트 상태 조회 로직 분리
// @analogy 도서관에서 장부 조회 도구 가져오기

import { createSelectors } from '../utils/useCreateSelectors';
import type { DraftState } from './initialDraftState';

// Zustand 스토어 생성 및 셀렉터로 래핑
// @description 드래프트 데이터를 관리하는 스토어
// @reason 드래프트 상태를 중앙에서 관리
// @analogy 도서관에서 중앙 대여 기록 시스템
const useDraftStore = createSelectors(
  create<DraftState>()(
    persist(
      (set, get) => ({
        postTitle: '', // @type {string} - 초기 제목
        // @description 초기 포스트 제목 설정
        // @reason 초기 상태 제공
        postDesc: '', // @type {string} - 초기 설명
        // @description 초기 포스트 설명 설정
        // @reason 초기 상태 제공
        postContent: '', // @type {string} - 초기 본문
        // @description 초기 포스트 본문 설정
        // @reason 초기 상태 제공
        tags: [], // @type {string[]} - 초기 태그 배열
        // @description 초기 태그 배열 설정
        // @reason 초기 상태 제공
        imageUrls: [], // @type {string[]} - 초기 이미지 URL 배열
        // @description 초기 이미지 URL 배열 설정
        // @reason 초기 상태 제공
        custom: {}, // @type {Object} - 초기 커스텀 데이터
        // @description 초기 커스텀 데이터 설정
        // @reason 초기 상태 제공
        draftId: '', // @type {string} - 초기 드래프트 ID
        // @description 초기 드래프트 ID 설정
        // @reason 초기 상태 제공
        createdAt: new Date(), // @type {Date} - 초기 생성 시간
        // @description 초기 생성 시간 설정
        // @reason 초기 상태 제공
        updatedAt: new Date(), // @type {Date} - 초기 수정 시간
        // @description 초기 수정 시간 설정
        // @reason 초기 상태 제공
        isTemporary: false, // @type {boolean} - 초기 임시저장 여부
        // @description 초기 임시저장 여부 설정
        // @reason 초기 상태 제공

        // draftGetters에서 정의된 상태 조회 함수 병합
        // @description 상태 조회 함수 추가
        // @reason 상태 읽기 전용 접근 제공
        ...draftGetters(get),

        // draftSetters에서 정의된 상태 변경 함수 병합
        // @description 상태 변경 함수 추가
        // @reason 상태 업데이트 로직 제공
        ...draftSetters(set, get),
      }),
      {
        name: 'draft-storage', // @type {string} - 로컬 스토리지 키 이름
        // @description 상태를 저장할 키 이름
        // @reason 로컬 스토리지에 상태 저장
        // @analogy 도서관에서 장부를 저장할 파일 이름
        storage: createJSONStorage(() => localStorage), // @type {Function} - 스토리지 설정
        // @description 로컬 스토리지를 사용
        // @reason 리프레시 후 상태 복원
        // @analogy 도서관에서 장부를 로컬 저장소에 저장
      }
    )
  )
);

// 스토어 내보내기
// @description 스토어를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 드래프트 상태 사용 가능
// @analogy 도서관에서 중앙 기록 시스템을 공유
export default useDraftStore;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 상태와 함수 구조 명시.
// 2. `createSelectors` 유틸리티 정의: 상태에 셀렉터를 추가하여 접근 최적화.
// 3. `create`와 `persist`로 스토어 생성: 초기 상태, `persist` 미들웨어로 로컬 스토리지 저장.
// 4. `draftGetters`와 `draftSetters` 병합: 상태 조회 및 변경 함수 통합.
// 5. `createSelectors`로 래핑: `useDraftStore.use.postTitle()` 같은 셀렉터 제공.
// 6. `export default`로 스토어 내보내기: 컴포넌트에서 사용 가능.
// @reason 드래프트 상태를 중앙에서 관리하고 셀렉터로 최적화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 중앙 대여 기록 시스템.
