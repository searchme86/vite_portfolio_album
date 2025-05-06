import { ImageUrl } from '../../context/ImageUploadContext';

// ImageUrlsType = string[] 로 정의

function useSafeImages(images: ImageUrl[] | string[]) {
  // images가 배열이 아니거나 undefined일 경우 빈 배열로 처리
  const safeImages = Array.isArray(images) ? images : [];

  // 이미지가 ImageUrl[]일 경우, 객체에서 url을 추출
  if (
    safeImages.length > 0 &&
    typeof safeImages[0] === 'object' &&
    'url' in safeImages[0]
  ) {
    const validatedImages = (safeImages as ImageUrl[]).filter(
      (image) => typeof image.url === 'string' && image.url !== ''
    );

    // 유효한 이미지가 있으면 URL 배열 반환, 없으면 더미 이미지 사용
    return validatedImages.length > 0
      ? validatedImages.map((image) => image.url)
      : ['https://via.placeholder.com/150'];
  }

  // 이미지가 string[]일 경우 그대로 사용
  const validatedImages = safeImages.filter(
    (image) => typeof image === 'string' && image !== ''
  );

  // 최종 결과가 빈 배열일 경우 기본 더미 이미지 배열로 fallback
  return validatedImages.length > 0
    ? validatedImages
    : ['https://via.placeholder.com/150'];
}

export default useSafeImages;
