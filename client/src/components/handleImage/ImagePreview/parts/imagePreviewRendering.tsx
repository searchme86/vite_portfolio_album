import ImageListContainerComponent from './ImageListContainerComponent';
import MinimumImagesWarningComponent from './MinimumImagesWarningComponent';

// 의미: 이미지 데이터 구조 정의
// 이유: 타입 안전성 보장
interface ImagePreviewRenderingProps {
  imageUrl: string; // 타입: string - 현재 이미지 URL
  // 의미: 현재 이미지 주소
  // 이유: 표시
  isUploading: boolean; // 타입: boolean - 업로드 중 여부
  // 의미: 업로드 상태
  // 이유: UI 조정
  safeImageUrls: { url: string; isNew: boolean }[]; // 타입: { url: string; isNew: boolean }[] - 이미지 URL 배열
  // 의미: 검증된 이미지 목록
  // 이유: 표시
  safeMinImages: number; // 타입: number - 최소 이미지 수
  // 의미: 최소 이미지 수
  // 이유: 규칙 적용
  handleRemoveImage: (index: number) => void; // 타입: (index: number) => void - 삭제 핸들러
  // 의미: 인덱스 기반 삭제
  // 이유: 사용자 행동 처리
}

// 이미지 미리보기 렌더링 컴포넌트
// 의미: 이미지 목록과 경고 메시지를 렌더링
// 이유: 사용자 경험 개선
function ImagePreviewRendering({
  imageUrl,
  isUploading,
  safeImageUrls,
  safeMinImages,
  handleRemoveImage,
}: ImagePreviewRenderingProps) {
  // 값이 없음
  console.log('ImagePreviewRendering: imageUrl', imageUrl);
  // 빈배열:[]
  console.log('ImagePreviewRendering: safeImageUrls', safeImageUrls);
  return (
    <div className="mb-4">
      <ImageListContainerComponent
        imageUrl={imageUrl}
        isUploading={isUploading}
        safeImageUrls={safeImageUrls}
        safeMinImages={safeMinImages}
        handleRemoveImage={handleRemoveImage}
      />
      {/* 의미: 이미지 목록 렌더링 */}
      {/* 이유: 사용자에게 이미지 표시 */}
      <MinimumImagesWarningComponent
        safeImageUrlsLength={safeImageUrls.length}
        safeMinImages={safeMinImages}
      />
      {/* 의미: 최소 이미지 경고 렌더링 */}
      {/* 이유: 사용자에게 경고 표시 */}
    </div>
  );
  // 타입: JSX.Element - 렌더링 결과
  // 의미: UI 반환
  // 이유: 화면 표시
}

export default ImagePreviewRendering;
