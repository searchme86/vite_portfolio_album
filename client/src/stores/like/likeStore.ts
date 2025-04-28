/**
 * @file likeStore.js
 * @description Zustand를 사용한 좋아요 상태 관리 스토어
 * @reason 좋아요 상태와 카운트를 중앙에서 관리
 * @analogy 도서관에서 대여 장부를 관리하는 시스템
 */
import { create } from 'zustand'; // @type {Function} - Zustand 스토어 생성 함수
// @description Zustand의 create 함수 가져오기
// @reason 스토어 생성 및 상태 관리
// @analogy 도서관에서 장부 시스템 초기화

import { persist, createJSONStorage } from 'zustand/middleware'; // @type {Function} - Zustand 퍼시스트 미들웨어
// @description 상태를 로컬 스토리지에 저장
// @reason 리프레시 후 상태 복원
// @analogy 도서관에서 장부를 저장소에 백업

import { likeSetters } from './likeSetters'; // @type {Object} - 좋아요 관련 상태 변경 함수
// @description 상태 변경 로직 가져오기
// @reason 좋아요 상태와 카운트 변경 로직 분리
// @analogy 도서관에서 장부 업데이트 도구 가져오기

const useLikeStore = create(
  persist(
    (set, get) => ({
      likeStatuses: {}, // @type {Object} - 포스트별 좋아요 상태 (true/false)
      // @description 포스트별 좋아요 상태 저장
      // @reason UI에서 좋아요 상태 표시
      // @analogy 도서관에서 책별 대여 여부 기록
      likeCounts: {}, // @type {Object} - 포스트별 좋아요 카운트
      // @description 포스트별 좋아요 수 저장
      // @reason UI에서 좋아요 수 표시
      // @analogy 도서관에서 책별 대여 횟수 기록
      originalLikeCounts: {}, // @type {Object} - 서버에서 받은 원래 좋아요 카운트
      // @description 서버에서 받은 초기 좋아요 수 저장
      // @reason 좋아요 취소 시 원래 값으로 복원
      // @analogy 도서관에서 서버의 원래 대여 횟수 백업

      getLikeStatuses: () => {
        const statuses = get().likeStatuses; // @type {Object} - 현재 좋아요 상태
        // @description 현재 좋아요 상태 가져오기
        // @reason 컴포넌트에서 상태 조회
        // @analogy 도서관에서 대여 상태 조회
        return statuses;
      },

      getLikeCounts: () => {
        const counts = get().likeCounts; // @type {Object} - 현재 좋아요 카운트
        // @description 현재 좋아요 카운트 가져오기
        // @reason 컴포넌트에서 카운트 조회
        // @analogy 도서관에서 대여 횟수 조회
        return counts;
      },

      getOriginalLikeCounts: () => {
        const originalCounts = get().originalLikeCounts; // @type {Object} - 원래 좋아요 카운트
        // @description 서버에서 받은 원래 좋아요 카운트 가져오기
        // @reason 좋아요 취소 시 원래 값 참조
        // @analogy 도서관에서 백업된 대여 횟수 조회
        return originalCounts;
      },

      ...likeSetters(set, get), // @description 상태 변경 함수 병합
      // @reason 상태 변경 로직 통합
      // @analogy 도서관에서 장부 업데이트 도구 연결
    }),
    {
      name: 'like-storage', // @type {String} - 로컬 스토리지 키 이름
      // @description 상태를 저장할 키 이름
      // @reason 로컬 스토리지에 상태 저장
      // @analogy 도서관에서 장부를 저장할 파일 이름
      storage: createJSONStorage(() => localStorage), // @type {Function} - 스토리지 설정
      // @description 로컬 스토리지를 사용
      // @reason 리프레시 후 상태 복원
      // @analogy 도서관에서 장부를 로컬 저장소에 저장
    }
  )
);

export default useLikeStore;
