import ImagePreviewUploading from '../../Common/parts/ImagePreviewUploading';
import useImageUploadStatus from '../../Common/hooks/useImageUploadStatus';
import { ImageFileName } from '@/components/handleImage/utils/ImageFileType';

function ImageSlideImage({
  imageSrc,
  index,
}: {
  imageSrc?: string;
  index?: number;
}) {
  const { imageUrls, isUploading, imageTitles } = useImageUploadStatus();
  const safeImageSrc =
    imageSrc || imageUrls[index] || 'https://via.placeholder.com/150'; // @type {string}
  // @description 이미지 소스 설정, 기본값은 더미 URL
  // @reason Fallback 제공
  const safeIndex = typeof index === 'number' && !isNaN(index) ? index : 0; // @type {number}
  // @description 인덱스 유효성 검사
  // @reason 오류 방지
  const fileName =
    imageTitles && imageTitles[safeIndex]?.name
      ? imageTitles[safeIndex].name
      : `Slide ${safeIndex + 1}`; // @type {string}
  // @description 이미지 제목 또는 기본 alt 값 설정
  // @reason 사용자 피드백

  return (
    <li className="relative">
      {isUploading && (
        <ImagePreviewUploading imageSrc={safeImageSrc} index={safeIndex} />
      )}
      <div className="w-full h-full overflow-hidden rounded-md">
        <img
          src={safeImageSrc}
          alt={fileName}
          className="object-cover w-full h-full"
          aria-label={fileName}
        />
      </div>
    </li>
  );
}

export default ImageSlideImage;
