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
};
