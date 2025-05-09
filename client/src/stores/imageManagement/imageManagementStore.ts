import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  setImageUrls,
  setMinImages,
  setPostId,
  setTempFiles,
  setButtonText,
  setIsUploading,
  setProgress,
  setExistingBaseFileNames,
  setImageTitle,
  setImageUploaderKey,
  setMaxImages,
  setBaseFileNamesWithoutSuffix,
  onImageUrlsChange,
} from './imageManagementSetters'; // @type {Function} - 상태 setter
// @description 상태 변경 함수 임포트
// @reason 상태 관리 분리

import {
  ImageManagementState,
  initialImageManagementState,
} from './initialImageManagementState'; // @type {Object} - 초기 상태
// @description 초기 상태와 타입 임포트
// @reason 타입 안정성 및 초기화

// Zustand 스토어 생성
export const useImageManagementStore = create<
  ImageManagementState,
  [['zustand/persist', unknown]]
>(
  persist(
    (set) => ({
      ...initialImageManagementState,
      setImageUrls: setImageUrls(set),
      setMinImages: setMinImages(set),
      setMaxImages: setMaxImages(set),
      setPostId: setPostId(set),
      setTempFiles: setTempFiles(set),
      setButtonText: setButtonText(set),
      setIsUploading: setIsUploading(set),
      setProgress: setProgress(set),
      setExistingBaseFileNames: setExistingBaseFileNames(set),
      setBaseFileNamesWithoutSuffix: setBaseFileNamesWithoutSuffix(set),
      setImageTitle: setImageTitle(set),
      setImageUploaderKey: setImageUploaderKey(set),
      onImageUrlsChange: onImageUrlsChange(set),
    }),
    {
      name: 'image-management-store', // @type {string} - 스토리지 키
      // @description localStorage에 저장될 키 이름
      // @reason 상태 영속성
      storage: createJSONStorage(() => localStorage), // @type {Storage} - 스토리지 타입
      // @description localStorage 사용
      // @reason 브라우저 리프레쉬 후 상태 복원
    }
  )
);
