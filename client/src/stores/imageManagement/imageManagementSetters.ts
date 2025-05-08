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
