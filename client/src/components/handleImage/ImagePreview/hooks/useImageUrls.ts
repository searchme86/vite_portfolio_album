import { useGetImageManagementState } from '@/stores/imageManagement/useGetImageManagementState';

import type { ImageUrl } from '../../utils/ImageFileType';

// 이미지 URL 가져오기 훅
// 의미: Zustand 스토어에서 이미지 URL 목록 가져오기
// 이유: 중앙 상태 관리로 데이터 일관성 유지
export default function useImageUrls(): ImageUrl[] {
  const imageUrls = useGetImageManagementState(
    (state) => state.imageUrls || []
  );
  // 타입: ImageUrl[] - 이미지 URL 배열
  // 의미: Zustand 스토어에서 이미지 URL 가져오기, 없으면 빈 배열
  // 이유: fallback 제공 및 애플리케이션 안정성

  return imageUrls;
  // 타입: ImageUrl[] - 이미지 URL 배열 반환
  // 의미: 이미지 URL 반환
  // 이유: 상위 컴포넌트에서 사용
}
