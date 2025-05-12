import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';
import { useImageFilePreviewUrls } from './ImagePreview/hooks/useImageFilePreviewUrls';
import ImagePreview from './ImagePreview/ImagePreview';
import ImagePreviewSwiperSlider from './ImagePreviewSwiperSlider/ImagePreviewSwiperSlider';

// ImageUploadPreview: 이미지 미리보기 컨테이너
// 의미: 업로드된 이미지와 임시 파일을 기반으로 미리보기 또는 슬라이더 렌더링
// 이유: 이미지 개수에 따라 표시 방식 스위칭
function ImageUploadPreview() {
  const { maxImages } = useImageManagementStore(); // @type {number}
  // @description Zustand 상태에서 최대 이미지 개수 가져오기
  // @reason 조건 판단용
  const { formattedImageUrls } = useImageFilePreviewUrls(); // @type {{ previewUrls: string[], formattedImageUrls: string[] }}
  // @description 미리보기 URL과 업로드된 이미지 URL 가져오기
  // @reason 이미지 데이터 접근

  const currentUploadedImages = formattedImageUrls?.length || 0; // @type {number}
  // @description 업로드 중인 파일과 업로드 완료된 파일의 총 개수 계산
  // @reason 조건 판단을 위한 총 이미지 개수
  const useSwiper = currentUploadedImages > maxImages; // @type {boolean}
  // @description 총 이미지 개수가 maxImages를 초과하면 Swiper 사용
  // @reason 표시 방식 결정

  console.log(
    'maxImages:',
    maxImages,
    'currentUploadedImages:',
    currentUploadedImages,
    'useSwiper:',
    useSwiper
  );

  // 이미지 없으면 렌더링하지 않음
  if (currentUploadedImages === 0) {
    return null; // @type {null}
    // @description 이미지 없으면 빈 상태 반환
    // @reason 불필요한 렌더링 방지
  }

  return (
    <div className="">
      {useSwiper ? <ImagePreviewSwiperSlider /> : <ImagePreview />}
    </div>
  );
}

export default ImageUploadPreview;
