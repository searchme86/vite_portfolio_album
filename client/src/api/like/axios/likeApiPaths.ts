// src/api/like/axios/likeApiPaths.js

// 의미: 좋아요 관련 API 경로를 매핑하는 객체
// 이유: 요청 경로를 중앙에서 관리하여 일관성 유지
// 비유: 도서관에서 모든 요청서 주소를 한 곳에 정리한 주소록
export const likeApiPaths = {
  checkLikeStatus: (postId) => `/like/${postId}/status`, // 의미: 좋아요 상태 조회 경로
  // 이유: 동적 postId를 포함한 경로 생성
  // 비유: 특정 책에 대한 좋아요 상태 확인 주소
  getLikeCount: (postId) => `/like/${postId}/count`, // 의미: 좋아요 수 조회 경로
  // 이유: 동적 postId를 포함한 경로 생성
  // 비유: 특정 책의 좋아요 수 확인 주소
  getLikeList: (postId) => `/like/${postId}/list`, // 의미: 좋아요 목록 조회 경로
  // 이유: 동적 postId를 포함한 경로 생성
  // 비유: 특정 책에 좋아요를 누른 손님 목록 확인 주소
  toggleLikeForGuest: () => `/like/guest`, // 의미: 비로그인 유저의 좋아요 토글 경로 <!---여기수정
  // 이유: postId는 요청 본문으로 처리, 동적 파라미터 불필요
  // 비유: 임시 손님의 좋아요 요청 주소
  toggleLikeForUser: () => `/like/user`, // 의미: 로그인 유저의 좋아요 토글 경로
  // 이유: postId는 요청 본문으로 전달
  // 비유: 회원 손님의 좋아요 요청 주소
  getPopularPosts: () => `/like/popular`, // 의미: 인기 포스트 조회 경로
  // 이유: 페이지네이션 파라미터는 쿼리로 처리
  // 비유: 인기 책 목록 확인 주소
  //====여기부터 수정됨====
  getUserLikes: () => `/like/user`, // @type {Function} - 사용자별 좋아요 상태 조회 경로
  // @description 사용자별 좋아요 상태와 카운트 조회
  // @reason 사용자별 데이터 동기화
  // @analogy 도서관에서 손님별 대여 상태와 횟수 확인 주소
  //====여기까지 수정됨====
};
