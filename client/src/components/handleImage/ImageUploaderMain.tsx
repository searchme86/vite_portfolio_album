import ImageUploadInputAndButton from './ImageUpload/parts/ImageUploadInputAndButton';
import ImageUploadProgressBar from './ImageUpload/parts/ImageUploadProgressBar';
import ImageUploadPreview from './ImageUploadPreview/ImageUploadPreview';
import ImagePreviewTempList from './ImageUploadPreview/ImagePreview/parts/ImagePreviewTempList';
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';
import { useImageFileSetPostId } from './ImageUploadPreview/ImagePreview/hooks/useImageFileSetPostId';

interface ImageUploaderMainProps {
  postId: string;
  buttonText?: string;
  existingBaseFileNames?: string[];
}

function ImageUploaderMain({
  postId,
  buttonText,
  existingBaseFileNames = [],
}: ImageUploaderMainProps) {
  const { imageUrls, tempFiles, isUploading, progress } =
    useImageManagementStore();
  useImageFileSetPostId(postId);

  return (
    <div>
      {(tempFiles.length > 0 || imageUrls.length > 0) && <ImageUploadPreview />}
      {(tempFiles.length > 0 || imageUrls.length > 0) && (
        <ImagePreviewTempList />
      )}
      {/* 업로드 진행률 표시 컴포넌트 */}
      <ImageUploadProgressBar isUploading={isUploading} progress={progress} />
      {/* 파일 입력 및 버튼 컴포넌트 */}
      <ImageUploadInputAndButton
        buttonText={buttonText}
        existingBaseFileNames={existingBaseFileNames}
        isUploading={isUploading}
        tempFilesLength={tempFiles.length}
      />
    </div>
  );
}

export default ImageUploaderMain;
