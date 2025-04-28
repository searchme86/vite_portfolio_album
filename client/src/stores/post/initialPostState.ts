/**
 * @file initialPostState.js
 * @description Zustand 스토어의 초기 상태 정의
 * @reason 상태의 기본값을 설정하여 스토어 초기화
 * @analogy 도서관에서 책 목록을 관리하기 위해 빈 장부를 준비
 */
export const initialPostState = {
  // token: 사용자 인증 토큰
  // @type {string | null}
  // @description API 요청 시 사용할 사용자 인증 토큰
  // @reason 백엔드 인증에 필요
  // @analogy 도서관에서 창고 문을 여는 인증 키
  token: null,

  // postsData: 포스트 데이터와 페이지 정보
  // @type {{ pages: Array<Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>>, pageParams: Array<number> }}
  // @description 포스트 데이터와 페이지네이션 정보
  // @reason 포스트 목록과 페이지 상태 관리
  // @analogy 도서관에서 책 목록과 페이지 정보 관리
  postsData: { pages: [], pageParams: [] },

  // <!---여기수정
  // likeStatuses와 likeCounts는 useLikeStore로 이동
  // @reason 좋아요 상태를 별도의 스토어로 분리하여 단일 책임 원칙 준수
  // @analogy 도서관에서 대여 상태를 별도의 장부로 분리
};
