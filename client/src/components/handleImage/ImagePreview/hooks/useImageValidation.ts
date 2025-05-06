import { ImageUrl } from '../../context/ImageUploadContext';

export const useImageValidation = (
  imageUrls: ImageUrl[],
  minImages: number
) => {
  return {
    safeImageUrls: imageUrls,
    safeMinImages: minImages,
  };
};
