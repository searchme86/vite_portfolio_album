// useGetImageManagementState: Zustand 상태 선택 훅
// 의미: Zustand 스토어에서 상태를 선택적으로 가져오기
// 이유: 상태 접근 최적화 및 불필요한 리렌더링 방지
import { useImageManagementStore } from './imageManagementStore'; // @type {Function} - Zustand 스토어
// @description 이미지 관리 스토어 접근
// @reason 상태 사용

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
  minImages: number; // @type {number} - 최소 이미지 수
  postId: string; // @type {string} - 게시물 ID
  tempFiles: File[]; // @type {File[]} - 임시 파일 배열
  buttonText: string; // @type {string} - 버튼 텍스트
  isUploading: boolean; // @type {boolean} - 업로드 진행 상태
  progress: number; // @type {number} - 업로드 진행률
  existingBaseFileNames: string[]; // @type {string[]} - 기존 파일명 배열
}

export const useGetImageManagementState = <T>(
  selector: (state: ImageManagementState) => T
): T => {
  const state = useImageManagementStore(selector); // @type {T} - 선택된 상태
  // @description 스토어에서 선택된 상태 가져오기
  // @reason 상태 추출

  return state; // @type {T} - 반환된 상태
  // @description 선택된 상태 반환
  // @reason 상위 사용
};
//====여기까지 수정됨====
