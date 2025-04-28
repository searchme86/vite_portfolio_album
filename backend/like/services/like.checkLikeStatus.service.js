// backend/like/services/like.checkLikeStatus.service.js

import Like from '../model/like.model.js'; // 의미: Like 모델 가져오기
// 이유: 좋아요 데이터 조회에 필요
// 비유: 도서관에서 좋아요 장부(Like 모델)를 가져오기

// 의미: 특정 포스트의 좋아요 상태 조회 함수
// 이유: 유저가 포스트에 좋아요를 눌렀는지 확인
// 비유: 손님이 특정 책에 좋아요를 눌렀는지 확인
export const checkLikeStatus = async (postId, userId, sessionId) => {
  console.log('checkLikeStatus - Requested params:', {
    postId,
    userId,
    sessionId,
  }); // 의미: 요청 파라미터 디버깅
  // 이유: 요청 데이터 확인
  // 비유: 손님의 요청 정보 확인 로그

  // 의미: postId 유효성 검사
  // 이유: 유효하지 않은 postId로 쿼리 방지
  // 비유: 책이 도서관에 있는지 확인
  if (!postId) {
    console.log('checkLikeStatus - Invalid postId:', postId); // 의미: 유효성 검사 실패 디버깅
    // 이유: 에러 원인 추적
    // 비유: 잘못된 책 요청 로그
    throw new Error('Post ID is required');
  }

  // 의미: userId 또는 sessionId를 기준으로 좋아요 조회
  // 이유: 로그인 유저 또는 비로그인 유저의 좋아요 여부 확인
  // 비유: 손님이 책을 빌렸는지 확인
  const query = userId ? { userId, postId } : { sessionId, postId };
  const like = await Like.findOne(query);
  console.log('checkLikeStatus - Like found:', like); // 의미: 조회 결과 디버깅
  // 이유: 조회 결과 확인
  // 비유: 책의 대여 기록 확인 로그

  return { hasLiked: !!like }; // 의미: 좋아요 상태 반환
  // 이유: 클라이언트에 좋아요 여부 전달
  // 비유: 손님에게 책 대여 여부 알려줌
};
