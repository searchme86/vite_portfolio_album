import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';
import ImageUploadInputAndButton from './ImageUpload/parts/ImageUploadInputAndButton';
import ImageUploadProgressBar from './ImageUpload/parts/ImageUploadProgressBar';
import PreviewContainer from './ImageUploaderWrapper/parts/PreviewContainer';
import { useImageFileSetPostId } from './preview/Common/hooks/useImageFileSetPostId';

import ImagePreviewContainer from './preview/ImagePreviewContainer';

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
  // Zustand 상태 직접 가져오기
  // 의미: 컴포넌트에서 필요한 상태와 액션 직접 추출
  // 이유: 상태 접근 간소화
  const { imageUrls, tempFiles, isUploading, progress } =
    useImageManagementStore();

  // Post ID 설정 훅
  // 의미: postId를 Zustand 상태에 저장
  // 이유: 다른 컴포넌트에서 사용 가능
  useImageFileSetPostId(postId);

  return (
    <div className="flex flex-col gap-4">
      {/* 파일 입력 및 버튼 컴포넌트 */}
      <ImageUploadInputAndButton
        buttonText={buttonText}
        existingBaseFileNames={existingBaseFileNames}
        isUploading={isUploading}
        tempFilesLength={tempFiles.length}
      />

      {/* 업로드 진행률 표시 컴포넌트 */}
      <ImageUploadProgressBar isUploading={isUploading} progress={progress} />

      {/* 미리보기 컨테이너 */}
      {(tempFiles.length > 0 || imageUrls.length > 0) && <PreviewContainer />}
      {(tempFiles.length > 0 || imageUrls.length > 0) && (
        <ImagePreviewContainer />
      )}
    </div>
  );
}

export default ImageUploaderMain;
