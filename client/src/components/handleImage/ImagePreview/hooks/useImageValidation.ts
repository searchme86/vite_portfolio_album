import { ImageUrl } from '../../context/ImageUploadContext'; // @type {Type} - 이미지 URL 타입
// @description 이미지 데이터 타입 정의
// @reason 타입 안정성

// 유효성 검증 결과 타입 정의
interface ImageValidationResult {
  safeImageUrls: ImageUrl[]; // @type {ImageUrl[]} - 안전한 이미지 URL 배열
  // @description 검증된 이미지 목록
  // @reason 안전한 데이터 제공
  safeMinImages: number; // @type {number} - 안전한 최소 이미지 수
  // @description 검증된 최소 이미지 수
  // @reason 규칙 적용
}

export const useImageValidation = (
  imageUrls: ImageUrl[], // @type {ImageUrl[]} - 이미지 URL 배열
  // @description 검증할 이미지 목록
  // @reason 데이터 검증
  minImages: number // @type {number} - 최소 이미지 수
  // @description 최소 이미지 수
  // @reason 규칙 적용
): ImageValidationResult => {
  return {
    safeImageUrls: imageUrls || [], // @type {ImageUrl[]} - 안전한 이미지 URL 배열
    // @description 이미지 목록 검증, 없으면 빈 배열
    // @reason fallback 제공
    safeMinImages: minImages || 1, // @type {number} - 안전한 최소 이미지 수
    // @description 최소 이미지 수 검증, 없으면 1
    // @reason fallback 제공
  }; // @type {ImageValidationResult} - 검증 결과
  // @description 검증된 데이터 반환
  // @reason 상위 사용
};
