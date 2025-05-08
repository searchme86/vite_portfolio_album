import useImageUploadStoreSubscription from './useImageUploadStoreSubscription'; // @type {Function} - Zustand 구독 훅
// @description Zustand 상태 구독 관리
// @reason 안정적인 상태 접근

export default function useMinImages(): number {
  const minImages = useImageUploadStoreSubscription<number>(
    (state) => state.minImages || 1 // @type {number} - 최소 이미지 수
    // @description 스토어에서 최소 이미지 수 가져오기, 없으면 1
    // @reason fallback 제공
  );

  return minImages; // @type {number} - 최소 이미지 수 반환
  // @description 최소 이미지 수 반환
  // @reason 상위 사용
}
