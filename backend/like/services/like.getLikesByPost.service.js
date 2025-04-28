// backend/like/services/like.getLikesByPost.service.js

import Like from '../model/like.model.js'; // 의미: Like 모델 가져오기
// 이유: 좋아요 데이터 조회에 필요
// 비유: 도서관에서 좋아요 장부(Like 모델)를 가져오기

import User from '../../models/user.model.js'; // 의미: User 모델 가져오기
// 이유: 좋아요를 누른 사용자 정보 조회
// 비유: 도서관에서 손님(유저) 정보 확인

// 의미: 특정 포스트의 좋아요 목록 조회 함수
// 이유: 포스트별 좋아요 목록 반환
// 비유: 특정 책을 대여한 손님 목록 확인
export const getLikesByPost = async (postId, page = 1, limit = 10) => {
  console.log(
    'getLikesByPost - Requested postId:',
    postId,
    'page:',
    page,
    'limit:',
    limit
  ); // 의미: 요청 파라미터 디버깅
  // 이유: 요청 데이터 확인
  // 비유: 손님이 확인하려는 책과 페이지 정보 기록 로그

  // 의미: postId 유효성 검사
  // 이유: 유효하지 않은 postId로 쿼리 방지
  // 비유: 책이 도서관에 있는지 확인
  if (!postId) {
    console.log('getLikesByPost - Invalid postId:', postId); // 의미: 유효성 검사 실패 디버깅
    // 이유: 에러 원인 추적
    // 비유: 잘못된 책 요청 로그
    throw new Error('Post ID is required');
  }

  // 의미: 페이지와 제한 값 검증
  // 이유: 페이지네이션 오류 방지
  // 비유: 손님이 요청한 페이지와 목록 수 확인
  const validatedPage = Math.max(1, page); // 최소 1 페이지
  const validatedLimit = Math.max(1, limit); // 최소 1개 항목
  console.log(
    'getLikesByPost - Validated page:',
    validatedPage,
    'limit:',
    validatedLimit
  ); // 의미: 검증된 값 디버깅
  // 이유: 검증 결과 확인
  // 비유: 페이지와 목록 수 조정 로그

  // 의미: 포스트의 좋아요 목록 조회
  // 이유: MongoDB에서 조건에 맞는 좋아요 목록 조회
  // 비유: 책의 대여 기록 목록 조회
  const likes = await Like.find({ postId })
    .populate('userId', 'username email clerkUserId') // 의미: 사용자 정보 포함
    // 이유: 좋아요를 누른 유저 정보 조회
    // 비유: 대여한 손님의 정보 확인
    .sort({ createdAt: -1 }) // 의미: 최신순 정렬
    // 이유: 최근 좋아요부터 표시
    // 비유: 최근 대여 기록부터 보기
    .limit(validatedLimit) // 의미: 페이지당 항목 수 제한
    // 이유: 페이지네이션 적용
    // 비유: 한 페이지에 보여줄 대여 기록 수 제한
    .skip((validatedPage - 1) * validatedLimit); // 의미: 페이지에 맞는 항목 건너뛰기
  // 이유: 페이지네이션 적용
  // 비유: 이전 페이지의 대여 기록 건너뛰기

  console.log('getLikesByPost - Fetched likes:', likes); // 의미: 조회된 좋아요 목록 디버깅
  // 이유: 조회 결과 확인
  // 비유: 대여 기록 목록 확인 로그

  // 의미: 총 좋아요 수 계산
  // 이유: 페이지네이션 정보 제공
  // 비유: 전체 대여 기록 수 계산
  const totalLikes = await Like.countDocuments({ postId });
  console.log('getLikesByPost - Total likes:', totalLikes); // 의미: 총 좋아요 수 디버깅
  // 이유: 총 개수 확인
  // 비유: 전체 대여 횟수 확인 로그

  // 의미: 더 많은 좋아요가 있는지 확인
  // 이유: 클라이언트에 페이지네이션 정보 제공
  // 비유: 더 볼 대여 기록이 있는지 확인
  const hasMore = validatedPage * validatedLimit < totalLikes;
  console.log('getLikesByPost - Has more:', hasMore); // 의미: 더보기 여부 디버깅
  // 이유: 페이지네이션 상태 확인
  // 비유: 더보기 여부 확인 로그

  return { likes, totalLikes, hasMore }; // 의미: 조회 결과 반환
  // 이유: 컨트롤러에서 사용
  // 비유: 대여 기록과 페이지 정보를 손님에게 알려줌
};
