// useImageUploadContext.ts
import { createContext, useContext } from 'react';

// 공통적으로 사용하는 SetState 타입 제네릭 정의
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

// ImageUrl 타입 정의
interface ImageUrl {
  url: string;
  isNew: boolean;
}

// Context 타입 정의
interface ImageUploadContextType {
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
  baseFileNamesWithoutSuffix: string[];
  imageUploaderKey: string;
  postId: string;
  minImages: number;
  maxImages: number;
  onImageUrlsChange: (data: string[]) => void;
}

// Context 생성
const ImageUploadContext = createContext<ImageUploadContextType | null>(null);

// Context 사용 커스텀 훅
const useImageUploadContext = (): ImageUploadContextType => {
  const context = useContext(ImageUploadContext);
  if (!context) {
    throw new Error(
      'useImageUploadContext must be used within an ImageUploadManager'
    );
  }
  return context;
};

export { ImageUploadContext, useImageUploadContext };
