import { useGetImageManagementState } from '@/stores/imageManagement/useGetImageManagementState';

// 최소 이미지 수 가져오기 훅
// 의미: Zustand 스토어에서 최소 이미지 수 가져오기
// 이유: 중앙 상태 관리로 데이터 일관성 유지
export default function useMinImages(): number {
  const minImages = useGetImageManagementState((state) => state.minImages || 1);
  // 타입: number - 최소 이미지 수
  // 의미: Zustand 스토어에서 최소 이미지 수 가져오기, 없으면 1
  // 이유: fallback 제공 및 규칙 준수

  return minImages;
  // 타입: number - 최소 이미지 수 반환
  // 의미: 최소 이미지 수 반환
  // 이유: 상위 컴포넌트에서 사용
}
