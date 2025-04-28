/**
 * @file postGetters.js
 * @description Zustand 스토어에서 상태를 가져오는 함수 정의
 * @reason 상태를 읽기 전용으로 제공하여 캡슐화
 * @analogy 도서관에서 장부를 읽기 전용으로 제공
 * @param {Function} get - Zustand의 get 함수
 * @returns {Object} - 상태를 가져오는 함수들
 */
export const postGetters = (get) => ({
  // getToken: 사용자 인증 토큰 반환
  // @type {() => string | null}
  // @description 사용자 인증 토큰을 반환
  // @reason API 요청 시 인증 헤더에 사용
  // @analogy 도서관에서 인증 키 확인
  getToken: () => get().token,

  // getPostsData: 포스트 데이터 반환
  // @type {() => { pages: Array<Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>>, pageParams: Array<number> }}
  // @description 포스트 데이터를 반환
  // @reason 포스트 목록 렌더링에 사용
  // @analogy 도서관에서 책 목록 확인
  getPostsData: () => get().postsData,

  // <!---여기수정
  // getLikeStatuses와 getLikeCounts는 useLikeStore로 이동
  // @reason 좋아요 상태를 별도의 스토어로 분리하여 단일 책임 원칙 준수
  // @analogy 도서관에서 대여 상태 확인을 별도의 장부로 분리
});
