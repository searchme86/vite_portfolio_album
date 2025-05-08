import { useMemo } from 'react'; // @type {Function} - React 훅
// @description 계산 결과를 캐싱하는 도구
// @reason 성능 최적화
import useImageUrls from './hooks/useImageUrls'; // @type {Function} - 이미지 URL 관리 훅
// @description 이미지 URL 상태 관리
// @reason 상태 분리
import useMinImages from './hooks/useMinImages'; // @type {Function} - 최소 이미지 수 관리 훅
// @description 최소 이미지 수 상태 관리
// @reason 상태 분리
import useImagePreviewEventHandling from './hooks/useImagePreviewEventHandling'; // @type {Function} - 이벤트 핸들링 훅
// @description 이벤트 처리 로직 관리
// @reason 이벤트 분리
import { useImageValidation } from './hooks/useImageValidation'; // @type {Function} - 이미지 유효성 검사 훅
// @description 이미지 데이터 검증 도구
// @reason 안전한 데이터 전달
import ImagePreviewRendering from './parts/imagePreviewRendering'; // @type {Component} - 렌더링 컴포넌트
// @description UI 렌더링 로직
// @reason 렌더링 분리

//====여기부터 수정됨====
// interface ImageItem {
//   url: string; // @type {string} - 이미지 URL
//   // @description 이미지 주소
//   // @reason 표시
//   isNew: boolean; // @type {boolean} - 새 이미지 여부
//   // @description 새 이미지인지 확인
//   // @reason 상태 관리
// }

interface ImagePreviewProps {
  imageUrl: string; // @type {string} - 이미지 URL
  // @description 사진의 인터넷 주소
  // @reason 이미지 표시
  isUploading: boolean; // @type {boolean} - 업로드 중 여부
  // @description 업로드 상태 확인
  // @reason UI 조정
}

function ImagePreview({ imageUrl, isUploading }: ImagePreviewProps) {
  // 상태 관리 훅 호출
  const imageUrls = useImageUrls(); // @type {ImageItem[]} - 이미지 URL 배열
  // @description Zustand에서 이미지 URL 가져오기
  // @reason 상태 분리
  // @why ImageItem 적용: imageUrls가 ImageItem[] 형태임을 명확히 함
  const minImages = useMinImages(); // @type {number} - 최소 이미지 수
  // @description Zustand에서 최소 이미지 수 가져오기
  // @reason 상태 분리

  // 이벤트 핸들러 훅 호출
  const { handleRemoveImage } = useImagePreviewEventHandling(); // @type {{ handleRemoveImage: (index: number) => void }} - 이벤트 핸들러
  // @description 삭제 이벤트 처리
  // @reason 사용자 행동 반영

  // 이미지 유효성 검증
  const { safeImageUrls, safeMinImages } = useMemo(() => {
    const result = useImageValidation(imageUrls, minImages); // @type {ImageValidationResult} - 검증 결과
    // @description 이미지 데이터와 최소 이미지 수 검증
    // @reason 안전한 데이터 사용
    return result ?? { safeImageUrls: [], safeMinImages: 1 }; // @type {ImageValidationResult} - fallback 값
    // @description 검증 결과가 없으면 기본값 반환
    // @reason 애플리케이션 깨짐 방지
  }, [imageUrls, minImages]); // @description 의존성 배열
  // @reason 값 변경 시 재계산

  return (
    <ImagePreviewRendering
      imageUrl={imageUrl}
      isUploading={isUploading}
      safeImageUrls={safeImageUrls}
      safeMinImages={safeMinImages}
      handleRemoveImage={handleRemoveImage}
    />
  ); // @type {JSX.Element} - 렌더링 결과
  // @description UI 렌더링 컴포넌트 호출
  // @reason 분리된 로직 재사용
}
//====여기까지 수정됨====

export default ImagePreview;
