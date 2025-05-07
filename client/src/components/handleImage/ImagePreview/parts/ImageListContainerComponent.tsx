import ImageDisplayComponent from './ImageDisplayComponent';
import ImageRemoveButtonComponent from './ImageRemoveButtonComponent';

type ImageItem = {
  url?: string;
};

type Props = {
  imageUrl: string; // @type {string} - 현재 이미지 URL
  // @description 현재 이미지 주소
  // @reason 표시
  isUploading: boolean; // @type {boolean} - 업로드 중 여부
  // @description 업로드 상태
  // @reason UI 조정
  safeImageUrls: ImageItem[];
  safeMinImages: number;
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
    );
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
          <ImageRemoveButtonComponent
            index={index}
            handleRemoveImage={handleRemoveImage}
            safeImageUrlsLength={safeImageUrls.length}
            safeMinImages={safeMinImages}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageListContainerComponent;
