/**
 * @file like.addLikeToPost.controller.js
 * @description 포스트에 좋아요를 추가하거나 제거하는 컨트롤러
 * @reason 클라이언트에서 좋아요 상태와 카운트 동기화
 * @analogy 도서관에서 손님이 책에 좋아요를 누르거나 취소
 */
import { v4 as uuidv4 } from 'uuid'; // @type {Function} - UUID 생성 라이브러리
// @description UUID 생성 함수 가져오기
// @reason 고유한 세션 ID 생성
// @analogy 도서관에서 임시 손님에게 고유 번호 부여

import Like from '../model/like.model.js'; // @type {Object} - Like 모델
// @description Like 모델 가져오기
// @reason 좋아요 데이터 조작
// @analogy 도서관에서 대여 기록 모델

import Post from '../../models/post.model.js'; // @type {Object} - Post 모델
// @description Post 모델 가져오기
// @reason 포스트 데이터 조작
// @analogy 도서관에서 책 정보 모델

export const addLikeToPost = async (req, res) => {
  try {
    const userId = req.user?.id || null; // @type {String|null} - 사용자 ID
    // @description 요청에서 사용자 ID 추출, 없으면 null
    // @reason 인증된 사용자 확인
    // @analogy 도서관에서 손님 ID 확인

    //====여기부터 수정됨====
    let sessionId = req.sessionID || null; // @type {String|null} - 세션 ID
    // @description 요청에서 세션 ID 추출, 없으면 null
    // @reason 비인증 사용자 확인
    // @analogy 도서관에서 세션 ID 확인

    if (!sessionId && !userId) {
      sessionId = uuidv4(); // @type {String} - 고유한 세션 ID 생성
      // @description 세션 ID가 없고 사용자도 비로그인 상태면 UUID 생성
      // @reason 중복 키 에러 방지
      // @analogy 도서관에서 임시 손님에게 고유 번호 부여
      req.sessionID = sessionId; // @description 요청 객체에 세션 ID 저장
      // @reason 후속 요청에서 동일한 세션 ID 사용
      // @analogy 도서관에서 손님에게 임시 번호 저장
    }
    //====여기까지 수정됨====

    const { postId } = req.body; // @type {String} - 포스트 ID
    // @description 요청 본문에서 포스트 ID 추출
    // @reason 좋아요 대상 포스트 식별
    // @analogy 도서관에서 좋아요할 책 ID 확인

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: 'Post ID is required',
        data: null,
      }); // @description 포스트 ID 누락 응답
      // @reason 클라이언트에 실패 전달
      // @analogy 도서관에서 책 ID 없으면 요청 거부
    }

    const post = await Post.findById(postId); // @type {Object|null} - 포스트 데이터
    // @description 포스트 ID로 포스트 조회
    // @reason 포스트 존재 여부 확인
    // @analogy 도서관에서 책 존재 여부 확인
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
        data: null,
      }); // @description 포스트 없음 응답
      // @reason 클라이언트에 실패 전달
      // @analogy 도서관에서 책 없음 안내
    }

    //====여기부터 수정됨====
    const existingLike = await Like.findOne({
      postId,
      $or: [{ userId }, { sessionId }],
    }); // @type {Object|null} - 기존 좋아요 데이터
    // @description 동일한 postId와 userId 또는 sessionId로 기존 좋아요 조회
    // @reason 중복 삽입 방지 및 토글 로직 구현
    // @analogy 도서관에서 손님이 이미 책을 대여했는지 확인

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id }); // @description 기존 좋아요 삭제
      // @reason 좋아요 토글: 이미 좋아요한 경우 취소
      // @analogy 도서관에서 손님이 책을 반납
      post.likesCount = (post.likesCount || 0) - 1; // @type {number} - 좋아요 카운트 감소
      // @description 포스트의 좋아요 카운트 감소
      // @reason 좋아요 취소 반영
      // @analogy 도서관에서 책 대여 횟수 감소
      if (post.likesCount < 0) post.likesCount = 0; // @description 카운트 음수 방지
      // @reason 데이터 무결성 유지
      // @analogy 도서관에서 대여 횟수 음수 방지
      await post.save(); // @description 포스트 데이터 저장
      // @reason 데이터베이스에 변경사항 반영
      // @analogy 도서관에서 책 정보 업데이트

      return res.status(200).json({
        success: true,
        message: 'Like removed successfully',
        data: { liked: false, likeCount: post.likesCount },
      }); // @description 좋아요 취소 응답
      // @reason 클라이언트에 성공 전달
      // @analogy 도서관에서 손님에게 반납 성공 안내
    }

    const newLike = new Like({
      postId,
      userId,
      sessionId,
      createdAt: new Date(), // @type {Date} - 생성 시간
      // @description 좋아요 생성 시간 설정
      // @reason 좋아요 생성 시점 기록
      // @analogy 도서관에서 대여 시간 기록
    });

    await newLike.save(); // @description 새로운 좋아요 저장
    // @reason 데이터베이스에 좋아요 추가
    // @analogy 도서관에서 대여 기록 추가
    post.likesCount = (post.likesCount || 0) + 1; // @type {number} - 좋아요 카운트 증가
    // @description 포스트의 좋아요 카운트 증가
    // @reason 좋아요 추가 반영
    // @analogy 도서관에서 책 대여 횟수 증가
    await post.save(); // @description 포스트 데이터 저장
    // @reason 데이터베이스에 변경사항 반영
    // @analogy 도서관에서 책 정보 업데이트

    return res.status(200).json({
      success: true,
      message: 'Like added successfully',
      data: { liked: true, likeCount: post.likesCount },
    }); // @description 좋아요 추가 응답
    // @reason 클라이언트에 성공 전달
    // @analogy 도서관에서 손님에게 대여 성공 안내
    //====여기까지 수정됨====
  } catch (error) {
    console.error('addLikeToPost - Error:', {
      message: error.message,
      stack: error.stack,
    }); // @description 에러 로깅
    // @reason 디버깅: 에러 원인 확인
    // @analogy 도서관에서 실패 원인 기록

    //====여기부터 수정됨====
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Like already exists for this session and post',
        data: null,
      }); // @description 중복 키 에러 응답
      // @reason 클라이언트에 중복 요청 알림
      // @analogy 도서관에서 손님에게 중복 대여 시도 알림
    }
    //====여기까지 수정됨====

    return res.status(500).json({
      success: false,
      message: `Failed to toggle like: ${error.message}`,
      data: null,
    }); // @description 일반 에러 응답
    // @reason 클라이언트에 실패 전달
    // @analogy 도서관에서 손님에게 실패 사유 안내
  }
};
