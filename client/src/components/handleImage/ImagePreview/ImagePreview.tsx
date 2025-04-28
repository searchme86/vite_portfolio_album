// src/components/handleImage/ImagePreview/ImagePreview.jsx

// ===여기부터 수정됨====
// 1. 필요한 컴포넌트와 훅 임포트
// 2. 기능별로 분리된 컴포넌트 사용
// import { useImageUploadContext } from '../context/ImageUploadContext';
import { useImageUploadContext } from '../context/ImageUploadContext';
import { useImagePreview } from './hooks/useImagePreview';
import { useImageValidation } from './hooks/useImageValidation';
import ImageListContainerComponent from './components/ImageListContainerComponent';
import MinimumImagesWarningComponent from './components/MinimumImagesWarningComponent';

// 1. ImagePreview 컴포넌트 정의
// 2. 단일 책임: 하위 컴포넌트 조합 및 렌더링 관리
function ImagePreview() {
  // 1. useImageUploadContext 훅으로 Context 값 가져옴
  // 2. ImageUploadManager에서 Provider를 통해 전달된 값을 사용
  const { imageUrls, minImages } = useImageUploadContext();
  console.log('ImagePreview - imageUrls:', imageUrls, 'minImages:', minImages);

  // 1. 이미지 유효성 검사 훅 호출
  // 2. safeImageUrls와 safeMinImages 계산
  const { safeImageUrls, safeMinImages } = useImageValidation(
    imageUrls,
    minImages
  );

  // 1. 이미지 삭제 훅 호출
  // 2. handleRemoveImage 함수 가져오기
  const { handleRemoveImage } = useImagePreview();

  return (
    <div className="mb-4">
      <ImageListContainerComponent
        safeImageUrls={safeImageUrls}
        safeMinImages={safeMinImages}
        handleRemoveImage={handleRemoveImage}
      />
      <MinimumImagesWarningComponent
        safeImageUrlsLength={safeImageUrls.length}
        safeMinImages={safeMinImages}
      />
    </div>
  );
}

export default ImagePreview;
// ===여기까지 수정됨====
