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
    </div>
  );
}

export default ImageUploadInputAndButton;
