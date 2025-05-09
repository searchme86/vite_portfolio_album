import ImagePreviewRendering from './parts/imagePreviewRendering';
import { useImageValidation } from './hooks/useImageValidation';
import { useImagePreview } from './hooks/useImagePreview';
import useImageUrls from './hooks/useImageUrls';
import useMinImages from './hooks/useMinImages';
import type { ImageUrl } from '../utils/ImageFileType';

// 이미지 미리보기 컴포넌트
// 의미: 업로드된 이미지를 사용자에게 표시
// 이유: 사용자 피드백 제공 및 업로드 상태 시각화
function ImagePreview() {
  const imageUrls = useImageUrls(); // Zustand 스토어에서 이미지 URL 가져오기
  console.log('---> ImagePreview: imageUrls', imageUrls);
  // 타입: ImageUrl[] - 이미지 목록
  // 의미: 스토어에서 관리되는 이미지 URL 배열 가져오기
  // 이유: 중앙 상태 관리로 데이터 일관성 유지

  const minImages = useMinImages(); // Zustand 스토어에서 최소 이미지 수 가져오기
  // 타입: number - 최소 이미지 수
  // 의미: 스토어에서 관리되는 최소 이미지 수 가져오기
  // 이유: 규칙 적용 및 사용자 피드백 제공

  // 데이터 유효성 검증
  // 의미: 이미지 URL과 최소 이미지 수를 안전하게 처리
  // 이유: undefined나 null 방지 및 애플리케이션 안정성 확보
  const { safeImageUrls, safeMinImages } = useImageValidation(
    imageUrls,
    minImages
  );

  // 삭제 핸들러 가져오기
  // 의미: 이미지 삭제 로직을 훅에서 가져옴
  // 이유: 중복 로직 제거 및 상태 동기화
  const { handleRemoveImage } = useImagePreview();

  // 표시할 URL 처리
  // 의미: 이미지 URL을 기반으로 표시할 URL 목록 생성
  // 이유: 미리보기용 blob URL이 없으므로 서버 URL 직접 사용
  const displayUrls = safeImageUrls.map((img: ImageUrl) => img.url);
  // 현재 빈배열
  console.log('---> ImagePreview: displayUrls', displayUrls);

  return (
    <div className="flex gap-2 image-preview-container">
      {/* ImagePreviewRendering으로 이미지 렌더링 */}
      {/* 의미: 이미지 목록과 삭제 기능을 렌더링 */}
      {/* 이유: 재사용 가능한 컴포넌트로 UI 구성 */}
      <ImagePreviewRendering
        imageUrl={displayUrls[0] || ''} // 첫 번째 URL 또는 빈 문자열
        // 타입: string - 현재 이미지 URL
        // 의미: 첫 번째 이미지를 대표 URL로 사용
        // 이유: UI 일관성 유지
        isUploading={false} // 업로드 상태 하드코딩 (추후 필요 시 스토어에서 관리)
        // 타입: boolean - 업로드 중 여부
        // 의미: 현재 업로드 상태 반영
        // 이유: UI 조정 (필요 시 스토어에서 관리 가능)
        safeImageUrls={safeImageUrls}
        // 타입: ImageUrl[] - 안전한 이미지 URL 배열
        // 의미: 검증된 이미지 목록 전달
        // 이유: 안전한 데이터로 렌더링 보장
        safeMinImages={safeMinImages}
        // 타입: number - 안전한 최소 이미지 수
        // 의미: 검증된 최소 이미지 수 전달
        // 이유: 규칙 준수 및 사용자 피드백
        handleRemoveImage={handleRemoveImage}
        // 타입: (index: number) => void - 삭제 핸들러
        // 의미: 이미지 삭제 기능 전달
        // 이유: 사용자 인터랙션 처리
      />
    </div>
  );
}

export default ImagePreview;

// 동작 매커니즘:
// 1. useImageUrls로 스토어에서 imageUrls 가져오기
// 2. useMinImages로 스토어에서 최소 이미지 수 가져오기
// 3. useImageValidation으로 데이터 검증 및 안전한 값 생성
// 4. useImagePreview로 handleRemoveImage 가져오기
// 5. safeImageUrls를 기반으로 displayUrls 생성
// 6. ImagePreviewRendering에 데이터 전달하여 렌더링
