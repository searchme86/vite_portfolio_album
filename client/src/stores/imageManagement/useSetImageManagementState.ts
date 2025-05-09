import { useImageManagementStore } from './imageManagementStore'; // @type {Function} - Zustand 스토어
// 의미: Zustand 스토어 가져오기
// 이유: 상태 관리
import { SetterActions } from './initialImageManagementState'; // @type {Interface} - Setter 타입
// 의미: Setter 함수 타입 정의
// 이유: 타입 안정성

// useSetImageManagementState 훅: Setter 함수들만 추출
// 의미: 상태 업데이트 함수 제공
// 이유: 컴포넌트에서 상태 변경 용이
export const useSetImageManagementState = (): SetterActions => {
  const {
    setImageUrls,
    setMinImages,
    setPostId,
    setTempFiles,
    setButtonText,
    setIsUploading,
    setProgress,
    setExistingBaseFileNames,
    setImageTitle,
    setMaxImages,
    setBaseFileNamesWithoutSuffix,
    setImageUploaderKey,
    onImageUrlsChange,
  } = useImageManagementStore((state) => ({
    setImageUrls: state.setImageUrls,
    setMinImages: state.setMinImages,
    setPostId: state.setPostId,
    setTempFiles: state.setTempFiles,
    setButtonText: state.setButtonText,
    setIsUploading: state.setIsUploading,
    setProgress: state.setProgress,
    setExistingBaseFileNames: state.setExistingBaseFileNames,
    setImageTitle: state.setImageTitle,
    setMaxImages: state.setMaxImages,
    setBaseFileNamesWithoutSuffix: state.setBaseFileNamesWithoutSuffix,
    setImageUploaderKey: state.setImageUploaderKey,
    onImageUrlsChange: state.onImageUrlsChange,
  })); // 의미: Zustand 스토어에서 Setter 함수들만 선택
  // 이유: 역할 분리

  return {
    setImageUrls,
    setMinImages,
    setPostId,
    setTempFiles,
    setButtonText,
    setIsUploading,
    setProgress,
    setExistingBaseFileNames,
    setImageTitle,
    setMaxImages,
    setBaseFileNamesWithoutSuffix,
    setImageUploaderKey,
    onImageUrlsChange,
  }; // 의미: Setter 함수들 반환
  // 이유: 컴포넌트에서 사용 가능
};
