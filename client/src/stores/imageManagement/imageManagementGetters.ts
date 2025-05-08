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
}

export const getImageUrls = (state: ImageManagementState) =>
  state.imageUrls || []; // @type {ImageItem[]}
// @description 이미지 URL 배열 반환
// @reason 상태 접근
export const getMinImages = (state: ImageManagementState) =>
  state.minImages || 1; // @type {number}
// @description 최소 이미지 수 반환
// @reason 상태 접근
