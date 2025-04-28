// src/components/handleImage/context/ImageUploadContext.js
import { createContext, useContext } from 'react';

// 1. ImageUploadContext 생성: 이미지 업로드 관련 상태와 함수를 하위 컴포넌트에 전달하기 위한 Context
// 2. 이 Context는 ImageUploadManager.jsx에서 Provider를 통해 값을 제공받음
const ImageUploadContext = createContext(null);

// 1. useImageUploadContext 훅: Context 값을 쉽게 가져오기 위한 커스텀 훅
// 2. ImageUploadManager 내부에서 Provider가 설정되어 있어야 하며, 그렇지 않으면 에러 발생
const useImageUploadContext = () => {
  const context = useContext(ImageUploadContext);
  if (!context) {
    // 1. Provider가 없으면 에러 발생
    // 2. 디버깅을 위해 에러 메시지 제공
    throw new Error(
      'useImageUploadContext must be used within an ImageUploadManager'
    );
  }
  return context;
};

export { ImageUploadContext, useImageUploadContext };
