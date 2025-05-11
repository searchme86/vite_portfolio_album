import ImagePreviewButton from './ImagePreviewButton';
import ImagePreviewUploading from './ImagePreviewUploading';
import useImageUploadStatus from '../hooks/useImageUploadStatus';

function ImagePreviewItem({
  imageSrc,
  index,
  onDelete,
  fileName,
}: {
  imageSrc?: string;
  index?: number;
  onDelete: (index: number) => void;
  fileName: string;
}) {
  const { imageUrls, isUploading, imageTitles } = useImageUploadStatus();

  const safeImageSrc =
    imageSrc || imageUrls[index] || 'https://via.placeholder.com/150'; // @type {string}
  // @description 이미지 소스 설정, 기본값은 더미 URL
  // @reason Fallback 제공
  const safeIndex = typeof index === 'number' && !isNaN(index) ? index : 0; // @type {number}
  // @description 인덱스 유효성 검사
  // @reason 오류 방지

  return (
    <li className="relative">
      {isUploading && (
        <ImagePreviewUploading imageSrc={safeImageSrc} index={safeIndex} />
      )}
      <div className="w-full h-32 overflow-hidden rounded-md">
        <img
          src={safeImageSrc}
          alt={fileName}
          className="object-cover w-full h-full"
          aria-label={fileName}
        />
      </div>
      <ImagePreviewButton
        onClick={() => onDelete(safeIndex)}
        index={safeIndex}
      />
    </li>
  );
}

export default ImagePreviewItem;
