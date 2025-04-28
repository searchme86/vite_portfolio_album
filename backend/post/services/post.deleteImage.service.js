// src/services/post.deleteImage.service.js

// Post 모델을 가져옴
// MongoDB에서 포스트 데이터를 조회 및 업데이트하기 위해 필요
import Post from '../../models/post.model.js';

// 포스트에서 이미지 삭제 비즈니스 로직
// 포스트의 img 배열에서 특정 이미지 URL을 제거
export const deleteImageService = async (postId, imageUrl) => {
  // 포스트 조회
  // ID를 기반으로 포스트 데이터 조회
  const post = await Post.findById(postId);
  console.log('deleteImageService - Fetched post:', post);
  // 1. 조회된 포스트 출력 (null일 수도 있음)
  // 2. 데이터 조회 결과 확인

  // 포스트가 없을 경우 에러 반환
  // 조회 대상이 없음을 알림
  if (!post) {
    return {
      success: false,
      status: 404,
      message: { message: 'Post not found' },
    };
  }

  // 현재 이미지 배열 확인
  // img 필드가 없으면 빈 배열로 초기화
  post.img = post.img || [];
  console.log('deleteImageService - Current post images:', post.img);
  // 1. 현재 포스트의 이미지 배열 출력
  // 2. 이미지 배열 상태 확인

  // 이미지 URL 삭제
  // img 배열에서 요청된 이미지 URL 제거
  post.img = post.img.filter((img) => img !== imageUrl);
  console.log('deleteImageService - Updated post images:', post.img);
  // 1. 이미지 삭제 후 포스트의 이미지 배열 출력
  // 2. 이미지 삭제 결과 확인

  // 포스트 저장
  // 변경된 포스트 데이터를 DB에 저장
  await post.save();
  console.log('deleteImageService - Saved post:', post);
  // 1. 저장된 포스트 출력
  // 2. 저장 결과 확인

  // 삭제 성공
  // 성공 결과 반환
  return {
    success: true,
    status: 200,
  };
};
