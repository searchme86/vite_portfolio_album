/**
 * @file like.getUserLikes.controller.js
 * @description 사용자별 좋아요 상태와 포스트별 좋아요 수를 반환하는 컨트롤러
 * @reason 클라이언트에서 사용자별 좋아요 상태와 숫자 동기화
 * @analogy 도서관에서 손님별 대여 상태와 책별 대여 횟수 확인
 */
import Like from '../model/like.model.js'; // @type {Object} - Like 모델
// @description Like 모델 가져오기
// @reason 좋아요 데이터 조회
// @analogy 도서관에서 대여 기록 모델

import Post from '../../models/post.model.js'; // @type {Object} - Post 모델
// @description Post 모델 가져오기
// @reason 포스트별 좋아요 수 조회
// @analogy 도서관에서 책 정보 모델

export const getUserLikes = async (req, res) => {
  console.log('getUserLikes req', getUserLikes);
  try {
    const userId = req.user?.id || null; // @type {String|null} - 사용자 ID
    // @description 요청에서 사용자 ID 추출, 없으면 null
    // @reason 인증된 사용자 확인
    // @analogy 도서관에서 손님 ID 확인
    const sessionId = req.sessionID || null; // @type {String|null} - 세션 ID
    // @description 요청에서 세션 ID 추출, 없으면 null
    // @reason 비인증 사용자 확인
    // @analogy 도서관에서 세션 ID 확인

    if (!userId && !sessionId) {
      return res.status(401).json({
        success: false,
        message:
          'User identification required: Both userId and sessionId are null',
        data: null,
      }); // @description 사용자 식별 불가 응답
      // @reason 사용자 식별 불가 시 요청 거부
      // @analogy 도서관에서 신분 확인 불가 시 입장 거부
    }

    const posts = await Post.find({}); // @type {Array} - 모든 포스트
    // @description 모든 포스트 조회
    // @reason 포스트별 좋아요 수 확인
    // @analogy 도서관에서 모든 책 목록 조회
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No posts found',
        data: null,
      }); // @description 포스트 없음 응답
      // @reason 클라이언트에 실패 전달
      // @analogy 도서관에서 책 없음 안내
    }

    const likes = await Like.find({ $or: [{ userId }, { sessionId }] }); // @type {Array} - 사용자의 좋아요 목록
    // @description 사용자 ID 또는 세션 ID로 좋아요 조회
    // @reason 사용자별 좋아요 상태 확인
    // @analogy 도서관에서 손님의 대여 기록 조회

    const userLikes = posts.map((post) => {
      const postId = post._id.toString(); // @type {String} - 포스트 ID
      // @description 포스트 ID 문자열 변환
      // @reason 클라이언트와 ID 형식 일치
      // @analogy 도서관에서 책 ID 문자열로 변환
      const liked = likes.some((like) => like.postId === postId); // @type {boolean} - 사용자 좋아요 여부
      // @description 사용자가 해당 포스트를 좋아요 했는지 확인
      // @reason 클라이언트 상태 동기화
      // @analogy 도서관에서 손님이 책을 빌렸는지 확인
      return {
        postId,
        liked, // @type {boolean} - 좋아요 여부
        // @description 클라이언트에 좋아요 상태 전달
        // @reason UI 스타일 결정
        // @analogy 도서관에서 대여 여부 표시
        likesCount: post.likesCount || 0, // @type {number} - 포스트의 좋아요 수
        // @description 포스트의 전체 좋아요 수
        // @reason 클라이언트 카운트 동기화
        // @analogy 도서관에서 책의 대여 횟수
      };
    });

    return res.status(200).json({
      success: true,
      message: 'User likes retrieved successfully',
      data: userLikes, // @type {Array} - 사용자별 좋아요 상태와 카운트
      // @description 클라이언트에 결과 전달
      // @reason 상태 동기화 완료
      // @analogy 도서관에서 손님에게 대여 정보 전달
    });
  } catch (error) {
    console.error('getUserLikes - Error:', {
      message: error.message,
      stack: error.stack,
    }); // @description 에러 로깅
    // @reason 디버깅: 에러 원인 확인
    // @analogy 도서관에서 실패 원인 기록
    return res.status(500).json({
      success: false,
      message: `Failed to retrieve user likes: ${error.message}`,
      data: null,
    }); // @description 에러 응답
    // @reason 클라이언트에 실패 전달
    // @analogy 도서관에서 손님에게 실패 사유 안내
  }
};
