// useImageUploadState 훅: 이미지 업로드 관련 상태 관리
// 단일 책임: 상태 초기화 및 관리 로직 제공
import { useState } from 'react';

function useImageUploadState({ initialImageUrls }) {
  // initialImageUrls가 배열인지 확인, 아니면 빈 배열로 대체
  // map 오류 방지
  const safeInitialImageUrls = Array.isArray(initialImageUrls)
    ? initialImageUrls.map((url) =>
        url ? { url, isNew: false } : { url: '', isNew: false }
      )
    : [];
  // 디버깅: safeInitialImageUrls 확인
  // 배열이 올바르게 처리되었는지 확인
  console.log(
    'useImageUploadState - safeInitialImageUrls:',
    safeInitialImageUrls
  );

  // 이미지 URL 상태: { url: string, isNew: boolean } 형태의 배열
  // 이미지 미리보기와 업로드 상태 관리
  const [imageUrls, setImageUrls] = useState(safeInitialImageUrls);
  // imageUrls가 배열인지 확인
  const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];
  // 디버깅: safeImageUrls 확인
  // 상태가 올바르게 설정되었는지 확인
  console.log('useImageUploadState - safeImageUrls:', safeImageUrls);

  // setImageUrls가 함수인지 확인
  const safeSetImageUrls =
    typeof setImageUrls === 'function' ? setImageUrls : () => {};
  // 디버깅: safeSetImageUrls 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log('useImageUploadState - safeSetImageUrls:', safeSetImageUrls);

  // 업로드 진행률 상태
  // 프로그래스바 표시용
  const [progress, setProgress] = useState(0);
  // progress가 숫자인지 확인
  const safeProgress = Number.isFinite(progress) ? progress : 0;
  // 디버깅: safeProgress 확인
  // 상태가 올바르게 설정되었는지 확인
  console.log('useImageUploadState - safeProgress:', safeProgress);

  // setProgress가 함수인지 확인
  const safeSetProgress =
    typeof setProgress === 'function' ? setProgress : () => {};
  // 디버깅: safeSetProgress 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log('useImageUploadState - safeSetProgress:', safeSetProgress);

  // 버튼 텍스트 상태
  // 업로드 상태에 따라 텍스트 변경
  const [buttonText, setButtonText] = useState(
    safeInitialImageUrls.length > 0 ? 'Update' : 'Add a Cover Image'
  );
  // buttonText가 문자열인지 확인
  const safeButtonText =
    typeof buttonText === 'string' ? buttonText : 'Add a Cover Image';
  // 디버깅: safeButtonText 확인
  // 상태가 올바르게 설정되었는지 확인
  console.log('useImageUploadState - safeButtonText:', safeButtonText);

  // setButtonText가 함수인지 확인
  const safeSetButtonText =
    typeof setButtonText === 'function' ? setButtonText : () => {};
  // 디버깅: safeSetButtonText 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log('useImageUploadState - safeSetButtonText:', safeSetButtonText);

  // 임시 파일 리스트 상태
  // 업로드 전 파일 저장
  const [tempFiles, setTempFiles] = useState([]);
  // tempFiles가 배열인지 확인
  const safeTempFiles = Array.isArray(tempFiles) ? tempFiles : [];
  // 디버깅: safeTempFiles 확인
  // 상태가 올바르게 설정되었는지 확인
  console.log('useImageUploadState - safeTempFiles:', safeTempFiles);

  // setTempFiles가 함수인지 확인
  const safeSetTempFiles =
    typeof setTempFiles === 'function' ? setTempFiles : () => {};
  // 디버깅: safeSetTempFiles 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log('useImageUploadState - safeSetTempFiles:', safeSetTempFiles);

  // 업로드 중 상태
  // 업로드 상태 추적 및 UI 업데이트
  const [isUploading, setIsUploading] = useState(false);
  // isUploading이 불리언인지 확인
  const safeIsUploading =
    typeof isUploading === 'boolean' ? isUploading : false;
  // 디버깅: safeIsUploading 확인
  // 상태가 올바르게 설정되었는지 확인
  console.log('useImageUploadState - safeIsUploading:', safeIsUploading);

  // setIsUploading이 함수인지 확인
  const safeSetIsUploading =
    typeof setIsUploading === 'function' ? setIsUploading : () => {};
  // 디버깅: safeSetIsUploading 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log('useImageUploadState - safeSetIsUploading:', safeSetIsUploading);

  // 상태와 함수 반환
  // 객체 형태로 반환
  return {
    imageUrls: safeImageUrls,
    setImageUrls: safeSetImageUrls,
    progress: safeProgress,
    setProgress: safeSetProgress,
    buttonText: safeButtonText,
    setButtonText: safeSetButtonText,
    tempFiles: safeTempFiles,
    setTempFiles: safeSetTempFiles,
    isUploading: safeIsUploading,
    setIsUploading: safeSetIsUploading,
  };
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default useImageUploadState;
