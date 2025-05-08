import { useGetImageManagementState } from '@/stores/imageManagement/useGetImageManagementState'; // @type {Function} - 이미지 상태 가져오기 훅
// @description 이미지 상태 관리
// @reason 상태 분리

export default function useMinImages(): number {
  const minImages = useGetImageManagementState((state) => state.minImages || 1); // @type {number} - 최소 이미지 수
  // @description Zustand 스토어에서 최소 이미지 수 가져오기, 없으면 1
  // @reason fallback 제공

  return minImages; // @type {number} - 최소 이미지 수 반환
  // @description 최소 이미지 수 반환
  // @reason 상위 사용
}
