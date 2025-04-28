//====여기부터 수정됨====
// useSafeFileChangeParams 훅: 파일 변경 핸들러 인자 안전 처리
// 단일 책임: handleFilesChange 함수의 인자 안전 처리 로직 제공
function useSafeFileChangeParams() {
  // safeFileChangeParams 함수: 인자 안전 처리
  // updatedFiles, uploadedUrls, uploadProgress, uploadStatus를 안전하게 변환
  const safeFileChangeParams = (
    updatedFiles,
    uploadedUrls,
    uploadProgress,
    uploadStatus
  ) => {
    // updatedFiles가 배열인지 확인, 아니면 빈 배열로 대체
    // undefined, null, 또는 다른 타입일 경우 처리
    const safeUpdatedFiles = Array.isArray(updatedFiles) ? updatedFiles : [];
    // 디버깅: safeUpdatedFiles 확인
    // 배열이 올바르게 처리되었는지 확인
    console.log(
      'useSafeFileChangeParams - safeUpdatedFiles:',
      safeUpdatedFiles
    );

    // uploadedUrls가 배열인지 확인, 아니면 빈 배열로 대체
    // undefined, null, 또는 다른 타입일 경우 처리
    const safeUploadedUrls = Array.isArray(uploadedUrls) ? uploadedUrls : [];
    // 디버깅: safeUploadedUrls 확인
    // 배열이 올바르게 처리되었는지 확인
    console.log(
      'useSafeFileChangeParams - safeUploadedUrls:',
      safeUploadedUrls
    );

    // uploadProgress가 숫자인지 확인, 아니면 0으로 대체
    // undefined, null, 또는 다른 타입일 경우 처리
    const safeUploadProgress = Number.isFinite(uploadProgress)
      ? uploadProgress
      : 0;
    // 디버깅: safeUploadProgress 확인
    // 값이 올바르게 설정되었는지 확인
    console.log(
      'useSafeFileChangeParams - safeUploadProgress:',
      safeUploadProgress
    );

    // uploadStatus가 불리언인지 확인, 아니면 false로 대체
    // undefined, null, 또는 다른 타입일 경우 처리
    const safeUploadStatus =
      typeof uploadStatus === 'boolean' ? uploadStatus : false;
    // 디버깅: safeUploadStatus 확인
    // 값이 올바르게 설정되었는지 확인
    console.log(
      'useSafeFileChangeParams - safeUploadStatus:',
      safeUploadStatus
    );

    // 디버깅: safeFileChangeParams 호출 시 파라미터 확인
    // 파라미터가 올바르게 전달되었는지 확인
    console.log('useSafeFileChangeParams - Processed params:', {
      safeUpdatedFiles,
      safeUploadedUrls,
      safeUploadProgress,
      safeUploadStatus,
    });

    // 안전 처리된 값 반환
    // 객체 형태로 반환, 객체가 아닌 경우 기본 객체로 대체
    const result = {
      safeUpdatedFiles,
      safeUploadedUrls,
      safeUploadProgress,
      safeUploadStatus,
    };
    const safeResult =
      typeof result === 'object' && result !== null
        ? result
        : {
            safeUpdatedFiles: [],
            safeUploadedUrls: [],
            safeUploadProgress: 0,
            safeUploadStatus: false,
          };
    // 디버깅: safeResult 확인
    // 반환값이 올바른지 확인
    console.log('useSafeFileChangeParams - safeResult:', safeResult);

    return safeResult;
  };

  // safeFileChangeParams 함수 반환
  // 객체 형태로 반환
  return { safeFileChangeParams };
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default useSafeFileChangeParams;
//====여기까지 수정됨====
