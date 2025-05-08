// imageManagementGetters: 상태 접근 함수
// 의미: Zustand 스토어 상태를 안전하게 가져오기 위한 getter 함수
// 이유: 상태 접근 로직 분리 및 재사용성 강화

interface ImageItem {
  url: string; // @type {string} - 이미지 URL
  // @description 이미지 주소
  // @reason 표시
  isNew: boolean; // @type {boolean} - 새 이미지 여부
  // @description 새 이미지인지 확인
  // @reason 상태 관리
}

interface ImageManagementState {
  imageUrls: ImageItem[]; // @type {ImageItem[]} - 이미지 URL 배열
  // @description 스토어에서 관리되는 이미지 목록
  // @reason 상태 구조화
  minImages: number; // @type {number} - 최소 이미지 수
  // @description 스토어에서 관리되는 최소 이미지 수
  // @reason 규칙 적용
  postId: string; // @type {string} - 게시물 ID
  // @description 현재 게시물 식별자
  // @reason 업로드 요청 시 사용
  tempFiles: File[]; // @type {File[]} - 임시 파일 배열
  // @description 업로드 전 임시 파일 목록
  // @reason 미리보기 제공
  buttonText: string; // @type {string} - 버튼 텍스트
  // @description 업로드 버튼의 표시 텍스트
  // @reason 사용자 인터페이스 커스터마이징
  isUploading: boolean; // @type {boolean} - 업로드 진행 상태
  // @description 업로드 중인지 여부
  // @reason UI 상태 관리
  progress: number; // @type {number} - 업로드 진행률
  // @description 업로드 진행 상태 표시
  // @reason 사용자 피드백
  existingBaseFileNames: string[]; // @type {string[]} - 기존 파일명 배열
  // @description 중복 확인용 기존 파일명
  // @reason 중복 파일 업로드 방지
}

export const getImageUrls = (state: ImageManagementState): ImageItem[] =>
  state.imageUrls || []; // @type {ImageItem[]}
// @description 이미지 URL 배열 반환
// @reason 상태 접근

export const getMinImages = (state: ImageManagementState): number =>
  state.minImages || 1; // @type {number}
// @description 최소 이미지 수 반환
// @reason 상태 접근

export const getPostId = (state: ImageManagementState): string =>
  state.postId || ''; // @type {string}
// @description 게시물 ID 반환
// @reason 상태 접근

export const getTempFiles = (state: ImageManagementState): File[] =>
  state.tempFiles || []; // @type {File[]}
// @description 임시 파일 배열 반환
// @reason 상태 접근

export const getButtonText = (state: ImageManagementState): string =>
  state.buttonText || 'Add a Cover Image'; // @type {string}
// @description 버튼 텍스트 반환
// @reason 상태 접근

export const getIsUploading = (state: ImageManagementState): boolean =>
  state.isUploading || false; // @type {boolean}
// @description 업로드 상태 반환
// @reason 상태 접근

export const getProgress = (state: ImageManagementState): number =>
  state.progress || 0; // @type {number}
// @description 진행률 반환
// @reason 상태 접근

export const getExistingBaseFileNames = (
  state: ImageManagementState
): string[] => state.existingBaseFileNames || []; // @type {string[]}
// @description 기존 파일명 배열 반환
// @reason 상태 접근
//====여기까지 수정됨====
