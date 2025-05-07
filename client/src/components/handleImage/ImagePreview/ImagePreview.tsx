//====여기부터 수정됨====
import { useMemo, useCallback } from 'react'; // @type {Function} - React 훅
// @description 계산 결과를 캐싱하고 함수를 안정화하는 도구
// @reason 성능 최적화 및 무한 루프 방지
import { useImageUploadStore } from '@/stores/imageUploadStore'; // @type {Function} - Zustand 스토어 훅
// @description 이미지 업로드 상태를 관리하는 상자
// @reason 영속적 데이터 참조
import { useImageValidation } from './hooks/useImageValidation'; // @type {Function} - 이미지 유효성 검사 훅
// @description 이미지 데이터 검증 도구
// @reason 안전한 데이터 전달
import ImageListContainerComponent from './parts/ImageListContainerComponent'; // @type {Component} - 이미지 목록 컨테이너 컴포넌트
// @description 이미지 목록을 보여주는 친구
// @reason 이미지 표시 UI
import MinimumImagesWarningComponent from './parts/MinimumImagesWarningComponent'; // @type {Component} - 최소 이미지 경고 컴포넌트
// @description 최소 이미지 수를 확인하는 경고창
// @reason 사용자 피드백 제공

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
  // Zustand 스토어에서 상태를 최상단에서 안정적으로 가져옴
  const selectImageUploadStore = useCallback(
    (state: any) => ({
      imageUrls: state.imageUrls, // @type {{ url: string; isNew: boolean }[]} - 이미지 URL 배열
      // @description 스토어에서 이미지 URL 가져오기
      // @reason 상태 관리
      minImages: state.minImages, // @type {number} - 최소 이미지 수
      // @description 스토어에서 최소 이미지 수 가져오기
      // @reason 상태 관리
    }),
    []
  ); // @description 빈 의존성 배열
  // @reason selector 안정화

  const imageUploadStore = useImageUploadStore(selectImageUploadStore); // @type {Object} - Zustand 스토어 데이터
  // @description 안정화된 selector로 상태 선택
  // @reason 불필요한 리렌더링 방지

  // 디버깅 로그: 스토어 데이터 확인
  console.log(
    'ImagePreview - imageUrls:',
    imageUploadStore.imageUrls,
    'minImages:',
    imageUploadStore.minImages
  ); // @type {void} - 디버깅 로그
  // @description 스토어 데이터 출력
  // @reason 데이터 확인
  // @analogy 도서관에서 목록 점검

  // useMemo로 safeImageUrls와 safeMinImages 캐싱
  const { safeImageUrls, safeMinImages } = useMemo(() => {
    const result = useImageValidation(
      imageUploadStore.imageUrls,
      imageUploadStore.minImages
    ); // @type {Object} - 검증 결과
    // @description 이미지 데이터와 최소 이미지 수 검증
    // @reason 안전한 데이터 사용
    return result ?? { safeImageUrls: [], safeMinImages: 1 }; // @type {Object} - fallback 값
    // @description 검증 결과가 없으면 기본값 반환
    // @reason 애플리케이션 깨짐 방지
  }, [imageUploadStore.imageUrls, imageUploadStore.minImages]); // @description 의존성 배열
  // @reason 값 변경 시 재계산

  // useCallback으로 handleRemoveImage 안정화
  const handleRemoveImage = useCallback(
    (index: number) => {
      onDelete(index); // @type {void} - 상위 컴포넌트로 인덱스 기반 삭제 요청 위임
      // @description 인덱스로 상태 변경 로직 위임
      // @reason 무한 루프 방지
    },
    [onDelete] // @description 의존성 배열
    // @reason onDelete 변경 시 함수 재생성
  );

  return (
    <div className="mb-4">
      <ImageListContainerComponent
        imageUrl={imageUrl} // @type {string} - 현재 이미지 URL
        // @description 현재 이미지 URL 전달
        // @reason 이미지 표시
        isUploading={isUploading} // @type {boolean} - 업로드 상태
        // @description 업로드 중인지 전달
        // @reason UI 조정
        safeImageUrls={safeImageUrls} // @type {{ url: string; isNew: boolean }[]} - 검증된 이미지 URL
        // @description 검증된 이미지 목록 전달
        // @reason 표시
        safeMinImages={safeMinImages} // @type {number} - 검증된 최소 이미지 수
        // @description 검증된 최소 이미지 수 전달
        // @reason 규칙 적용
        handleRemoveImage={handleRemoveImage} // @type {(index: number) => void} - 삭제 핸들러
        // @description 인덱스로 이미지 삭제 함수 전달
        // @reason 사용자 행동 처리
      />
      {/* @description 이미지 목록 렌더링 */}
      {/* @reason 사용자에게 이미지 표시 */}
      <MinimumImagesWarningComponent
        safeImageUrlsLength={safeImageUrls.length} // @type {number} - 이미지 개수
        // @description 현재 이미지 개수 전달
        // @reason 경고 확인
        safeMinImages={safeMinImages} // @type {number} - 최소 이미지 수
        // @description 최소 이미지 수 전달
        // @reason 경고 확인
      />
      {/* @description 최소 이미지 경고 렌더링 */}
      {/* @reason 사용자에게 경고 표시 */}
    </div>
  );
}

export default ImagePreview;
//====여기까지 수정됨====
