import type {
  ImageUrl,
  ImageFileName,
} from '@/components/handleImage/utils/ImageFileType';

// GetterState 인터페이스: 상태 값들 정의
// 의미: 상태 읽기 전용 속성 정의
// 이유: 역할 분리 및 타입 안정성
export interface GetterState {
  imageUrls: ImageUrl[]; // @type {ImageUrl[]} - 이미지 URL 배열
  minImages: number; // @type {number} - 최소 이미지 수
  maxImages: number; // @type {number} - 최대 이미지 수
  postId: string; // @type {string} - 게시물 ID
  tempFiles: File[]; // @type {File[]} - 임시 파일 배열
  buttonText: string; // @type {string} - 버튼 텍스트
  isUploading: boolean; // @type {boolean} - 업로드 진행 상태
  progress: number; // @type {number} - 업로드 진행률
  existingBaseFileNames: string[]; // @type {string[]} - 기존 파일명 배열
  baseFileNamesWithoutSuffix: string[]; // @type {string[]} - 파일 이름 배열
  imageTitle: ImageFileName[]; // @type {string} - 업로드된 이미지 제목
  imageUploaderKey: string; // @type {string} - 업로더 키
}

// SetterActions 인터페이스: 상태 변경 함수들 정의
// 의미: 상태 업데이트 함수 정의
// 이유: 역할 분리 및 타입 안정성
export interface SetterActions {
  setImageUrls: (urls: ImageUrl[]) => void; // @type {(urls: ImageUrl[]) => void}
  // @description 이미지 URL 목록 업데이트
  // @reason 상태 변경
  setMinImages: (count: number) => void; // @type {(count: number) => void}
  // @description 최소 이미지 수 업데이트
  // @reason 규칙 적용
  setMaxImages: (max: number) => void; // @type {(max: number) => void}
  // @description 최대 이미지 수 업데이트
  // @reason 규칙 적용
  setPostId: (postId: string) => void; // @type {(postId: string) => void}
  // @description 게시물 ID 업데이트
  // @reason 상태 변경
  setTempFiles: (tempFiles: File[]) => void; // @type {(tempFiles: File[]) => void}
  // @description 임시 파일 목록 업데이트
  // @reason 상태 변경
  setButtonText: (buttonText: string) => void; // @type {(buttonText: string) => void}
  // @description 버튼 텍스트 업데이트
  // @reason UI 변경
  setIsUploading: (isUploading: boolean) => void; // @type {(isUploading: boolean) => void}
  // @description 업로드 상태 업데이트
  // @reason 상태 변경
  setProgress: (progress: number) => void; // @type {(progress: number) => void}
  // @description 진행률 업데이트
  // @reason 사용자 피드백
  setExistingBaseFileNames: (fileNames: string[]) => void; // @type {(fileNames: string[]) => void}
  // @description 기존 파일명 배열 업데이트
  // @reason 중복 방지
  setBaseFileNamesWithoutSuffix: (names: string[]) => void; // @type {(names: string[]) => void}
  // @description 파일 이름 배열 업데이트
  // @reason 중복 방지
  setImageTitle: (name: ImageFileName[]) => void; // @type {(title: ImageFileName) => void}
  // @description 이미지 제목 업데이트
  // @reason 상태 변경
  setImageUploaderKey: (key: string) => void; // @type {(key: string) => void}
  // @description 업로더 키 업데이트
  // @reason 상태 변경
  onImageUrlsChange: (urls: string[]) => void; // @type {(urls: string[]) => void}
  // @description 이미지 URL 변경 이벤트
  // @reason 디버깅 및 상위 전달
}

// ImageManagementState 인터페이스: GetterState와 SetterActions 통합
// 의미: Zustand 스토어의 전체 상태 정의
// 이유: 타입 통합 및 관리 용이성
export interface ImageManagementState extends GetterState, SetterActions {}

// 초기 상태 객체
// 의미: Zustand 스토어의 초기 값 제공
// 이유: 상태 초기화
export const initialImageManagementState: GetterState = {
  imageUrls: [] as ImageUrl[], // @type {ImageUrl[]} - 초기 이미지 URL 배열
  // @description 초기 상태로 빈 이미지 목록
  // @reason 상태 초기화
  progress: 0, // @type {number} - 초기 진행률
  // @description 초기 상태로 진행률 0 설정
  // @reason 상태 초기화
  buttonText: 'Add a Cover Image', // @type {string} - 초기 버튼 텍스트
  // @description 초기 상태로 기본 텍스트 설정
  // @reason 사용자 인터페이스 초기화
  tempFiles: [] as File[], // @type {File[]} - 초기 임시 파일 배열
  // @description 초기 상태로 빈 파일 목록
  // @reason 상태 초기화
  isUploading: false, // @type {boolean} - 초기 업로드 상태
  // @description 초기 상태로 업로드 비활성화
  // @reason 상태 초기화
  baseFileNamesWithoutSuffix: [] as string[], // @type {string[]} - 초기 파일 이름 배열
  // @description 초기 상태로 빈 파일명 목록
  // @reason 상태 초기화
  imageUploaderKey: '', // @type {string} - 초기 업로더 키
  // @description 초기 상태로 빈 문자열
  // @reason 상태 초기화
  postId: '', // @type {string} - 초기 게시물 ID
  // @description 초기 상태로 빈 문자열
  // @reason 상태 초기화
  minImages: 1, // @type {number} - 초기 최소 이미지 수
  // @description 초기 상태로 최소 1개 설정
  // @reason 규칙 적용
  maxImages: 10, // @type {number} - 초기 최대 이미지 수
  // @description 초기 상태로 최대 10개 설정
  // @reason 규칙 적용
  existingBaseFileNames: [] as string[], // @type {string[]} - 초기 기존 파일명 배열
  // @description 초기 상태로 빈 파일명 목록
  // @reason 상태 초기화
  imageTitle: [] as ImageFileName[], // @type { name: '' } - 초기 이미지 제목
  // @description 초기 상태로 빈 문자열
  // @reason 상태 초기화
};
