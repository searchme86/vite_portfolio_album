// useManageUploadState 훅: 업로드 상태 관리
// 의미: 업로드 진행률 및 상태 관리
// 이유: UI 업데이트 지원
import { ImageUrl, useImageUploadStore } from '@/stores/imageUploadStore';

function useManageUploadState(): {
  manageUploadState: (
    newUrls: ImageUrl[],
    progress: number,
    status: boolean
  ) => void;
} {
  const { setProgress, setIsUploading, setImageUrls } = useImageUploadStore();

  // manageUploadState 함수: 상태 관리
  // 의미: 업로드 후 상태 업데이트
  // 이유: UI와 상태 동기화
  const manageUploadState = (
    newUrls: ImageUrl[],
    progress: number,
    status: boolean
  ): void => {
    const safeProgress = Number.isFinite(progress) ? progress : 0;
    // 타입: number - 안전한 진행률
    // 의미: NaN 방지
    // 이유: 진행률 계산 안정성

    setProgress(safeProgress);
    // 의미: 진행률 상태 업데이트
    // 이유: 사용자 피드백

    setIsUploading(status);
    // 의미: 업로드 상태 설정
    // 이유: UI 상태 업데이트

    // 여기까지 제대로 동작함!
    // 중요!!
    console.log('집에가기전에 확인!,newUrls', newUrls);

    if (safeProgress >= 100) {
      const updatedUrls = [
        ...(useImageUploadStore.getState().imageUrls || []),
        ...newUrls.map((item) => ({ ...item, isNew: false })),
      ];

      console.log('정말 마지막 확인! updatedUrls', updatedUrls);
      // 타입: ImageUrl[] - 최종 URL 배열
      // 의미: isNew 플래그 업데이트 및 병합
      // 이유: 업로드 완료 처리

      setImageUrls(updatedUrls);
      // 의미: URL 상태 업데이트
      // 이유: 상태 일관성 유지
    }
  };

  return { manageUploadState };
  // 타입: { manageUploadState: (newUrls: ImageUrl[], progress: number, status: boolean) => void }
  // 의미: 상태 관리 함수 반환
  // 이유: 재사용 가능성
}

export default useManageUploadState;
//====여기까지 수정됨====
