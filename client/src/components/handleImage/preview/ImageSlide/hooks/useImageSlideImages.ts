import useImageUploadStatus from '../../Common/hooks/useImageUploadStatus';
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

function useImageSlideImages() {
  const { imageUrls } = useImageUploadStatus(); // @type {ImageUrl[]}
  // @description 업로드 상태와 이미지 URL 가져오기
  // @reason 공통 훅 활용
  const maxImages = useImageManagementStore((state) => state.maxImages || 10); // @type {number}
  // @description Zustand 상태에서 최대 이미지 수 가져오기
  // @reason 제한 적용

  return { imageUrls: imageUrls.slice(0, maxImages) };
}

export default useImageSlideImages;
