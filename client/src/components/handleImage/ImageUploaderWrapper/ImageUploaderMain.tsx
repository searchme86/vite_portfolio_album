// ImageUploaderMain 컴포넌트: 메인 업로더 UI
// 의미: 파일 업로드 인터페이스 제공
// 이유: 사용자 입력 처리
import { useRef, useEffect } from 'react';
import { useImageUploadStore } from '@/stores/imageUploadStore';
import PreviewContainer from './parts/PreviewContainer';
import useHandleFileUpload from './hooks/useHandleFileUpload';
import useHandleFilesChange from './hooks/useHandleFilesChange';

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
  const { imageUrls, tempFiles, isUploading, setPostId } =
    useImageUploadStore();
  const { handleFileUpload } = useHandleFileUpload();
  const { handleFilesChange } = useHandleFilesChange();

  // postId가 변경될 때 한 번만 설정
  useEffect(() => {
    setPostId(postId);
    // 의미: Zustand 상태에 postId 저장
    // 이유: 다른 컴포넌트에서 사용 가능
  }, [postId, setPostId]);

  const handleAddFileClick = () => fileInputRef.current?.click();
  // 의미: 파일 입력 클릭 트리거
  // 이유: 사용자 인터랙션 처리

  const handleDeleteFile = (index: number) => {
    if (index < 0 || index >= imageUrls.length) return;
    if (imageUrls.length <= 1) return; // 최소 이미지 개수 제한
    // 의미: 삭제 조건 확인
    // 이유: 데이터 손실 방지

    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    handleFilesChange(
      newImageUrls.map((img) => img.url), // urls
      0, // progress
      false // isUploading
    );
    // 의미: 이미지 삭제 및 상태 업데이트
    // 이유: UI와 상태 동기화
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
        {/* 의미: 파일 입력 요소 */}
        {/* 이유: 이미지 파일 선택 */}

        <button
          type="button"
          onClick={handleAddFileClick}
          disabled={isUploading}
          className={`px-4 py-2 text-white bg-blue-600 rounded-md ${
            isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {buttonText || 'Add a Cover Image'}
        </button>
        {/* 의미: 업로드 버튼 */}
        {/* 이유: 사용자 인터랙션 */}
      </div>
      {tempFiles.length > 0 && (
        <PreviewContainer
          previewUrls={tempFiles.map((file) => URL.createObjectURL(file))}
          imageUrls={imageUrls.map((img) => img.url)}
          onDelete={handleDeleteFile}
          isUploading={isUploading}
        />
      )}
      {/* 의미: 미리보기 컨테이너 */}
      {/* 이유: 업로드된 이미지 표시 */}
    </div>
  );
}

export default ImageUploaderMain;
//====여기까지 수정됨====
