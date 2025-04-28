/**
 * @file likeGetters.js
 * @description 좋아요 Zustand 스토어에서 상태를 가져오는 함수 정의
 * @reason 상태를 읽기 전용으로 제공하여 캡슐화
 * @analogy 도서관에서 대여 장부를 읽기 전용으로 제공
 * @param {Function} get - Zustand의 get 함수
 * @returns {Object} - 상태를 가져오는 함수들
 */
export const likeGetters = (get) => ({
  // getLikeStatuses: 좋아요 상태 반환
  // @type {() => { [entityId: string]: boolean }}
  // @description 좋아요 상태를 반환
  // @reason 엔티티별 좋아요 상태 표시
  // @analogy 도서관에서 책별 대여 상태 확인
  getLikeStatuses: () => get().likeStatuses,

  // getLikeCounts: 좋아요 수 반환
  // @type {() => { [entityId: string]: number }}
  // @description 좋아요 수를 반환
  // @reason 엔티티별 좋아요 수 표시
  // @analogy 도서관에서 책별 대여 횟수 확인
  getLikeCounts: () => get().likeCounts,
});
