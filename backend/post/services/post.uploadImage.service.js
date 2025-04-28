// src/services/post.uploadImage.service.js

// Post 모델을 가져옴
// MongoDB에서 포스트 데이터를 조회 및 업데이트하기 위해 필요
import Post from '../../models/post.model.js';

// 포스트에 이미지 업로드 비즈니스 로직
// 포스트의 img 배열에 이미지 URL을 추가
export const uploadImageService = async (postId, imageUrl) => {
  // 포스트 조회
  // ID를 기반으로 포스트 데이터 조회
  const post = await Post.findById(postId);
  console.log('uploadImageService - Fetched post:', post);
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

  // 이미지 URL 유효성 검사
  // URL이 없거나 문자열이 아니거나 ImageKit URL이 아닌 경우 에러 반환
  if (
    !imageUrl ||
    typeof imageUrl !== 'string' ||
    !imageUrl.startsWith('https://ik.imagekit.io')
  ) {
    return {
      success: false,
      status: 400,
      message: { message: 'Invalid image URL' },
    };
  }

  // 포스트의 img 배열 초기화 또는 유지
  // img 필드가 없으면 빈 배열로 초기화
  post.img = post.img || [];
  console.log('uploadImageService - Current post images:', post.img);
  // 1. 현재 포스트의 이미지 배열 출력
  // 2. 이미지 배열 상태 확인

  // 이미지 URL 추가
  // img 배열에 새로운 이미지 URL 추가
  post.img.push(imageUrl);
  console.log('uploadImageService - Updated post images:', post.img);
  // 1. 이미지 추가 후 포스트의 이미지 배열 출력
  // 2. 이미지 추가 결과 확인

  // 포스트 저장
  // 변경된 포스트 데이터를 DB에 저장
  await post.save();
  console.log('uploadImageService - Saved post:', post);
  // 1. 저장된 포스트 출력
  // 2. 저장 결과 확인

  // 업로드 성공
  // 성공 결과 반환
  return {
    success: true,
    status: 200,
  };
};
