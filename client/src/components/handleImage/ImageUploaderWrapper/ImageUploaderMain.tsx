//====여기부터 수정됨====
// ImageUploaderMain 컴포넌트: 메인 업로더 UI
// 의미: 파일 업로드 인터페이스 제공
// 이유: 사용자 입력 처리
import { useRef, useEffect } from 'react';
import { useImageUploadStore } from '@/stores/imageUploadStore';
import PreviewContainer from './parts/PreviewContainer';
import useHandleFileUpload from './hooks/useHandleFileUpload';
import useHandleFilesChange from './hooks/useHandleFilesChange';
import useManageUploadState from './hooks/useManageUploadState'; // 추가: 상태 직접 업데이트용

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
  const { imageUrls, tempFiles, isUploading, progress, setPostId } =
    useImageUploadStore();
  const { handleFileUpload } = useHandleFileUpload();
  const { handleFilesChange } = useHandleFilesChange();
  const { manageUploadState } = useManageUploadState(); // 추가: 상태 업데이트 훅

  console.log('---> ImageUploaderMain 렌더링: imageUrls', imageUrls);
  console.log('---> ImageUploaderMain 렌더링: tempFiles', tempFiles);

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
    console.log('---> handleDeleteFile 호출됨: index', index);
    console.log('---> handleDeleteFile 호출됨: imageUrls', imageUrls);
    if (index < 0 || index >= imageUrls.length) return;
    if (imageUrls.length <= 1) return; // 최소 이미지 개수 제한
    // 의미: 삭제 조건 확인
    // 이유: 데이터 손실 방지

    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    console.log('---> handleDeleteFile 처리됨: newImageUrls', newImageUrls);

    // 수정: handleFilesChange 대신 manageUploadState를 직접 호출
    // 의미: 중복 확인 로직을 거치지 않고 직접 상태 업데이트
    // 이유: 삭제 시 중복 확인 불필요
    // 중요! newImageUrls상태가 삭제가 됐으나 아직 화면에 적용은 안됨
    manageUploadState(newImageUrls, 0, false);
    console.log(
      '---> handleDeleteFile 이후 상태 업데이트됨: newImageUrls',
      newImageUrls
    );
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
//====여기까지 수정됨====
