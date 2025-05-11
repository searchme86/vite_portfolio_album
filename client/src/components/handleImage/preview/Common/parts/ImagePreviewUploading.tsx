import useImageUploadStatus from '../hooks/useImageUploadStatus';
import { ImageFileName } from '@/components/handleImage/utils/ImageFileType';

function ImagePreviewUploading({
  imageSrc,
  index,
}: {
  imageSrc?: string;
  index?: number;
}) {
  const { imageTitles } = useImageUploadStatus();
  const safeImageSrc = imageSrc || 'https://via.placeholder.com/150'; // @type {string}
  // @description 이미지 소스 설정, 기본값은 더미 URL
  // @reason Fallback 제공
  const safeIndex = typeof index === 'number' && !isNaN(index) ? index : 0; // @type {number}
  // @description 인덱스 유효성 검사
  // @reason 오류 방지
  const fileName =
    imageTitles && imageTitles[safeIndex]?.name
      ? imageTitles[safeIndex].name
      : `Uploading ${safeIndex + 1}`; // @type {string}
  // @description 이미지 제목 또는 기본 alt 값 설정
  // @reason 사용자 피드백

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 blurred">
      <span className="text-white">uploading...</span>
      <img
        src={safeImageSrc}
        alt={fileName}
        className="object-cover w-full h-full opacity-50"
        aria-label={fileName}
      />
    </div>
  );
}

export default ImagePreviewUploading;
