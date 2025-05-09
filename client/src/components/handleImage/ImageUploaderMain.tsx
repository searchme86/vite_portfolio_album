// ImageUploaderMain 컴포넌트: 메인 업로더 UI
// 의미: 파일 업로드 인터페이스 제공
// 이유: 사용자 입력 처리
import { useRef, useEffect } from 'react';
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
    setPostId,
    setProgress,
    setIsUploading,
    setImageUrls,
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
  // 의미: 파일 입력 클릭 트리거
  // 이유: 사용자 인터랙션 처리

  const handleDeleteFile = (index: number) => {
    if (index < 0 || index >= imageUrls.length) return;
    // 의미: 인덱스 유효성 검사
    // 이유: 잘못된 인덱스로 인해 오류 방지

    if (imageUrls.length <= 1) return;
    // 의미: 최소 이미지 개수 유지
    // 이유: 최소 한 장의 이미지를 유지하여 UI 일관성 보장

    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    console.log('---> handleDeleteFile 처리됨: newImageUrls', newImageUrls);
    setProgress(0);
    setIsUploading(false);
    setImageUrls(newImageUrls);
    // 의미: Zustand 상태 업데이트
    // 이유: UI 반영을 위해 상태 변경
  };
  const showSlide = true; // 슬라이드 모드 여부
  const safeShowSlide = typeof showSlide === 'boolean' ? showSlide : false;

  return (
    <div className="flex flex-col gap-4">
      {/* {safeShowSlide ? <ImageSlide /> : <ImagePreview />} */}
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
          disabled={isUploading || tempFiles.length >= 5} // 업로드 중 또는 최대 5개 제한
          className={`px-4 py-2 text-white bg-blue-600 rounded-md ${
            isUploading || tempFiles.length >= 5
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700'
          }`}
        >
          {buttonText || 'Add a Cover Image'}
        </button>
        {/* 의미: 업로드 버튼 */}
        {/* 이유: 사용자 인터랙션 */}
      </div>
      {/* 프로그래스바 추가 */}
      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
          <p className="mt-1 text-sm text-gray-600">업로드 진행: {progress}%</p>
        </div>
      )}
      {/* 의미: 업로드 진행 상황 표시 */}
      {/* 이유: 사용자 피드백 제공 */}
      {(tempFiles.length > 0 || imageUrls.length > 0) && (
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
