// useHandleFilesChange 훅: 파일 변경 처리
// 의미: 파일 업로드 후 상태 관리
// 이유: 이벤트 핸들러 통합
import useFilterDuplicateAndDeletedUrls from './useFilterDuplicateAndDeletedUrls';
import useManageUploadState from './useManageUploadState';
import usePrepareExistingFileNames from './usePrepareExistingFileNames';

// ImageUrl 타입 가져오기 (useFilterDuplicateAndDeletedUrls에서 정의)
// 의미: 이미지 URL과 상태를 나타내는 객체
// 이유: 타입 일관성 유지
import { ImageUrl } from './useFilterDuplicateAndDeletedUrls';

function useHandleFilesChange(): {
  handleFilesChange: (
    urls: string[],
    progress: number,
    isUploading: boolean
  ) => void;
} {
  const { filterDuplicateAndDeletedUrls } = useFilterDuplicateAndDeletedUrls();
  const { manageUploadState } = useManageUploadState();
  const { prepareExistingFileNames } = usePrepareExistingFileNames();

  const handleFilesChange = (
    urls: string[],
    progress: number,
    isUploading: boolean
  ): void => {
    // 입력값 안전 처리
    const safeUrls: string[] = Array.isArray(urls) ? urls : [];
    // 의미: null/undefined 방지
    // 이유: 타입 안전성

    const safeProgress: number = Number.isFinite(progress) ? progress : 0;
    // 의미: NaN 방지
    // 이유: 진행률 안정성

    const safeIsUploading: boolean =
      typeof isUploading === 'boolean' ? isUploading : false;
    // 의미: 타입 오류 방지
    // 이유: 상태 일관성

    // 기존 URL과 파일명 준비
    const { currentUrls, existingBaseNames } = prepareExistingFileNames();
    // 의미: 중복 확인 데이터 준비
    // 이유: 필터링 전 사전 작업

    // 중복 및 삭제된 URL 필터링
    const { newUrls }: { newUrls: ImageUrl[] } = filterDuplicateAndDeletedUrls(
      safeUrls,
      currentUrls,
      existingBaseNames
    );
    // 타입: ImageUrl[]
    // 의미: 중복 및 삭제된 URL 제외
    // 이유: 상태 최적화

    // 추가: 중복 URL 필터링 강화
    const uniqueNewUrls = newUrls.filter(
      (newUrl, index, self) =>
        self.findIndex((u) => u.url === newUrl.url) === index
    );
    // 의미: newUrls 배열에서 중복 URL 제거
    // 이유: 동일한 이미지가 두 번 표시되는 문제 해결

    if (uniqueNewUrls.length > 0) {
      manageUploadState(uniqueNewUrls, safeProgress, safeIsUploading);
      // 의미: 새로운 URL로 상태 업데이트
      // 이유: UI 동기화
    }
  };

  return { handleFilesChange };
  // 의미: 파일 변경 핸들러 반환
  // 이유: 재사용 가능
}

export default useHandleFilesChange;
//====여기까지 수정됨====
