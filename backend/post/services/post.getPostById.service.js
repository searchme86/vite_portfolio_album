// src/services/post.getPostById.service.js

// Post 모델을 가져옴
// MongoDB에서 포스트 데이터를 조회하기 위해 필요
import Post from '../../models/post.model.js';

// 포스트 조회 비즈니스 로직
// 특정 ID로 포스트를 조회
export const getPostByIdService = async (postId) => {
  // 포스트 조회
  // ID를 기반으로 포스트와 관련된 사용자 정보를 함께 조회
  const post = await Post.findById(postId).populate(
    'user',
    'username img clerkUserId'
  );
  console.log('getPostByIdService - Fetched post:', post);
  // 1. 조회된 포스트 출력 (null일 수도 있음)
  // 2. 데이터 조회 결과 확인

  // 포스트가 없을 경우 에러 반환
  // 조회 대상이 없음을 알림
  if (!post) {
    return {
      success: false,
      status: 404,
      message: 'Post not found!',
    };
  }

  // 조회 성공
  // 조회된 포스트 반환
  return {
    success: true,
    status: 200,
    post,
  };
};
