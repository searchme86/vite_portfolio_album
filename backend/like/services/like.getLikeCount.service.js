import mongoose from 'mongoose'; // 의미: Mongoose 라이브러리 가져오기 <!---여기추가
// 이유: ObjectId 타입 변환에 필요
// 비유: 도서관에서 책 ID를 데이터베이스 형식으로 변환하는 도구

import Like from '../model/like.model.js'; // 의미: Like 모델 가져오기
// 이유: 좋아요 데이터 조회에 필요
// 비유: 도서관에서 좋아요 장부(Like 모델)를 가져오기

// 의미: 특정 포스트의 좋아요 수 조회 함수
// 이유: 포스트별 좋아요 수 계산
// 비유: 특정 책이 얼마나 대여되었는지 확인
export const getLikeCount = async (postId) => {
  console.log('getLikeCount - Requested postId:', postId); // 의미: 요청된 postId 디버깅
  // 이유: 요청 데이터 확인
  // 비유: 손님이 확인하려는 책 정보 기록 로그

  // 의미: postId 유효성 검사
  // 이유: 유효하지 않은 postId로 쿼리 방지
  // 비유: 책이 도서관에 있는지 확인
  if (!postId) {
    console.log('getLikeCount - Invalid postId:', postId); // 의미: 유효성 검사 실패 디버깅
    // 이유: 에러 원인 추적
    // 비유: 잘못된 책 요청 로그
    throw new Error('Post ID is required');
  }

  // 여기부터 시작===
  // <!---여기추가
  // 의미: postId 타입 확인을 위한 디버깅 로그
  // 이유: postId가 문자열인지, ObjectId로 변환 가능한지 확인
  // 비유: 도서관에서 책 ID의 형식이 올바른지 확인
  console.log('getLikeCount - postId type:', typeof postId, 'value:', postId);

  // 의미: postId를 ObjectId로 변환
  // 이유: Like 모델에서 postId는 ObjectId 타입이므로 쿼리 시 변환 필요
  // 비유: 책 ID를 데이터베이스 형식으로 변환
  let convertedPostId;
  try {
    convertedPostId = new mongoose.Types.ObjectId(postId);
    console.log(
      'getLikeCount - Converted postId to ObjectId:',
      convertedPostId
    );
  } catch (error) {
    console.error(
      'getLikeCount - Failed to convert postId to ObjectId:',
      error.message
    );
    // 의미: Fallback - postId 변환 실패 시 0 반환
    // 이유: 유효하지 않은 postId로 인한 쿼리 실패 방지
    // 비유: 잘못된 책 ID로 인해 대출 횟수를 계산하지 못하면 0 반환
    return 0;
  }
  // 여기부터 끝===

  // 의미: 포스트의 좋아요 수 조회
  // 이유: MongoDB에서 조건에 맞는 좋아요 수 계산
  // 비유: 책의 대여 기록 수 계산
  // 여기부터 시작===
  // <!---여기수정
  const query = { postId: convertedPostId }; // 의미: 변환된 postId로 쿼리 조건 생성
  // 이유: ObjectId 타입으로 쿼리 실행
  // 비유: 데이터베이스 형식의 책 ID로 대출 기록 조회
  console.log('getLikeCount - Query condition:', query); // 의미: 쿼리 조건 디버깅
  // 이유: 쿼리 조건 확인
  // 비유: 대출 기록 조회 조건 확인 로그

  const likeCount = await Like.countDocuments(query);
  console.log(
    'getLikeCount - Like count for postId:',
    postId,
    'is:',
    likeCount
  ); // 의미: 조회 결과 디버깅
  // 이유: 조회 결과 확인
  // 비유: 책의 대여 횟수 확인 로그
  // 여기부터 끝===

  return likeCount; // 의미: 좋아요 수 반환
  // 이유: 컨트롤러에서 사용
  // 비유: 대여 횟수를 손님에게 알려줌
};
