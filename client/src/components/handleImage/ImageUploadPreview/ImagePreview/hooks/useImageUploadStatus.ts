import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

function useImageUploadStatus() {
  const imageUrls = useImageManagementStore((state) => state.imageUrls || []); // @type {ImageUrl[]}
  // @description Zustand 상태에서 이미지 URL 배열 선택
  // @reason 상태 접근
  const isUploading = useImageManagementStore(
    (state) => state.isUploading || false
  ); // @type {boolean}
  // @description Zustand 상태에서 업로드 진행 상태 선택
  // @reason 상태 접근
  const imageTitles = useImageManagementStore(
    (state) => state.imageTitle || []
  ); // @type {ImageFileName[]}
  // @description Zustand 상태에서 이미지 제목 배열 선택
  // @reason alt 속성 반영

  return { imageUrls, isUploading, imageTitles };
}

export default useImageUploadStatus;
