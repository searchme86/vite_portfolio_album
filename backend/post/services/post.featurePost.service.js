// src/services/post.featurePost.service.js

// Post 모델을 가져옴
// MongoDB에서 포스트 데이터를 조회 및 업데이트하기 위해 필요
import Post from '../../models/post.model.js';

// 포스트 추천 상태 토글 비즈니스 로직
// 포스트의 isFeatured 상태를 변경
export const featurePostService = async (postId) => {
  // 포스트 조회
  // ID를 기반으로 포스트 데이터 조회
  const post = await Post.findById(postId);
  console.log('featurePostService - Fetched post:', post);
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

  // 현재 추천 상태 확인
  // isFeatured 값을 반전시키기 위해 사용
  const isFeatured = post.isFeatured;
  console.log('featurePostService - Current isFeatured state:', isFeatured);
  // 1. 현재 추천 상태 출력
  // 2. 상태 확인

  // 포스트 추천 상태 업데이트
  // isFeatured 값을 반전하여 저장
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { isFeatured: !isFeatured },
    { new: true } // 업데이트된 문서 반환
  );
  console.log('featurePostService - Updated post:', updatedPost);
  // 1. 업데이트된 포스트 출력
  // 2. 업데이트 결과 확인

  // 업데이트 성공
  // 업데이트된 포스트 반환
  return {
    success: true,
    status: 200,
    updatedPost,
  };
};
