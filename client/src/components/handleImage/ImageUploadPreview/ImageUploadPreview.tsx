import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';
import { useImageFilePreviewUrls } from './ImagePreview/hooks/useImageFilePreviewUrls';
import ImagePreviewSwiperSlider from './ImagePreviewSwiperSlider/ImagePreviewSwiperSlider';
import ImagePreviewList from './ImagePreview/ImagePreviewList';

// ImageUploadPreview: 이미지 미리보기 컨테이너
// 의미: 업로드된 이미지와 임시 파일을 기반으로 미리보기 또는 슬라이더 렌더링
// 이유: 이미지 개수에 따라 표시 방식 스위칭
function ImageUploadPreview() {
  const { maxImages } = useImageManagementStore(); // @type {number}
  const { formattedImageUrls } = useImageFilePreviewUrls(); // @type {{ previewUrls: string[],
  const currentUploadedImages = formattedImageUrls?.length || 0; // @type {number}
  const useSwiper = currentUploadedImages > maxImages; // @type {boolean}

  // 이미지 없으면 렌더링하지 않음
  if (currentUploadedImages === 0) {
    return null; // @type {null}
  }

  return (
    <div className="">
      {useSwiper ? <ImagePreviewSwiperSlider /> : <ImagePreviewList />}
    </div>
  );
}

export default ImageUploadPreview;
