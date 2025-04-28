// src/components/handleImage/ImagePreview/hooks/useImageValidation.js

// ===여기부터 코드 작업시작======
// 1. 이미지 유효성 검사 훅 정의
// 2. imageUrls와 minImages를 안전하게 처리
export const useImageValidation = (imageUrls, minImages) => {
  // 1. imageUrls가 배열인지 확인
  // 2. 오류 방지를 위해 빈 배열로 폴백
  const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];
  console.log('useImageValidation - safeImageUrls:', safeImageUrls);

  // 1. minImages가 유효한 숫자인지 확인
  // 2. 유효하지 않으면 기본값 1로 설정
  const safeMinImages =
    Number.isInteger(minImages) && minImages > 0 ? minImages : 1;
  console.log('useImageValidation - safeMinImages:', safeMinImages);

  // 1. 유효성 검사 결과 반환
  // 2. ImagePreview에서 사용
  return { safeImageUrls, safeMinImages };
};
// ===여기부터 코드 작업종료======
