// imageManagementSetters: 상태 변경 함수
// 의미: Zustand 스토어 상태를 안전하게 변경하기 위한 setter 함수
// 이유: 상태 변경 로직 분리 및 재사용성 강화

interface ImageItem {
  url: string; // @type {string} - 이미지 URL
  // @description 이미지 주소
  // @reason 표시
  isNew: boolean; // @type {boolean} - 새 이미지 여부
  // @description 새 이미지인지 확인
  // @reason 상태 관리
}

interface ImageManagementState {
  imageUrls: ImageItem[]; // @type {ImageItem[]} - 이미지 목록
  minImages: number; // @type {number} - 최소 이미지 수
  postId: string; // @type {string} - 게시물 ID
  tempFiles: File[]; // @type {File[]} - 임시 파일 배열
  buttonText: string; // @type {string} - 버튼 텍스트
  isUploading: boolean; // @type {boolean} - 업로드 진행 상태
  progress: number; // @type {number} - 업로드 진행률
  existingBaseFileNames: string[]; // @type {string[]} - 기존 파일명 배열
}

export const setImageUrls =
  (set: (fn: (state: ImageManagementState) => ImageManagementState) => void) =>
  (urls: ImageItem[]) =>
    set((state) => ({ ...state, imageUrls: urls || [] })); // @type {(urls: ImageItem[]) => void}
// @description 새로운 이미지 목록으로 상태 업데이트
// @reason 상태 변경

export const setMinImages =
  (set: (fn: (state: ImageManagementState) => ImageManagementState) => void) =>
  (count: number) =>
    set((state) => ({ ...state, minImages: count || 1 })); // @type {(count: number) => void}
// @description 새로운 최소 이미지 수로 상태 업데이트
// @reason 상태 변경

export const setPostId =
  (set: (fn: (state: ImageManagementState) => ImageManagementState) => void) =>
  (postId: string) =>
    set((state) => ({ ...state, postId: postId || '' })); // @type {(postId: string) => void}
// @description 게시물 ID 상태 업데이트
// @reason 상태 변경

export const setTempFiles =
  (set: (fn: (state: ImageManagementState) => ImageManagementState) => void) =>
  (tempFiles: File[]) =>
    set((state) => ({ ...state, tempFiles: tempFiles || [] })); // @type {(tempFiles: File[]) => void}
// @description 임시 파일 목록 상태 업데이트
// @reason 상태 변경

export const setButtonText =
  (set: (fn: (state: ImageManagementState) => ImageManagementState) => void) =>
  (buttonText: string) =>
    set((state) => ({
      ...state,
      buttonText: buttonText || 'Add a Cover Image',
    })); // @type {(buttonText: string) => void}
// @description 버튼 텍스트 상태 업데이트
// @reason 상태 변경

export const setIsUploading =
  (set: (fn: (state: ImageManagementState) => ImageManagementState) => void) =>
  (isUploading: boolean) =>
    set((state) => ({ ...state, isUploading: isUploading || false })); // @type {(isUploading: boolean) => void}
// @description 업로드 상태 업데이트
// @reason 상태 변경

export const setProgress =
  (set: (fn: (state: ImageManagementState) => ImageManagementState) => void) =>
  (progress: number) =>
    set((state) => ({
      ...state,
      progress: Number.isFinite(progress) ? progress : 0,
    })); // @type {(progress: number) => void}
// @description 진행률 상태 업데이트
// @reason 상태 변경

export const setExistingBaseFileNames =
  (set: (fn: (state: ImageManagementState) => ImageManagementState) => void) =>
  (fileNames: string[]) =>
    set((state) => ({ ...state, existingBaseFileNames: fileNames || [] })); // @type {(fileNames: string[]) => void}
// @description 기존 파일명 배열 상태 업데이트
// @reason 상태 변경
//====여기까지 수정됨====
