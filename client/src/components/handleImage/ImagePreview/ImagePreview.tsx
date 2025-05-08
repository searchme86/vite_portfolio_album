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
import ImagePreviewRendering from './parts/ImagePreviewRendering'; // @type {Component} - 렌더링 컴포넌트
// @description UI 렌더링 로직
// @reason 렌더링 분리

interface ImagePreviewProps {
  imageUrl: string; // @type {string} - 이미지 URL
  // @description 사진의 인터넷 주소
  // @reason 이미지 표시
  onDelete: (index: number) => void; // @type {(index: number) => void} - 삭제 핸들러
  // @description 인덱스로 사진을 지우는 함수
  // @reason 사용자 행동 처리
  isUploading: boolean; // @type {boolean} - 업로드 중 여부
  // @description 업로드 상태 확인
  // @reason UI 조정
}

function ImagePreview({ imageUrl, onDelete, isUploading }: ImagePreviewProps) {
  // 상태 관리 훅 호출
  const imageUrls = useImageUrls(); // @type {{ url: string; isNew: boolean }[]} - 이미지 URL 배열
  // @description Zustand에서 이미지 URL 가져오기
  // @reason 상태 분리
  const minImages = useMinImages(); // @type {number} - 최소 이미지 수
  // @description Zustand에서 최소 이미지 수 가져오기
  // @reason 상태 분리

  // 이벤트 핸들러 훅 호출
  const { handleRemoveImage } = useImagePreviewEventHandling(onDelete); // @type {{ handleRemoveImage: (index: number) => void }} - 이벤트 핸들러
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

export default ImagePreview;
