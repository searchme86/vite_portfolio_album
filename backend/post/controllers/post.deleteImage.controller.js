// src/controllers/post.deleteImage.controller.js

// 서비스 함수를 가져옴
// 비즈니스 로직을 분리하여 컨트롤러는 요청/응답 처리만 담당
import { deleteImageService } from '../services/post.deleteImage.service.js';

// 캐시 유틸 가져옴
// 캐시 관리 기능을 분리하여 재사용 가능하도록 함
import { postCache } from '../utils/post.deleteImage.cache.util.js';

// deleteImage 컨트롤러 함수
// 포스트에서 이미지를 삭제하는 요청을 처리
export const deleteImage = async (req, res) => {
  // 요청 파라미터에서 포스트 ID 추출
  // 이미지를 삭제할 포스트 식별
  const postId = req.params.id || null; // 타입스크립트 대비: null fallback 추가

  // 요청 본문에서 이미지 URL 추출
  // 삭제할 이미지 URL
  const imageUrl = req.body.imageUrl || null; // 타입스크립트 대비: null fallback 추가

  console.log('deleteImage - Requested postId:', postId);
  // 1. 요청된 포스트 ID 출력
  // 2. 요청 데이터 확인

  console.log('deleteImage - Requested imageUrl:', imageUrl);
  // 1. 요청된 이미지 URL 출력
  // 2. 요청 데이터 확인

  try {
    // 서비스 함수 호출하여 포스트에서 이미지 삭제
    // 비즈니스 로직을 서비스로 분리하여 컨트롤러는 요청/응답만 처리
    const result = await deleteImageService(postId, imageUrl);

    // 포스트 조회 실패 시 에러 응답
    // 포스트가 없을 경우
    if (!result.success) {
      return res.status(result.status).json(result.message);
    }

    // 캐시 클리어
    // 이미지 삭제 후 캐시 갱신
    postCache.clear();
    console.log('deleteImage - Cache cleared after image delete');
    // 1. 캐시 클리어 출력
    // 2. 캐시 갱신 확인

    // 성공 응답
    // 클라이언트에 삭제 결과 반환
    res.status(200).json({ message: 'Image deleted' });
  } catch (error) {
    console.error('deleteImage - Error deleting image:', error);
    // 1. 이미지 삭제 중 발생한 에러 출력
    // 2. 에러 원인 확인

    // 서버 에러 응답
    // 클라이언트에 에러 메시지 전달
    res
      .status(500)
      .json({ message: 'Failed to delete image', error: error.message });
  }
};
