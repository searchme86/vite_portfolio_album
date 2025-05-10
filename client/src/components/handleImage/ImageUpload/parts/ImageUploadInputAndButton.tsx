import { useRef } from 'react';
import useHandleFileUpload from '../hooks/useHandleFileUpload';

// ImageUploadInputAndButtonProps: 컴포넌트 props 타입
// 의미: 파일 입력과 버튼에 필요한 속성 정의
// 이유: 타입 안정성 보장
interface ImageUploadInputAndButtonProps {
  buttonText?: string;
  existingBaseFileNames: string[];
  isUploading: boolean;
  tempFilesLength: number;
}

function ImageUploadInputAndButton({
  buttonText,
  existingBaseFileNames,
  isUploading,
  tempFilesLength,
}: ImageUploadInputAndButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleFileUpload } = useHandleFileUpload();

  // handleAddFileClick: 파일 입력 클릭 트리거
  // 의미: 사용자가 버튼 클릭 시 파일 입력 창 열기
  // 이유: 사용자 인터랙션 처리
  const handleAddFileClick = () => fileInputRef.current?.click();

  return (
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
        disabled={isUploading || tempFilesLength >= 5}
        className={`px-4 py-2 text-white bg-blue-600 rounded-md ${
          isUploading || tempFilesLength >= 5
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-blue-700'
        }`}
      >
        {buttonText || 'Add a Cover Image'}
      </button>
      {/* 의미: 업로드 버튼 */}
      {/* 이유: 사용자 인터랙션 */}
    </div>
  );
}

export default ImageUploadInputAndButton;
