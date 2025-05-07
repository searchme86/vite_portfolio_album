import { create } from 'zustand';

// ImageUrl 타입 정의
export interface ImageUrl {
  url: string;
  isNew: boolean;
}

// 스토어 상태 타입 정의
interface ImageUploadState {
  imageUrls: ImageUrl[];
  progress: number;
  buttonText: string;
  tempFiles: File[];
  isUploading: boolean;
  baseFileNamesWithoutSuffix: string[];
  imageUploaderKey: string;
  postId: string;
  minImages: number;
  maxImages: number;
  setImageUrls: (urls: ImageUrl[]) => void;
  setProgress: (progress: number) => void;
  setButtonText: (text: string) => void;
  setTempFiles: (files: File[]) => void;
  setIsUploading: (isUploading: boolean) => void;
  setBaseFileNamesWithoutSuffix: (names: string[]) => void;
  setImageUploaderKey: (key: string) => void;
  setPostId: (id: string) => void;
  setMinImages: (min: number) => void;
  setMaxImages: (max: number) => void;
  onImageUrlsChange: (urls: string[]) => void;
}

// Zustand 스토어 생성
export const useImageUploadStore = create<ImageUploadState>((set) => ({
  imageUrls: [], // @type {ImageUrl[]} - 초기 이미지 URL 배열
  // @description 업로드된 이미지 URL 저장
  // @reason 이미지 미리보기 및 저장
  progress: 0, // @type {number} - 업로드 진행률
  // @description 업로드 상태 표시
  // @reason 사용자 피드백
  buttonText: 'Add a Cover Image', // @type {string} - 버튼 텍스트
  // @description 버튼 라벨 관리
  // @reason UI 업데이트
  tempFiles: [], // @type {File[]} - 임시 파일 배열
  // @description 업로드 전 파일 저장
  // @reason 파일 처리
  isUploading: false, // @type {boolean} - 업로드 중 여부
  // @description 업로드 상태 관리
  // @reason UI 비활성화
  baseFileNamesWithoutSuffix: [], // @type {string[]} - 파일 이름 배열
  // @description 파일 이름 관리
  // @reason 중복 체크
  imageUploaderKey: '', // @type {string} - 업로더 키
  // @description 업로더 식별자
  // @reason 고유성 보장
  postId: '', // @type {string} - 포스트 ID
  // @description 연관 포스트 식별
  // @reason 서버 동기화
  minImages: 1, // @type {number} - 최소 이미지 수
  // @description 최소 이미지 요구
  // @reason 유효성 검사
  maxImages: 10, // @type {number} - 최대 이미지 수
  // @description 최대 이미지 제한
  // @reason 자원 관리
  setImageUrls: (urls) => set({ imageUrls: urls }), // @type {(urls: ImageUrl[]) => void}
  // @description 이미지 URL 배열 설정
  // @reason 상태 업데이트
  setProgress: (progress) => set({ progress }), // @type {(progress: number) => void}
  // @description 진행률 설정
  // @reason 상태 업데이트
  setButtonText: (text) => set({ buttonText: text }), // @type {(text: string) => void}
  // @description 버튼 텍스트 설정
  // @reason UI 동기화
  setTempFiles: (files) => set({ tempFiles: files }), // @type {(files: File[]) => void}
  // @description 임시 파일 설정
  // @reason 파일 관리
  setIsUploading: (isUploading) => set({ isUploading }), // @type {(isUploading: boolean) => void}
  // @description 업로드 상태 설정
  // @reason UI 제어
  setBaseFileNamesWithoutSuffix: (names) =>
    set({ baseFileNamesWithoutSuffix: names }), // @type {(names: string[]) => void}
  // @description 파일 이름 배열 설정
  // @reason 중복 체크
  setImageUploaderKey: (key) => set({ imageUploaderKey: key }), // @type {(key: string) => void}
  // @description 업로더 키 설정
  // @reason 식별자 관리
  setPostId: (id) => set({ postId: id }), // @type {(id: string) => void}
  // @description 포스트 ID 설정
  // @reason 서버 연동
  setMinImages: (min) => set({ minImages: min }), // @type {(min: number) => void}
  // @description 최소 이미지 수 설정
  // @reason 유효성 관리
  setMaxImages: (max) => set({ maxImages: max }), // @type {(max: number) => void}
  // @description 최대 이미지 수 설정
  // @reason 자원 제한
  onImageUrlsChange: (urls) => console.log('Image URLs changed:', urls), // @type {(urls: string[]) => void}
  // @description 이미지 URL 변경 이벤트
  // @reason 디버깅 및 상위 전달
}));
