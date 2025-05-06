import { useImageUploadContext } from '../context/ImageUploadContext';
import { useImagePreview } from './hooks/useImagePreview';
import { useImageValidation } from './hooks/useImageValidation';
import ImageListContainerComponent from './components/ImageListContainerComponent';
import MinimumImagesWarningComponent from './components/MinimumImagesWarningComponent';

function ImagePreview() {
  const { imageUrls, minImages } = useImageUploadContext();
  console.log('ImagePreview - imageUrls:', imageUrls, 'minImages:', minImages);

  const { safeImageUrls, safeMinImages } = useImageValidation(
    imageUrls,
    minImages
  );

  const { handleRemoveImage } = useImagePreview();

  return (
    <div className="mb-4">
      <ImageListContainerComponent
        safeImageUrls={safeImageUrls}
        safeMinImages={safeMinImages}
        handleRemoveImage={handleRemoveImage}
      />
      <MinimumImagesWarningComponent
        safeImageUrlsLength={safeImageUrls.length}
        safeMinImages={safeMinImages}
      />
    </div>
  );
}

export default ImagePreview;
