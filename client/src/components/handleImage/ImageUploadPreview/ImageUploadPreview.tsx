import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';
import { useImageFilePreviewUrls } from './ImagePreview/hooks/useImageFilePreviewUrls';
import ImagePreviewSwiperSlider from './ImagePreviewSwiperSlider/ImagePreviewSwiperSlider';
import ImagePreviewList from './ImagePreview/ImagePreviewList';

function ImageUploadPreview() {
  const { maxImages } = useImageManagementStore(); // @type {number}
  const { formattedImageUrls } = useImageFilePreviewUrls(); // @type {{ previewUrls: string[],
  const currentUploadedImages = formattedImageUrls?.length || 0; // @type {number}
  const useSwiper = currentUploadedImages > maxImages; // @type {boolean}

  if (currentUploadedImages === 0) {
    return null;
  }

  if (useSwiper) {
    return <ImagePreviewSwiperSlider />;
  } else {
    return <ImagePreviewList />;
  }
}

export default ImageUploadPreview;
