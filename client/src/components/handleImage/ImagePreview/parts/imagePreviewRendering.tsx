import ImageListContainerComponent from './ImageListContainerComponent'; // @type {Component} - 이미지 목록 컨테이너
// @description 이미지 목록 렌더링
// @reason UI 구성
import MinimumImagesWarningComponent from './MinimumImagesWarningComponent'; // @type {Component} - 최소 이미지 경고
// @description 최소 이미지 경고 렌더링
// @reason 사용자 피드백

interface ImagePreviewRenderingProps {
  imageUrl: string; // @type {string} - 현재 이미지 URL
  // @description 현재 이미지 주소
  // @reason 표시
  isUploading: boolean; // @type {boolean} - 업로드 중 여부
  // @description 업로드 상태
  // @reason UI 조정
  safeImageUrls: { url: string; isNew: boolean }[]; // @type {{ url: string; isNew: boolean }[]} - 이미지 URL 배열
  // @description 검증된 이미지 목록
  // @reason 표시
  safeMinImages: number; // @type {number} - 최소 이미지 수
  // @description 최소 이미지 수
  // @reason 규칙 적용
  handleRemoveImage: (index: number) => void; // @type {(index: number) => void} - 삭제 핸들러
  // @description 인덱스 기반 삭제
  // @reason 사용자 행동 처리
}

function ImagePreviewRendering({
  imageUrl,
  isUploading,
  safeImageUrls,
  safeMinImages,
  handleRemoveImage,
}: ImagePreviewRenderingProps) {
  return (
    <div className="mb-4">
      <ImageListContainerComponent
        imageUrl={imageUrl}
        isUploading={isUploading}
        safeImageUrls={safeImageUrls}
        safeMinImages={safeMinImages}
        handleRemoveImage={handleRemoveImage}
      />
      {/* @description 이미지 목록 렌더링 */}
      {/* @reason 사용자에게 이미지 표시 */}
      <MinimumImagesWarningComponent
        safeImageUrlsLength={safeImageUrls.length}
        safeMinImages={safeMinImages}
      />
      {/* @description 최소 이미지 경고 렌더링 */}
      {/* @reason 사용자에게 경고 표시 */}
    </div>
  ); // @type {JSX.Element} - 렌더링 결과
  // @description UI 반환
  // @reason 화면 표시
}

export default ImagePreviewRendering;
