import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';
import ImageUploadInputAndButton from './ImageUpload/parts/ImageUploadInputAndButton';
import ImageUploadProgressBar from './ImageUpload/parts/ImageUploadProgressBar';
import PreviewContainer from './ImageUploaderWrapper/parts/PreviewContainer';
import useImageFileSetPostId from './ImageUpload/hooks/useImageFileSetPostId';
import useImageFileDeleteHandler from './ImageUpload/hooks/useImageFileDeleteHandler';
import useImageFilePreviewUrls from './ImageUpload/hooks/useImageFilePreviewUrls';

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

  // 파일 삭제 핸들러 훅
  // 의미: 이미지와 제목 삭제 로직 처리
  // 이유: 재사용 가능한 로직 분리
  const handleDeleteFile = useImageFileDeleteHandler();

  // 미리보기 URL 관리 훅
  // 의미: 미리보기 URL 생성 및 정리
  // 이유: 메모리 관리와 연산 최적화
  const { previewUrls, formattedImageUrls } = useImageFilePreviewUrls();

  // PreviewContainer props
  // 의미: 미리보기 컴포넌트에 필요한 데이터 전달
  // 이유: 데이터 캡슐화
  const previewContainerProps = {
    previewUrls,
    imageUrls: formattedImageUrls,
    imageTitles: useImageManagementStore((state) => state.imageTitle),
    onDelete: handleDeleteFile,
    isUploading,
  };

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
      {(tempFiles.length > 0 || imageUrls.length > 0) && (
        <PreviewContainer {...previewContainerProps} />
      )}
    </div>
  );
}

export default ImageUploaderMain;
