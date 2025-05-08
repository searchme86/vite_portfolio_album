// initialImageManagementState: 초기 상태 정의
// 의미: Zustand 스토어의 초기 상태 제공
// 이유: 스토어 초기화 및 기본값 설정

interface ImageItem {
  url: string; // @type {string} - 이미지 URL
  // @description 이미지 주소
  // @reason 표시
  isNew: boolean; // @type {boolean} - 새 이미지 여부
  // @description 새 이미지인지 확인
  // @reason 상태 관리
}

export const initialImageManagementState = {
  imageUrls: [] as ImageItem[], // @type {ImageItem[]} - 초기 이미지 URL 배열
  // @description 초기 상태로 빈 이미지 목록
  // @reason 상태 초기화
  minImages: 1, // @type {number} - 초기 최소 이미지 수
  // @description 초기 상태로 최소 1개 설정
  // @reason 규칙 적용
  postId: '', // @type {string} - 초기 게시물 ID
  // @description 초기 상태로 빈 문자열
  // @reason 상태 초기화
  tempFiles: [] as File[], // @type {File[]} - 초기 임시 파일 배열
  // @description 초기 상태로 빈 파일 목록
  // @reason 상태 초기화
  buttonText: 'Add a Cover Image', // @type {string} - 초기 버튼 텍스트
  // @description 초기 상태로 기본 텍스트 설정
  // @reason 사용자 인터페이스 초기화
  isUploading: false, // @type {boolean} - 초기 업로드 상태
  // @description 초기 상태로 업로드 비활성화
  // @reason 상태 초기화
  progress: 0, // @type {number} - 초기 진행률
  // @description 초기 상태로 진행률 0 설정
  // @reason 상태 초기화
  existingBaseFileNames: [] as string[], // @type {string[]} - 초기 기존 파일명 배열
  // @description 초기 상태로 빈 파일명 목록
  // @reason 상태 초기화
};
//====여기까지 수정됨====
