/**
 * @file like.toggleLike.service.js
 * @description 포스트에 대한 좋아요를 토글하는 서버 핸들러
 * @reason 좋아요 상태와 카운트를 서버에서 관리
 * @analogy 도서관에서 책 대여 요청을 처리하는 시스템
 */
import mongoose from 'mongoose'; // @type {Object} - Mongoose 라이브러리
// @description Mongoose 가져오기
// @reason 데이터베이스 작업
// @analogy 도서관에서 데이터베이스 시스템 사용

import Like from '../model/like.model.js'; // @type {Object} - Like 모델
// @description Like 모델 가져오기
// @reason 좋아요 데이터 관리
// @analogy 도서관에서 대여 기록 모델

import Post from '../../models/post.model.js'; // @type {Object} - Post 모델
// @description Post 모델 가져오기
// @reason 포스트 데이터 관리
// @analogy 도서관에서 책 정보 모델

export const toggleLike = async (postId, userId, sessionId) => {
  if (!postId || typeof postId !== 'string') {
    return {
      success: false,
      status: 400,
      message: 'Invalid postId',
      data: null,
    }; // @description postId 유효성 검사 실패
    // @reason 유효하지 않은 입력 방지
    // @analogy 도서관에서 책 ID 잘못된 경우 요청 거부
  }
  if (userId && typeof userId !== 'string') {
    return {
      success: false,
      status: 400,
      message: 'Invalid userId',
      data: null,
    }; // @description userId 유효성 검사 실패
    // @reason 유효하지 않은 입력 방지
    // @analogy 도서관에서 손님 ID 잘못된 경우 요청 거부
  }
  if (sessionId && typeof sessionId !== 'string') {
    return {
      success: false,
      status: 400,
      message: 'Invalid sessionId',
      data: null,
    }; // @description sessionId 유효성 검사 실패
    // @reason 유효하지 않은 입력 방지
    // @analogy 도서관에서 세션 ID 잘못된 경우 요청 거부
  }

  try {
    const post = await Post.findById(postId); // @type {Object} - 포스트 데이터
    // @description 포스트 ID로 포스트 조회
    // @reason 포스트 존재 여부 확인 및 업데이트
    // @analogy 도서관에서 책 정보 조회
    if (!post) {
      return {
        success: false,
        status: 404,
        message: 'Post not found',
        data: null,
      }; // @description 포스트 없음
      // @reason 요청 실패 처리
      // @analogy 도서관에서 책 없음
    }

    const query = { postId }; // @type {Object} - 좋아요 조회 쿼리
    // @description 포스트 ID로 좋아요 조회 쿼리 생성
    // @reason 좋아요 존재 여부 확인
    // @analogy 도서관에서 대여 기록 조회 조건

    //====여기부터 수정됨====
    if (userId) {
      query.userId = userId; // @description userId 추가
      // @reason 인증된 사용자의 좋아요 확인
      // @analogy 도서관에서 손님 ID 추가
      query.sessionId = { $in: [null, undefined] }; // @description sessionId가 null 또는 undefined인 경우 모두 조회
      // @reason 데이터 불일치로 인한 조회 실패 방지
      // @analogy 도서관에서 손님 ID가 있으면 세션 ID는 없거나 undefined일 수 있음
    } else {
      query.sessionId = sessionId ? sessionId : { $in: [null, undefined] }; // @description sessionId 추가, 없으면 null/undefined 모두 조회
      // @reason 비인증 사용자의 좋아요 확인
      // @analogy 도서관에서 세션 ID가 없으면 null 또는 undefined일 수 있음
      query.userId = { $in: [null, undefined] }; // @description userId가 null 또는 undefined인 경우 모두 조회
      // @reason 데이터 불일치로 인한 조회 실패 방지
      // @analogy 도서관에서 세션 ID가 있으면 손님 ID는 없거나 undefined일 수 있음
    }
    //====여기까지 수정됨====

    const existingLike = await Like.findOneAndDelete(query); // @type {Object} - 기존 좋아요 데이터
    // @description 기존 좋아요 조회 및 삭제 (원자적 연산)
    // @reason 중복 키 에러 방지 및 데이터 일관성 보장
    // @analogy 도서관에서 대여 기록 조회 및 삭제를 한 번에 처리

    let updatedLikeCount;
    if (existingLike) {
      updatedLikeCount = await Like.countDocuments({ postId }); // @type {number} - 업데이트된 좋아요 수
      // @description 좋아요 수 계산
      // @reason 삭제 후 최신 카운트 반영
      // @analogy 도서관에서 대여 기록 삭제 후 대여 횟수 계산
    } else {
      const newLike = new Like({ postId, userId, sessionId }); // @type {Object} - 새로운 좋아요 객체
      // @description 새로운 좋아요 생성
      // @reason 좋아요 추가
      // @analogy 도서관에서 새 대여 기록 생성
      await newLike.save(); // @description 좋아요 저장
      // @reason 좋아요 데이터 저장
      // @analogy 도서관에서 대여 기록 저장
      updatedLikeCount = await Like.countDocuments({ postId }); // @type {number} - 업데이트된 좋아요 수
      // @description 좋아요 수 계산
      // @reason 추가 후 최신 카운트 반영
      // @analogy 도서관에서 대여 기록 추가 후 대여 횟수 계산
    }

    await Post.findByIdAndUpdate(postId, { likesCount: updatedLikeCount }); // @description 포스트의 좋아요 수 업데이트
    // @reason 최신 카운트 반영
    // @analogy 도서관에서 책의 대여 횟수 업데이트

    return {
      success: true,
      status: 200,
      message: existingLike
        ? 'Like removed successfully'
        : 'Like added successfully',
      data: { liked: !existingLike, likeCount: updatedLikeCount },
    }; // @description 성공 응답
    // @reason 클라이언트에 결과 전달
    // @analogy 도서관에서 손님에게 대여 결과 전달
  } catch (error) {
    console.error('toggleLike - Error:', {
      message: error.message,
      stack: error.stack,
    }); // @description 에러 로깅
    // @reason 디버깅: 에러 원인 확인
    // @analogy 도서관에서 실패 원인 기록
    return {
      success: false,
      status: 500,
      message: `Failed to toggle like: ${error.message}`,
      data: null,
    }; // @description 에러 응답
    // @reason 클라이언트에 구체적인 에러 전달
    // @analogy 도서관에서 손님에게 실패 사유 안내
  }
};
