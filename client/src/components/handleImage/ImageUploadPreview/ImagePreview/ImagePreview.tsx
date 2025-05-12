import ImagePreviewList from './parts/ImagePreviewList';
import ImagePreviewTempList from './parts/ImagePreviewTempList';

function ImagePreview() {
  return (
    <div className="flex gap-2">
      {/* 업로드된 이미지 표시 */}
      <ImagePreviewList />
      {/* 임시 파일 표시 */}
      <ImagePreviewTempList />
    </div>
  );
}

export default ImagePreview;
