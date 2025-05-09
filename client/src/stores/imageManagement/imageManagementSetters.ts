import { ImageManagementState } from './initialImageManagementState';

import type { ImageUrl } from '@/components/handleImage/utils/ImageFileType';

// 공통 SetFn 타입 정의
// 의미: Zustand의 set 함수 타입 정의
// 이유: 코드 중복 제거 및 가독성 향상
type SetFn = (
  fn: (state: ImageManagementState) => ImageManagementState
) => void;

// setImageUrls: 이미지 URL 목록 상태 업데이트
// 의미: 새로운 이미지 URL 목록으로 상태 변경
// 이유: 상태 관리
export const setImageUrls = (set: SetFn) => (urls: ImageUrl[]) =>
  set((state) => ({ ...state, imageUrls: urls || [] })); // @type {(urls: ImageUrl[]) => void}
// @description 새로운 이미지 목록으로 상태 업데이트
// @reason 상태 변경
// @fallback 빈 배열로 초기화하여 undefined 방지

// setMinImages: 최소 이미지 수 상태 업데이트
// 의미: 최소 이미지 수 설정
// 이유: 규칙 적용
export const setMinImages = (set: SetFn) => (count: number) =>
  set((state) => ({ ...state, minImages: count || 1 })); // @type {(count: number) => void}
// @description 새로운 최소 이미지 수로 상태 업데이트
// @reason 상태 변경
// @fallback 1로 초기화하여 잘못된 값 방지

// setMaxImages: 최대 이미지 수 상태 업데이트
// 의미: 최대 이미지 수 설정
// 이유: 규칙 적용
export const setMaxImages = (set: SetFn) => (max: number) =>
  set((state) => ({ ...state, maxImages: max || 10 })); // @type {(max: number) => void}
// @description 최대 이미지 수 상태 업데이트
// @reason 상태 변경
// @fallback 10으로 초기화하여 잘못된 값 방지

// setPostId: 게시물 ID 상태 업데이트
// 의미: 게시물 ID 설정
// 이유: 상태 관리
export const setPostId = (set: SetFn) => (postId: string) =>
  set((state) => ({ ...state, postId: postId || '' })); // @type {(postId: string) => void}
// @description 게시물 ID 상태 업데이트
// @reason 상태 변경
// @fallback 빈 문자열로 초기화하여 undefined 방지

// setTempFiles: 임시 파일 목록 상태 업데이트
// 의미: 임시 파일 목록 설정
// 이유: 상태 관리
export const setTempFiles = (set: SetFn) => (tempFiles: File[]) =>
  set((state) => ({ ...state, tempFiles: tempFiles || [] })); // @type {(tempFiles: File[]) => void}
// @description 임시 파일 목록 상태 업데이트
// @reason 상태 변경
// @fallback 빈 배열로 초기화하여 undefined 방지

// setButtonText: 버튼 텍스트 상태 업데이트
// 의미: 버튼 텍스트 설정
// 이유: UI 업데이트
export const setButtonText = (set: SetFn) => (buttonText: string) =>
  set((state) => ({
    ...state,
    buttonText: buttonText || 'Add a Cover Image',
  })); // @type {(buttonText: string) => void}
// @description 버튼 텍스트 상태 업데이트
// @reason 상태 변경
// @fallback 기본 텍스트로 초기화하여 빈 문자열 방지

// setIsUploading: 업로드 상태 업데이트
// 의미: 업로드 진행 상태 설정
// 이유: 상태 관리
export const setIsUploading = (set: SetFn) => (isUploading: boolean) =>
  set((state) => ({ ...state, isUploading: isUploading || false })); // @type {(isUploading: boolean) => void}
// @description 업로드 상태 업데이트
// @reason 상태 변경
// @fallback false로 초기화하여 undefined 방지

// setProgress: 진행률 상태 업데이트
// 의미: 업로드 진행률 설정
// 이유: 사용자 피드백
export const setProgress = (set: SetFn) => (progress: number) =>
  set((state) => ({
    ...state,
    progress: Number.isFinite(progress) ? progress : 0,
  })); // @type {(progress: number) => void}
// @description 진행률 상태 업데이트
// @reason 상태 변경
// @fallback 0으로 초기화하여 잘못된 값 방지

// setExistingBaseFileNames: 기존 파일명 배열 상태 업데이트
// 의미: 기존 파일명 배열 설정
// 이유: 중복 방지
export const setExistingBaseFileNames = (set: SetFn) => (fileNames: string[]) =>
  set((state) => ({ ...state, existingBaseFileNames: fileNames || [] })); // @type {(fileNames: string[]) => void}
// @description 기존 파일명 배열 상태 업데이트
// @reason 상태 변경
// @fallback 빈 배열로 초기화하여 undefined 방지

// setBaseFileNamesWithoutSuffix: 파일 이름 배열 상태 업데이트
// 의미: 파일 이름 배열 설정
// 이유: 중복 방지
export const setBaseFileNamesWithoutSuffix =
  (set: SetFn) => (names: string[]) =>
    set((state) => ({ ...state, baseFileNamesWithoutSuffix: names || [] })); // @type {(names: string[]) => void}
// @description 파일 이름 배열 상태 업데이트
// @reason 상태 변경
// @fallback 빈 배열로 초기화하여 undefined 방지

// setImageTitle: 이미지 제목 상태 업데이트
// 의미: 이미지 제목 설정
// 이유: 상태 관리
export const setImageTitle = (set: SetFn) => (title: string) =>
  set((state) => ({ ...state, imageTitle: title || '' })); // @type {(title: string) => void}
// @description 이미지 제목 상태 업데이트
// @reason 상태 변경
// @fallback 빈 문자열로 초기화하여 undefined 방지

// setImageUploaderKey: 업로더 키 상태 업데이트
// 의미: 업로더 키 설정
// 이유: 상태 관리
export const setImageUploaderKey = (set: SetFn) => (key: string) =>
  set((state) => ({ ...state, imageUploaderKey: key || '' })); // @type {(key: string) => void}
// @description 업로더 키 상태 업데이트
// @reason 상태 변경
// @fallback 빈 문자열로 초기화하여 undefined 방지

// onImageUrlsChange: 이미지 URL 변경 이벤트 핸들러
// 의미: 이미지 URL 변경 시 호출
// 이유: 디버깅 및 상위 전달
export const onImageUrlsChange = (set: SetFn) => (urls: string[]) =>
  console.log('Image URLs changed:', urls); // @type {(urls: string[]) => void}
// @description 이미지 URL 변경 이벤트 로깅
// @reason 디버깅
// @fallback 콘솔 로그로 기본 동작 제공
