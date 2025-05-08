import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';
import { useGetImageManagementState } from '@/stores/imageManagement/useGetImageManagementState';

// 타입 정의: ImageItem은 이미지 URL과 상태를 나타냄
// 의미: 이미지 데이터 구조 정의
// 이유: 타입 안전성 보장
interface ImageItem {
  url: string; // 타입: string - 이미지 URL
  isNew: boolean; // 타입: boolean - 새 이미지 여부
}

// 이미지 미리보기 훅
// 의미: 이미지 삭제 기능을 제공
// 이유: 재사용 가능한 로직으로 중복 제거
export const useImagePreview = () => {
  const imageUrls = useGetImageManagementState(
    (state) => state.imageUrls || []
  );
  // 타입: ImageItem[] - 이미지 URL 배열
  // 의미: Zustand 스토어에서 이미지 URL 가져오기, 없으면 빈 배열
  // 이유: 상태 접근 및 fallback 제공

  const setImageUrls = useImageManagementStore((state) => state.setImageUrls);
  // 타입: (urls: ImageItem[]) => void - 이미지 URL 설정 함수
  // 의미: Zustand 스토어에서 이미지 URL 업데이트 함수 가져오기
  // 이유: 상태 변경

  const minImages = useGetImageManagementState((state) => state.minImages || 1);
  // 타입: number - 최소 이미지 수
  // 의미: Zustand 스토어에서 최소 이미지 수 가져오기, 없으면 1
  // 이유: 규칙 적용 및 fallback 제공

  const handleRemoveImage = (index: number) => {
    if (index < 0 || index >= imageUrls.length) return;
    // 타입: void - 인덱스 유효성 검사
    // 의미: 잘못된 인덱스 방지
    // 이유: 에러 방지 및 애플리케이션 안정성

    if (imageUrls.length <= minImages) return;
    // 타입: void - 최소 이미지 수 검사
    // 의미: 최소 이미지 수 유지
    // 이유: 규칙 준수 및 사용자 경험 유지

    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    // 타입: ImageItem[] - 필터링된 이미지 목록
    // 의미: 인덱스에 해당하는 이미지 제거
    // 이유: 이미지 삭제 기능 구현

    setImageUrls(updatedUrls);
    // 타입: void - 이미지 목록 업데이트
    // 의미: 상태 변경
    // 이유: UI 반영 및 상태 동기화
  };

  return { handleRemoveImage };
  // 타입: { handleRemoveImage: (index: number) => void } - 이벤트 핸들러 반환
  // 의미: 삭제 핸들러 반환
  // 이유: 상위 컴포넌트에서 사용
};
