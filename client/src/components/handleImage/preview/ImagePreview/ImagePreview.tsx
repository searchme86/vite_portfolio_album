import ImagePreviewLayout from './parts/ImagePreviewLayout';
import ImagePreviewList from '../Common/parts/ImagePreviewList';
import useImagePreviewUrls from './hooks/useImagePreviewUrls';
import useImagePreviewDelete from './hooks/useImagePreviewDelete';

function ImagePreview() {
  const { imageUrls } = useImagePreviewUrls(); // @type {ImageUrl[]}
  // @description 이미지 URL 배열 가져오기
  // @reason 상태 기반 렌더링
  const handleDelete = useImagePreviewDelete; // @type {(index: number) => void}
  // @description 삭제 핸들러 가져오기
  // @reason 상태 변경

  return (
    <ImagePreviewLayout>
      <ImagePreviewList images={imageUrls} onDelete={handleDelete} />
    </ImagePreviewLayout>
  );
}

export default ImagePreview;
