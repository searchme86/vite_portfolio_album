import ImageDisplayComponent from './ImageDisplayComponent'; // @type {Component} - 이미지 표시 컴포넌트
// @description 개별 이미지 표시
// @reason UI 구성
import ImageRemoveButtonComponent from './ImageRemoveButtonComponent'; // @type {Component} - 이미지 제거 버튼
// @description 이미지 삭제 버튼
// @reason 사용자 인터랙션

type ImageItem = {
  url?: string; // @type {string} - 이미지 URL
  // @description 이미지 주소
  // @reason 이미지 표시
};

type Props = {
  imageUrl: string; // @type {string} - 현재 이미지 URL
  // @description 현재 이미지 주소
  // @reason 표시
  isUploading: boolean; // @type {boolean} - 업로드 중 여부
  // @description 업로드 상태
  // @reason UI 조정
  safeImageUrls: ImageItem[]; // @type {ImageItem[]} - 이미지 목록
  // @description 검증된 이미지 목록
  // @reason 표시
  safeMinImages: number; // @type {number} - 최소 이미지 수
  // @description 최소 이미지 수
  // @reason 규칙 적용
  handleRemoveImage?: (index: number) => void; // @type {(index: number) => void} - 삭제 핸들러
  // @description 인덱스로 이미지 삭제
  // @reason 사용자 행동 처리
};

function ImageListContainerComponent({
  imageUrl,
  isUploading,
  safeImageUrls,
  safeMinImages,
  handleRemoveImage,
}: Props) {
  if (safeImageUrls.length === 0) {
    return (
      <p className="text-gray-500" role="status" aria-live="polite">
        No images available.
      </p>
    ); // @type {JSX.Element} - 이미지 없음 메시지
    // @description 이미지 목록이 비어있으면 메시지 표시
    // @reason 사용자 피드백
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-3">
      {safeImageUrls.map((item, index) => (
        <div key={index} className="relative">
          <ImageDisplayComponent
            url={item.url}
            index={index}
            imageUrl={imageUrl}
            isUploading={isUploading}
          />
          {/* @description 개별 이미지 렌더링 */}
          {/* @reason 사용자에게 이미지 표시 */}
          <ImageRemoveButtonComponent
            index={index}
            handleRemoveImage={handleRemoveImage}
            safeImageUrlsLength={safeImageUrls.length}
            safeMinImages={safeMinImages}
          />
          {/* @description 삭제 버튼 렌더링 */}
          {/* @reason 사용자 인터랙션 */}
        </div>
      ))}
    </div>
  ); // @type {JSX.Element} - 이미지 목록 렌더링
  // @description 이미지 목록을 그리드로 표시
  // @reason 사용자에게 이미지 보여주기
}

export default ImageListContainerComponent;
