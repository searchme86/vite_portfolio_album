import useSafeFileChangeParams from './useSafeFileChangeParams';
import usePrepareExistingFileNames from './usePrepareExistingFileNames';
import useFilterDuplicateAndDeletedUrls from './useFilterDuplicateAndDeletedUrls';
import useUpdateImageUrlsAndState from './useUpdateImageUrlsAndState';

// 훅 정의
// 파일 변경 처리 로직 반환
function useHandleFilesChange() {
  // 분리된 훅 가져오기
  // 각 기능별 로직 사용
  const { safeFileChangeParams } = useSafeFileChangeParams();
  const { prepareExistingFileNames } = usePrepareExistingFileNames();
  const { filterDuplicateAndDeletedUrls } = useFilterDuplicateAndDeletedUrls();
  const { updateImageUrlsAndState } = useUpdateImageUrlsAndState();

  // handleFilesChange 함수: 업로드된 파일 처리
  // 분리된 훅을 조합하여 로직 실행
  const handleFilesChange = (
    updatedFiles,
    uploadedUrls,
    uploadProgress,
    uploadStatus
  ) => {
    // 인자 안전 처리
    // safeFileChangeParams 훅 사용
    const {
      safeUpdatedFiles,
      safeUploadedUrls,
      safeUploadProgress,
      safeUploadStatus,
    } = safeFileChangeParams(
      updatedFiles,
      uploadedUrls,
      uploadProgress,
      uploadStatus
    );
    // 반환값 타입 확인
    const validatedSafeUpdatedFiles = Array.isArray(safeUpdatedFiles)
      ? safeUpdatedFiles
      : [];
    const validatedSafeUploadedUrls = Array.isArray(safeUploadedUrls)
      ? safeUploadedUrls
      : [];
    const validatedSafeUploadProgress = Number.isFinite(safeUploadProgress)
      ? safeUploadProgress
      : 0;
    const validatedSafeUploadStatus =
      typeof safeUploadStatus === 'boolean' ? safeUploadStatus : false;
    // 디버깅: 반환값 확인
    // 반환값이 올바른지 확인
    console.log('useHandleFilesChange - safeFileChangeParams result:', {
      validatedSafeUpdatedFiles,
      validatedSafeUploadedUrls,
      validatedSafeUploadProgress,
      validatedSafeUploadStatus,
    });

    // 기존 파일명과 URL 준비
    // prepareExistingFileNames 훅 사용
    const { currentUrls, existingBaseNames } = prepareExistingFileNames();
    // 반환값 타입 확인
    const validatedCurrentUrls = Array.isArray(currentUrls) ? currentUrls : [];
    const validatedExistingBaseNames = Array.isArray(existingBaseNames)
      ? existingBaseNames
      : [];
    // 디버깅: 반환값 확인
    // 반환값이 올바른지 확인
    console.log('useHandleFilesChange - prepareExistingFileNames result:', {
      validatedCurrentUrls,
      validatedExistingBaseNames,
    });

    // 중복 및 삭제된 URL 필터링
    // filterDuplicateAndDeletedUrls 훅 사용
    const { newUrls, hasNewUrls } = filterDuplicateAndDeletedUrls(
      validatedSafeUploadedUrls,
      validatedCurrentUrls,
      validatedExistingBaseNames
    );
    // 반환값 타입 확인
    const validatedNewUrls = Array.isArray(newUrls) ? newUrls : [];
    const validatedHasNewUrls =
      typeof hasNewUrls === 'boolean' ? hasNewUrls : false;
    // 디버깅: 반환값 확인
    // 반환값이 올바른지 확인
    console.log(
      'useHandleFilesChange - filterDuplicateAndDeletedUrls result:',
      {
        validatedNewUrls,
        validatedHasNewUrls,
      }
    );

    // 새로운 URL이 없는 경우 처리 중단
    // validatedHasNewUrls 확인
    if (!validatedHasNewUrls) return;

    // 상태 업데이트 및 콜백 실행
    // updateImageUrlsAndState 훅 사용
    updateImageUrlsAndState(
      validatedNewUrls,
      validatedSafeUploadProgress,
      validatedSafeUploadStatus
    );
  };

  // handleFilesChange 함수 반환
  // 객체 형태로 반환
  return { handleFilesChange };
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default useHandleFilesChange;
//====여기까지 수정됨====
