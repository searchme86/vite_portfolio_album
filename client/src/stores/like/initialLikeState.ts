/**
 * @file initialLikeState.js
 * @description 좋아요 Zustand 스토어의 초기 상태 정의
 * @reason 상태의 기본값을 설정하여 스토어 초기화
 * @analogy 도서관에서 대여 상태를 관리하기 위해 빈 장부를 준비
 */
export const initialLikeState = {
  // likeStatuses: 엔티티별 좋아요 상태
  // @type {{ [entityId: string]: boolean }}
  // @description 각 엔티티의 좋아요 상태 (예: { "post_123": true })
  // @reason 사용자가 좋아요를 눌렀는지 여부 관리
  // @analogy 도서관에서 책별 대여 상태 관리
  likeStatuses: {},

  // likeCounts: 엔티티별 좋아요 수
  // @type {{ [entityId: string]: number }}
  // @description 각 엔티티의 좋아요 수 (예: { "post_123": 10 })
  // @reason 엔티티별 좋아요 수 관리
  // @analogy 도서관에서 책별 대여 횟수 관리
  likeCounts: {},
};
