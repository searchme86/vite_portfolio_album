import { useImageUploadContext } from '../../context/ImageUploadContext';

// 훅 정의
export const useImageSlide = () => {
  const { imageUrls } = useImageUploadContext();

  // imageUrls가 undefined나 null일 경우 빈 배열로 초기화
  const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

  // imageUrls의 각 항목이 객체인지 확인하고 url 속성 추출
  const validatedImageUrls = safeImageUrls.map((item) => {
    // item이 객체이고 url 속성이 문자열인지 확인
    const isValidItem =
      item && typeof item === 'object' && typeof item.url === 'string';
    // 유효하지 않은 경우 빈 문자열로 fallback
    return isValidItem ? item.url : '';
  });

  // 슬라이드 이미지 목록이 비어 있을 경우 기본 더미 이미지로 fallback
  const slideImages =
    validatedImageUrls.length > 0
      ? validatedImageUrls
      : ['https://via.placeholder.com/150']; // 더미 이미지 URL

  return { slideImages };
};
