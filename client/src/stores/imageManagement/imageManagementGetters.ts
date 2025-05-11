import { ImageManagementState } from './initialImageManagementState';

export const getImagesCount = (state: ImageManagementState) =>
  state.imagesCount || 0;
// getImageUrls: 이미지 URL 목록 반환
// 의미: 상태에서 이미지 URL 배열 추출
// 이유: 상태 접근
export const getImageUrls = (state: ImageManagementState) =>
  state.imageUrls || [];
// @description 이미지 URL 배열 반환
// @reason 상태 접근
// @fallback 빈 배열로 초기화하여 undefined 방지

// getMinImages: 최소 이미지 수 반환
// 의미: 상태에서 최소 이미지 수 추출
// 이유: 상태 접근
export const getMinImages = (state: ImageManagementState) =>
  state.minImages || 1; // @type {number}
// @description 최소 이미지 수 반환
// @reason 상태 접근
// @fallback 1로 초기화하여 잘못된 값 방지

// getMaxImages: 최대 이미지 수 반환
// 의미: 상태에서 최대 이미지 수 추출
// 이유: 상태 접근
export const getMaxImages = (state: ImageManagementState) =>
  state.maxImages || 10; // @type {number}
// @description 최대 이미지 수 반환
// @reason 상태 접근
// @fallback 10으로 초기화하여 잘못된 값 방지

// getPostId: 게시물 ID 반환
// 의미: 상태에서 게시물 ID 추출
// 이유: 상태 접근
export const getPostId = (state: ImageManagementState) => state.postId || ''; // @type {string}
// @description 게시물 ID 반환
// @reason 상태 접근
// @fallback 빈 문자열로 초기화하여 undefined 방지

// getTempFiles: 임시 파일 목록 반환
// 의미: 상태에서 임시 파일 배열 추출
// 이유: 상태 접근
export const getTempFiles = (state: ImageManagementState) =>
  state.tempFiles || []; // @type {File[]}
// @description 임시 파일 배열 반환
// @reason 상태 접근
// @fallback 빈 배열로 초기화하여 undefined 방지

// getButtonText: 버튼 텍스트 반환
// 의미: 상태에서 버튼 텍스트 추출
// 이유: 상태 접근
export const getButtonText = (state: ImageManagementState) =>
  state.buttonText || 'Add a Cover Image'; // @type {string}
// @description 버튼 텍스트 반환
// @reason 상태 접근
// @fallback 기본 텍스트로 초기화하여 빈 문자열 방지

// getIsUploading: 업로드 상태 반환
// 의미: 상태에서 업로드 진행 상태 추출
// 이유: 상태 접근
export const getIsUploading = (state: ImageManagementState) =>
  state.isUploading || false; // @type {boolean}
// @description 업로드 상태 반환
// @reason 상태 접근
// @fallback false로 초기화하여 undefined 방지

// getProgress: 진행률 반환
// 의미: 상태에서 업로드 진행률 추출
// 이유: 상태 접근
export const getProgress = (state: ImageManagementState) => state.progress || 0; // @type {number}
// @description 진행률 반환
// @reason 상태 접근
// @fallback 0으로 초기화하여 잘못된 값 방지

// getExistingBaseFileNames: 기존 파일명 배열 반환
// 의미: 상태에서 기존 파일명 배열 추출
// 이유: 상태 접근
export const getExistingBaseFileNames = (state: ImageManagementState) =>
  state.existingBaseFileNames || []; // @type {string[]}
// @description 기존 파일명 배열 반환
// @reason 상태 접근
// @fallback 빈 배열로 초기화하여 undefined 방지

// getBaseFileNamesWithoutSuffix: 파일 이름 배열 반환
// 의미: 상태에서 파일 이름 배열 추출
// 이유: 상태 접근
export const getBaseFileNamesWithoutSuffix = (state: ImageManagementState) =>
  state.baseFileNamesWithoutSuffix || []; // @type {string[]}
// @description 파일 이름 배열 반환
// @reason 상태 접근
// @fallback 빈 배열로 초기화하여 undefined 방지

// getImageTitle: 이미지 제목 반환
// 의미: 상태에서 이미지 제목 추출
// 이유: 상태 접근
export const getImageTitle = (state: ImageManagementState) =>
  state.imageTitle || []; // @type {string}
// @description 이미지 제목 반환
// @reason 상태 접근
// @fallback 빈 문자열로 초기화하여 undefined 방지

// getImageUploaderKey: 업로더 키 반환
// 의미: 상태에서 업로더 키 추출
// 이유: 상태 접근
export const getImageUploaderKey = (state: ImageManagementState) =>
  state.imageUploaderKey || ''; // @type {string}
// @description 업로더 키 반환
// @reason 상태 접근
// @fallback 빈 문자열로 초기화하여 undefined 방지
