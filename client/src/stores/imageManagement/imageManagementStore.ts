// imageManagementStore: Zustand 스토어 정의
// 의미: 이미지 업로드 관련 상태 관리 스토어
// 이유: 중앙 집중식 상태 관리
import { create } from 'zustand'; // @type {Function} - Zustand 스토어 생성 함수
// @description Zustand 스토어 생성 도구
// @reason 상태 관리
import { persist, createJSONStorage } from 'zustand/middleware'; // @type {Function} - Zustand 미들웨어
// @description 상태를 영속적으로 저장
// @reason 리프레쉬 후 상태 유지
import {
  setImageUrls,
  setMinImages,
  setPostId,
  setTempFiles,
  setButtonText,
  setIsUploading,
  setProgress,
  setExistingBaseFileNames,
} from './imageManagementSetters'; // @type {Function} - 상태 setter
// @description 상태 setter 가져오기
// @reason 상태 변경
import { initialImageManagementState } from './initialImageManagementState'; // @type {Object} - 초기 상태
// @description 초기 상태 정의 가져오기
// @reason 상태 초기화

interface ImageManagementState {
  imageUrls: { url: string; isNew: boolean }[]; // @type {{ url: string; isNew: boolean }[]} - 이미지 URL 배열
  minImages: number; // @type {number} - 최소 이미지 수
  postId: string; // @type {string} - 게시물 ID
  tempFiles: File[]; // @type {File[]} - 임시 파일 배열
  buttonText: string; // @type {string} - 버튼 텍스트
  isUploading: boolean; // @type {boolean} - 업로드 진행 상태
  progress: number; // @type {number} - 업로드 진행률
  existingBaseFileNames: string[]; // @type {string[]} - 기존 파일명 배열
  setImageUrls: (urls: { url: string; isNew: boolean }[]) => void; // @type {(urls: { url: string; isNew: boolean }[]) => void}
  setMinImages: (count: number) => void; // @type {(count: number) => void}
  setPostId: (postId: string) => void; // @type {(postId: string) => void}
  setTempFiles: (tempFiles: File[]) => void; // @type {(tempFiles: File[]) => void}
  setButtonText: (buttonText: string) => void; // @type {(buttonText: string) => void}
  setIsUploading: (isUploading: boolean) => void; // @type {(isUploading: boolean) => void}
  setProgress: (progress: number) => void; // @type {(progress: number) => void}
  setExistingBaseFileNames: (fileNames: string[]) => void; // @type {(fileNames: string[]) => void}
}

export const useImageManagementStore = create<
  ImageManagementState,
  [['zustand/persist', unknown]]
>(
  persist(
    (set) => ({
      ...initialImageManagementState,
      setImageUrls: setImageUrls(set),
      setMinImages: setMinImages(set),
      setPostId: setPostId(set),
      setTempFiles: setTempFiles(set),
      setButtonText: setButtonText(set),
      setIsUploading: setIsUploading(set),
      setProgress: setProgress(set),
      setExistingBaseFileNames: setExistingBaseFileNames(set),
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
//====여기까지 수정됨====
