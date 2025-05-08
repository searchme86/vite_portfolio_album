// 타입 정의: ImageItem은 이미지 URL과 상태를 나타냄
// 의미: 이미지 데이터 구조 정의
// 이유: 타입 안전성 보장
interface ImageItem {
  url: string; // 타입: string - 이미지 URL
  isNew: boolean; // 타입: boolean - 새 이미지 여부
}

// 유효성 검증 결과 타입 정의
// 의미: 검증된 데이터를 반환
// 이유: 타입 안전성 및 데이터 안정성 보장
interface ImageValidationResult {
  safeImageUrls: ImageItem[]; // 타입: ImageItem[] - 안전한 이미지 URL 배열
  safeMinImages: number; // 타입: number - 안전한 최소 이미지 수
}

// 이미지 유효성 검증 훅
// 의미: 이미지 URL과 최소 이미지 수를 검증
// 이유: 데이터 안전성 보장 및 애플리케이션 안정성
export const useImageValidation = (
  imageUrls: ImageItem[], // 타입: ImageItem[] - 이미지 URL 배열
  minImages: number // 타입: number - 최소 이미지 수
): ImageValidationResult => {
  return {
    safeImageUrls: imageUrls || [], // 타입: ImageItem[] - 안전한 이미지 URL 배열
    // 의미: 이미지 목록 검증, 없으면 빈 배열
    // 이유: fallback 제공
    safeMinImages: minImages || 1, // 타입: number - 안전한 최소 이미지 수
    // 의미: 최소 이미지 수 검증, 없으면 1
    // 이유: fallback 제공
  };
  // 타입: ImageValidationResult - 검증 결과
  // 의미: 검증된 데이터 반환
  // 이유: 상위 컴포넌트에서 안전한 데이터 사용
};
