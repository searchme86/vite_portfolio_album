// useImageUploadState.ts
import { useState } from 'react';

// 각 상태 타입 정의
interface ImageUrl {
  url: string;
  isNew: boolean;
}

interface UseImageUploadStateProps {
  initialImageUrls: string[];
}

// 공통적으로 사용하는 SetState 타입 제네릭 정의
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

// 반환 타입 정의
interface UseImageUploadStateReturn {
  imageUrls: ImageUrl[];
  setImageUrls: SetState<ImageUrl[]>;
  progress: number;
  setProgress: SetState<number>;
  buttonText: string;
  setButtonText: SetState<string>;
  tempFiles: File[];
  setTempFiles: SetState<File[]>;
  isUploading: boolean;
  setIsUploading: SetState<boolean>;
}

function useImageUploadState({
  initialImageUrls,
}: UseImageUploadStateProps): UseImageUploadStateReturn {
  const safeInitialImageUrls: ImageUrl[] = Array.isArray(initialImageUrls)
    ? initialImageUrls.map((url) => ({
        url: url || '',
        isNew: false,
      }))
    : [];

  const [imageUrls, setImageUrls] = useState<ImageUrl[]>(safeInitialImageUrls);
  const [progress, setProgress] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>(
    safeInitialImageUrls.length > 0 ? 'Update' : 'Add a Cover Image'
  );
  const [tempFiles, setTempFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  return {
    imageUrls,
    setImageUrls,
    progress,
    setProgress,
    buttonText,
    setButtonText,
    tempFiles,
    setTempFiles,
    isUploading,
    setIsUploading,
  };
}

export default useImageUploadState;
