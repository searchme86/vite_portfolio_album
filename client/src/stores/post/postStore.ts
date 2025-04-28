import { create } from 'zustand'; // @type {Function} - Zustand 스토어 생성 라이브러리
// @description Zustand 스토어 생성
// @reason 상태 관리 스토어 생성
// @analogy 도서관에서 장부를 관리할 시스템 생성

import { persist, createJSONStorage } from 'zustand/middleware'; // @type {Function} - Zustand 미들웨어
// @description Zustand 미들웨어 가져오기
// @reason 상태를 localStorage에 저장하여 브라우저 리프레쉬 시 유지
// @analogy 도서관에서 장부를 저장소에 보관하여 다시 열어도 유지

import { initialPostState } from './initialPostState'; // @type {Object} - 초기 상태
// @description 초기 상태 가져오기
// @reason 스토어의 초기값 설정
// @analogy 도서관에서 빈 장부 가져오기

import { postGetters } from './postGetters'; // @type {Function} - 상태 가져오기 함수
// @description 상태 가져오기 함수 가져오기
// @reason 상태를 읽기 전용으로 제공
// @analogy 도서관에서 장부 읽기 도구 가져오기

import { postSetters } from './postSetters'; // @type {Function} - 상태 설정 함수
// @description 상태 설정 함수 가져오기
// @reason 상태 업데이트 로직 분리
// @analogy 도서관에서 장부 업데이트 도구 가져오기

/**
 * @file postStore.js
 * @description Zustand 스토어 생성
 * @reason 상태 관리와 localStorage 저장 통합
 * @analogy 도서관에서 장부를 관리하고 저장소에 보관하는 시스템 생성
 */
export const usePostStore = create(
  persist(
    (set, get) => ({
      ...initialPostState, // @description 초기 상태 설정
      // @reason 스토어의 기본값 정의
      // @analogy 도서관에서 빈 장부로 시작

      ...postGetters(get), // @description 상태 가져오기 함수 추가
      // @reason 상태를 읽기 전용으로 제공
      // @analogy 도서관에서 장부 읽기 기능 추가

      ...postSetters(set), // @description 상태 설정 함수 추가
      // @reason 상태 업데이트 로직 제공
      // @analogy 도서관에서 장부 업데이트 기능 추가
    }),
    {
      name: 'post-store', // @type {string} - localStorage에 저장할 키 이름
      // @description localStorage에 저장할 키 이름
      // @reason 상태를 식별하기 위해
      // @analogy 도서관에서 장부를 저장할 서랍 이름
      storage: createJSONStorage(() => localStorage), // @type {Function} - localStorage를 스토리지로 사용
      // @description localStorage를 스토리지로 사용
      // @reason 브라우저 리프레쉬 시 상태 유지
      // @analogy 도서관에서 장부를 영구 저장소에 보관
    }
  )
);
