import {
  useImageUploadContext,
  ImageUrl,
} from '../../context/ImageUploadContext';

export const useImagePreview = () => {
  const {
    imageUrls,
    setImageUrls,
    minImages,
    setButtonText,
    onImageUrlsChange,
  } = useImageUploadContext();

  const handleRemoveImage = (index: number) => {
    if (index < 0 || index >= imageUrls.length) return;
    if (imageUrls.length <= minImages) return;

    const updatedUrls = imageUrls.filter((_, i) => i !== index);

    setImageUrls(updatedUrls);
    setButtonText(updatedUrls.length > 0 ? 'Update' : 'Add a Cover Image');
    onImageUrlsChange(updatedUrls.map((image: ImageUrl) => image.url));
  };

  return { handleRemoveImage };
};
