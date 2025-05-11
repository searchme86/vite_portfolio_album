import ImagePreview from './ImagePreview/ImagePreview';
import ImageSlide from './ImageSlide/ImageSlide';
import { useImageFilePreviewUrls } from './Common/hooks/useImageFilePreviewUrls';
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

function ImagePreviewContainer() {
  const { maxImages } = useImageManagementStore();
  const { previewUrls, formattedImageUrls } = useImageFilePreviewUrls();

  if (previewUrls.length > 0 && formattedImageUrls?.length > 0) {
    return maxImages < formattedImageUrls?.length ? (
      <ImagePreview />
    ) : (
      <ImageSlide />
    );
  }
}

export default ImagePreviewContainer;
