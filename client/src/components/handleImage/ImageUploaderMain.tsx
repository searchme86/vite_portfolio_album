// ImageUploaderMain 컴포넌트: 메인 업로더 UI
// 의미: 파일 업로드 인터페이스 제공
// 이유: 사용자 입력 처리
import { useRef, useEffect, useMemo } from 'react';
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';
import PreviewContainer from './ImageUploaderWrapper/parts/PreviewContainer';
import useHandleFileUpload from './ImageUpload/hooks/useHandleFileUpload';
import ImageSlide from './ImageSlide/ImageSlide';
import ImagePreview from './ImagePreview/ImagePreview';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    imageUrls,
    tempFiles,
    isUploading,
    progress,
    imageTitle, // 추가: imageTitle 가져오기
    setPostId,
    setProgress,
    setIsUploading,
    setImageUrls,
    setTempFiles,
    setImageTitle, // 추가: setImageTitle 가져오기
  } = useImageManagementStore();
  // 수정: useImageManagementStore를 컴포넌트 본문 최상단에서 호출
  // 의미: Zustand 스토어에서 상태와 액션 가져오기
  // 이유: Rules of Hooks 준수
  const { handleFileUpload } = useHandleFileUpload();

  // postId가 변경될 때 한 번만 설정
  useEffect(() => {
    setPostId(postId);
    // 의미: Zustand 상태에 postId 저장
    // 이유: 다른 컴포넌트에서 사용 가능
  }, [postId, setPostId]);

  const handleAddFileClick = () => fileInputRef.current?.click();

  const handleDeleteFile = (index: number) => {
    if (index < 0 || index >= imageUrls.length) return;
    if (imageUrls.length <= 1) return;

    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    const newImageTitles = imageTitle.filter((_, i) => i !== index); // 추가: imageTitle 동기화
    setProgress(0);
    setIsUploading(false);
    setImageUrls(newImageUrls);
    setImageTitle(newImageTitles);
  };

  const showSlide = true; // 슬라이드 모드 여부
  const safeShowSlide = typeof showSlide === 'boolean' ? showSlide : false;

  const previewUrls = useMemo(() => {
    return tempFiles
      .filter((file): file is File => file instanceof File) // File 객체 필터링
      .map((file) => URL.createObjectURL(file)); // URL 생성
  }, [tempFiles]);

  const formattedImageUrls = useMemo(() => {
    return imageUrls.map((img) => img.url); // imageUrls에서 URL만 추출
  }, [imageUrls]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const previewContainerProps = {
    previewUrls, // 정제된 previewUrls
    imageUrls: formattedImageUrls, // 정제된 imageUrls
    imageTitles: imageTitle, // 추가: imageTitle 전달
    onDelete: handleDeleteFile,
    isUploading,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={(e) => handleFileUpload(e, existingBaseFileNames)}
          className="hidden"
          id="image-upload"
        />

        <button
          type="button"
          onClick={handleAddFileClick}
          disabled={isUploading || tempFiles.length >= 5} // 업로드 중 또는 최대 5개 제한
          className={`px-4 py-2 text-white bg-blue-600 rounded-md ${
            isUploading || tempFiles.length >= 5
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700'
          }`}
        >
          {buttonText || 'Add a Cover Image'}
        </button>
      </div>

      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
          <p className="mt-1 text-sm text-gray-600">업로드 진행: {progress}%</p>
        </div>
      )}

      {(tempFiles.length > 0 || imageUrls.length > 0) && (
        <PreviewContainer {...previewContainerProps} />
      )}
    </div>
  );
}

export default ImageUploaderMain;
