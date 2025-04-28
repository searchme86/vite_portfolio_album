// src/controllers/post.uploadImage.controller.js

// 서비스 함수를 가져옴
// 비즈니스 로직을 분리하여 컨트롤러는 요청/응답 처리만 담당
import { uploadImageService } from '../services/post.uploadImage.service.js';

// 캐시 유틸 가져옴
// 캐시 관리 기능을 분리하여 재사용 가능하도록 함
import { postCache } from '../utils/post.uploadImage.cache.util.js';

// uploadImage 컨트롤러 함수
// 포스트에 이미지를 업로드하는 요청을 처리
export const uploadImage = async (req, res) => {
  // 요청 파라미터에서 포스트 ID 추출
  // 이미지를 추가할 포스트 식별
  const postId = req.params.id || null; // 타입스크립트 대비: null fallback 추가

  // 요청 본문에서 이미지 URL 추출
  // 업로드할 이미지 URL
  const imageUrl = req.body.imageUrl || null; // 타입스크립트 대비: null fallback 추가

  console.log('uploadImage - Requested postId:', postId);
  // 1. 요청된 포스트 ID 출력
  // 2. 요청 데이터 확인

  console.log('uploadImage - Requested imageUrl:', imageUrl);
  // 1. 요청된 이미지 URL 출력
  // 2. 요청 데이터 확인

  try {
    // 서비스 함수 호출하여 포스트에 이미지 업로드
    // 비즈니스 로직을 서비스로 분리하여 컨트롤러는 요청/응답만 처리
    const result = await uploadImageService(postId, imageUrl);

    // 포스트 조회 또는 이미지 유효성 검사 실패 시 에러 응답
    // 포스트가 없거나 이미지 URL이 유효하지 않을 경우
    if (!result.success) {
      return res.status(result.status).json(result.message);
    }

    // 캐시 클리어
    // 이미지 업로드 후 캐시 갱신
    postCache.clear();
    console.log('uploadImage - Cache cleared after image upload');
    // 1. 캐시 클리어 출력
    // 2. 캐시 갱신 확인

    // 성공 응답
    // 클라이언트에 업로드 결과 반환
    res.status(200).json({ message: 'Image uploaded', imageUrl });
  } catch (error) {
    console.error('uploadImage - Error uploading image:', error);
    // 1. 이미지 업로드 중 발생한 에러 출력
    // 2. 에러 원인 확인

    // 서버 에러 응답
    // 클라이언트에 에러 메시지 전달
    res
      .status(500)
      .json({ message: 'Failed to upload image', error: error.message });
  }
};
