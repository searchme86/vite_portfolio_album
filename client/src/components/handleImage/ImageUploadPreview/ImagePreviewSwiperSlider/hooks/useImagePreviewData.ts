import { useState, useEffect } from 'react';
import { useImageFilePreviewUrls } from '../../ImagePreview/hooks/useImageFilePreviewUrls';

// useImagePreviewData: 이미지 데이터 관리 훅
// 의미: 이미지 URL을 결합하고 상태 관리
// 이유: 데이터 로직 분리
function useImagePreviewData() {
  const { previewUrls, formattedImageUrls } = useImageFilePreviewUrls(); // @type {{ previewUrls: string[], formattedImageUrls: string[] }}
  // @description 미리보기 URL과 업로드된 이미지 URL 가져오기
  // @reason 외부 훅 사용
  const [images, setImages] = useState<string[]>([]); // @type {string[]}
  // @description 이미지 배열 상태
  // @reason 데이터 관리

  useEffect(() => {
    const combinedImages = [...previewUrls, ...formattedImageUrls]; // @type {string[]}
    // @description 업로드 중인 이미지와 업로드된 이미지를 결합
    // @reason 모든 이미지를 슬라이드에 표시
    setImages(combinedImages); // @type {void}
    // @description 이미지 상태 업데이트
    // @reason 렌더링 반영
  }, [previewUrls, formattedImageUrls]);

  return images; // @type {string[]}
  // @description 결합된 이미지 배열 반환
  // @reason 상위 컴포넌트 사용
}

export default useImagePreviewData;
