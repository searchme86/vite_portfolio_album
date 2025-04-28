//====여기부터 수정됨====
// useUploadProgress 훅: 업로드 진행 상태 관리
// 단일 책임: 업로드 진행률 계산 및 상태 관리
import { useState } from 'react';

// 훅 정의
// 업로드 진행 상태와 상태 메시지 관리
function useUploadProgress() {
  // 업로드 진행률 상태
  // 0~100 사이의 값
  const [uploadProgress, setUploadProgress] = useState(0);
  // uploadProgress가 숫자인지 확인
  const safeUploadProgress = Number.isFinite(uploadProgress)
    ? uploadProgress
    : 0;
  // 디버깅: safeUploadProgress 확인
  // 상태가 올바르게 설정되었는지 확인
  console.log('useUploadProgress - safeUploadProgress:', safeUploadProgress);

  // 업로드 상태 메시지
  // 업로드 상태를 사용자에게 알림
  const [uploadStatus, setUploadStatus] = useState('');
  // uploadStatus가 문자열인지 확인
  const safeUploadStatus = typeof uploadStatus === 'string' ? uploadStatus : '';
  // 디버깅: safeUploadStatus 확인
  // 상태가 올바르게 설정되었는지 확인
  console.log('useUploadProgress - safeUploadStatus:', safeUploadStatus);

  // setUploadProgress가 함수인지 확인
  const safeSetUploadProgress =
    typeof setUploadProgress === 'function' ? setUploadProgress : () => {};
  // 디버깅: safeSetUploadProgress 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log(
    'useUploadProgress - safeSetUploadProgress:',
    safeSetUploadProgress
  );

  // setUploadStatus가 함수인지 확인
  const safeSetUploadStatus =
    typeof setUploadStatus === 'function' ? setUploadStatus : () => {};
  // 디버깅: safeSetUploadStatus 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log('useUploadProgress - safeSetUploadStatus:', safeSetUploadStatus);

  // 업로드 진행률 계산 함수
  // progressEvent, uploadedFiles, totalFiles를 받아 진행률 계산
  const calculateProgress = (progressEvent, uploadedFiles, totalFiles) => {
    // progressEvent가 객체인지 확인
    const safeProgressEvent =
      typeof progressEvent === 'object' && progressEvent !== null
        ? progressEvent
        : {};
    // 디버깅: safeProgressEvent 확인
    // 객체가 올바르게 처리되었는지 확인
    console.log('useUploadProgress - safeProgressEvent:', safeProgressEvent);

    // progressEvent.loaded가 숫자인지 확인
    const loaded = Number.isFinite(safeProgressEvent.loaded)
      ? safeProgressEvent.loaded
      : 0;
    // 디버깅: loaded 확인
    // 값이 올바르게 설정되었는지 확인
    console.log('useUploadProgress - loaded:', loaded);

    // progressEvent.total이 숫자인지 확인
    const total = Number.isFinite(safeProgressEvent.total)
      ? safeProgressEvent.total
      : 0;
    // 디버깅: total 확인
    // 값이 올바르게 설정되었는지 확인
    console.log('useUploadProgress - total:', total);

    // uploadedFiles가 숫자인지 확인
    const safeUploadedFiles = Number.isFinite(uploadedFiles)
      ? uploadedFiles
      : 0;
    // 디버깅: safeUploadedFiles 확인
    // 값이 올바르게 설정되었는지 확인
    console.log('useUploadProgress - safeUploadedFiles:', safeUploadedFiles);

    // totalFiles가 숫자인지 확인
    const safeTotalFiles = Number.isFinite(totalFiles) ? totalFiles : 0;
    // 디버깅: safeTotalFiles 확인
    // 값이 올바르게 설정되었는지 확인
    console.log('useUploadProgress - safeTotalFiles:', safeTotalFiles);

    // 진행률 계산
    // total이 0이 아닌 경우에만 계산
    const progress = total > 0 ? Math.round((loaded * 100) / total) : 0;
    // progress가 숫자인지 확인
    const safeProgress = Number.isFinite(progress) ? progress : 0;
    // 디버깅: safeProgress 확인
    // 진행률이 올바르게 계산되었는지 확인
    console.log('useUploadProgress - safeProgress:', safeProgress);

    // 전체 진행률 계산
    // safeTotalFiles가 0이 아닌 경우에만 계산
    const overallProgress =
      safeTotalFiles > 0
        ? Math.round(
            (safeUploadedFiles / safeTotalFiles) * 100 * (safeProgress / 100)
          )
        : 0;
    // overallProgress가 숫자인지 확인
    const safeOverallProgress = Number.isFinite(overallProgress)
      ? overallProgress
      : 0;
    // 디버깅: safeOverallProgress 확인
    // 전체 진행률이 올바르게 계산되었는지 확인
    console.log(
      'useUploadProgress - safeOverallProgress:',
      safeOverallProgress
    );

    // 진행률 업데이트
    // 상태 변경
    safeSetUploadProgress(safeOverallProgress);
  };

  // 디버깅: 상태 값 확인
  // 상태가 올바르게 업데이트되었는지 확인
  console.log('useUploadProgress - Final uploadProgress:', safeUploadProgress);
  console.log('useUploadProgress - Final uploadStatus:', safeUploadStatus);

  // 상태와 함수 반환
  // 객체 형태로 반환
  return {
    uploadProgress: safeUploadProgress,
    setUploadProgress: safeSetUploadProgress,
    uploadStatus: safeUploadStatus,
    setUploadStatus: safeSetUploadStatus,
    calculateProgress,
  };
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default useUploadProgress;
//====여기까지 수정됨====
