import ImagePreviewItem from './ImagePreviewItem';
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

function ImagePreviewList({
  images,
  onDelete,
}: {
  images: string[];
  onDelete: (index: number) => void;
}) {
  const safeImages = images || [];
  const maxImages = useImageManagementStore((state) => state.maxImages || 10); // @type {number}
  // @description Zustand 상태에서 최대 이미지 수 가져오기
  // @reason 상태 기반 제한

  return (
    <ul
      className="flex flex-wrap gap-4"
      role="list"
      aria-label="Image preview list"
    >
      {safeImages.slice(0, maxImages).map((image, index) => (
        <ImagePreviewItem
          key={index}
          imageSrc={image}
          index={index}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ImagePreviewList;
