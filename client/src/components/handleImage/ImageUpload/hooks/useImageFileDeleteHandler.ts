import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

// useImageFileDeleteHandler: 파일 삭제 핸들러 훅
// 의미: 이미지와 제목을 삭제하는 로직 처리
// 이유: 재사용성과 코드 분리
function useImageFileDeleteHandler() {
  const {
    imageUrls,
    imageTitle,
    setProgress,
    setIsUploading,
    setImageUrls,
    setImageTitle,
  } = useImageManagementStore();

  // handleDeleteFile: 이미지와 제목 삭제
  // 의미: 주어진 인덱스의 이미지와 제목 제거
  // 이유: 데이터 동기화 유지
  const handleDeleteFile = (index: number) => {
    if (index < 0 || index >= imageUrls.length) return;
    // 의미: 인덱스 유효성 검사
    // 이유: 잘못된 인덱스로 인한 오류 방지

    if (imageUrls.length <= 1) return;
    // 의미: 최소 이미지 개수 유지
    // 이유: UI 일관성 보장

    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    // 의미: 삭제할 인덱스 제외한 새 이미지 배열 생성
    // 이유: 상태 업데이트를 위해 불변성 유지

    const newImageTitles = imageTitle.filter((_, i) => i !== index);
    // 의미: 삭제할 인덱스 제외한 새 제목 배열 생성
    // 이유: 이미지와 제목 동기화

    setProgress(0);
    // 의미: 진행률 초기화
    // 이유: 삭제 후 업로드 상태 초기화

    setIsUploading(false);
    // 의미: 업로드 상태 종료
    // 이유: 삭제 후 업로드 상태 초기화

    setImageUrls(newImageUrls);
    // 의미: 새로운 이미지 배열로 상태 업데이트
    // 이유: UI 반영

    setImageTitle(newImageTitles);
    // 의미: 새로운 제목 배열로 상태 업데이트
    // 이유: UI 반영
  };

  return handleDeleteFile;
}

export default useImageFileDeleteHandler;
