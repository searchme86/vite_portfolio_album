// src/components/handleImage/ImagePreview/hooks/useImagePreview.js
// import { useImageUploadContext } from '../../context/ImageUploadContext';
import { useImageUploadContext } from '../../context/ImageUploadContext';

// 1. useImagePreview 훅: 이미지 삭제 로직 관리
// 2. 단일 책임: 이미지 삭제 기능 제공, Context는 ImageUploadManager에서 제공
export const useImagePreview = () => {
  // 1. useImageUploadContext 훅으로 Context 값 가져옴
  // 2. ImageUploadManager에서 Provider를 통해 전달된 값을 사용
  const {
    imageUrls,
    setImageUrls,
    minImages,
    setButtonText,
    onImageUrlsChange,
  } = useImageUploadContext();

  // 1. imageUrls가 배열이 아닌 경우 빈 배열로 초기화
  // 2. map 및 필터링 오류 방지
  const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

  // 1. setImageUrls가 함수가 아닌 경우 빈 함수로 대체
  // 2. 호출 시 에러 방지
  const safeSetImageUrls =
    typeof setImageUrls === 'function' ? setImageUrls : () => {};

  // 1. minImages가 숫자가 아닌 경우 기본값 설정
  // 2. 비교 연산 오류 방지
  const safeMinImages =
    Number.isInteger(minImages) && minImages > 0 ? minImages : 1;

  // 1. setButtonText가 함수가 아닌 경우 빈 함수로 대체
  // 2. 호출 시 에러 방지
  const safeSetButtonText =
    typeof setButtonText === 'function' ? setButtonText : () => {};

  // 1. onImageUrlsChange가 함수가 아닌 경우 빈 함수로 대체
  // 2. 호출 시 에러 방지
  const safeOnImageUrlsChange =
    typeof onImageUrlsChange === 'function' ? onImageUrlsChange : () => {};

  // 1. handleRemoveImage 함수: 이미지 삭제 처리
  // 2. 최소 이미지 수 제약 확인 및 상태 업데이트
  const handleRemoveImage = (index) => {
    // 1. index가 유효하지 않은 경우 처리 중단
    // 2. 배열 접근 오류 방지
    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= safeImageUrls.length
    ) {
      console.log('ImagePreview - Invalid index for removal:', index);
      return;
    }

    if (safeImageUrls.length <= safeMinImages) {
      console.log('ImagePreview - Cannot remove last image');
      return;
    }
    const updatedUrls = safeImageUrls.filter((_, i) => i !== index);
    safeSetImageUrls(updatedUrls);
    safeSetButtonText(updatedUrls.length > 0 ? 'Update' : 'Add a Cover Image');
    safeOnImageUrlsChange(updatedUrls);
    console.log('ImagePreview - Image removed, new imageUrls:', updatedUrls);
  };

  return { handleRemoveImage };
};
