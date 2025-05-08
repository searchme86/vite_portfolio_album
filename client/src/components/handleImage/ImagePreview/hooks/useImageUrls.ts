import useImageUploadStoreSubscription from './useImageUploadStoreSubscription'; // @type {Function} - Zustand 구독 훅
// @description Zustand 상태 구독 관리
// @reason 안정적인 상태 접근

//====여기부터 수정됨====
interface ImageItem {
  url: string; // @type {string} - 이미지 URL
  // @description 이미지 주소
  // @reason 표시
  isNew: boolean; // @type {boolean} - 새 이미지 여부
  // @description 새 이미지인지 확인
  // @reason 상태 관리
}

export default function useImageUrls(): ImageItem[] {
  const imageUrls = useImageUploadStoreSubscription<ImageItem[]>(
    (state) => state.imageUrls || [] // @type {ImageItem[]} - 이미지 URL 배열
    // @description 스토어에서 이미지 URL 가져오기, 없으면 빈 배열
    // @reason fallback 제공
  );

  return imageUrls; // @type {ImageItem[]} - 이미지 URL 배열 반환
  // @description 이미지 URL 반환
  // @reason 상위 사용
  // @why ImageItem 사용: 타입 안전성을 보장하고, Zustand 스토어에서 반환되는 데이터 구조를 명확히 정의
}
//====여기까지 수정됨====
