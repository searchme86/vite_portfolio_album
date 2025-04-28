import { ImageUploadContext } from '../context/ImageUploadContext';
import useImageUploadState from './hooks/useImageUploadState';
import useBaseFileNamesWithoutSuffix from './hooks/useBaseFileNamesWithoutSuffix';
import useImageUploaderKey from './hooks/useImageUploaderKey';
import ImageUploadLayout from './components/ImageUploadLayout';

type ImageUploadManagerType = {
  postId: string;
  initialImageUrls: string[];
  onImageUrlsChange: (data: string[]) => void;
  progressBarColor: string;
  minImages: number;
  maxImages: number;
  showSlide: boolean;
};

function ImageUploadManager({
  postId,
  initialImageUrls = [],
  onImageUrlsChange,
  progressBarColor = 'bg-blue-600',
  minImages = 1,
  maxImages = 10,
  showSlide = false,
}: ImageUploadManagerType) {
  // postId가 문자열인지 확인, 아니면 기본값으로 대체
  // API 호출 시 문제가 발생하지 않도록 기본값 부여
  const safePostId = typeof postId === 'string' ? postId : 'default-post-id';
  // 디버깅: safePostId 확인
  // 값이 올바르게 설정되었는지 확인
  console.log('ImageUploadManager - safePostId:', safePostId);

  // initialImageUrls가 배열인지 확인, 아니면 빈 배열로 대체
  // map 오류 방지
  const safeInitialImageUrls = Array.isArray(initialImageUrls)
    ? initialImageUrls
    : [];
  // 디버깅: safeInitialImageUrls 확인
  // 배열이 올바르게 처리되었는지 확인
  console.log(
    'ImageUploadManager - safeInitialImageUrls:',
    safeInitialImageUrls
  );

  // onImageUrlsChange가 함수인지 확인, 아니면 빈 함수로 대체
  // 호출 시 에러 방지
  const safeOnImageUrlsChange =
    typeof onImageUrlsChange === 'function' ? onImageUrlsChange : () => {};
  // 디버깅: safeOnImageUrlsChange 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log(
    'ImageUploadManager - safeOnImageUrlsChange:',
    safeOnImageUrlsChange
  );

  // progressBarColor가 문자열인지 확인, 아니면 기본값으로 대체
  // 클래스 이름 오류 방지
  const safeProgressBarColor =
    typeof progressBarColor === 'string' ? progressBarColor : 'bg-blue-600';
  // 디버깅: safeProgressBarColor 확인
  // 값이 올바르게 설정되었는지 확인
  console.log(
    'ImageUploadManager - safeProgressBarColor:',
    safeProgressBarColor
  );

  // minImages와 maxImages가 숫자인지 확인, 아니면 기본값으로 대체
  // 비교 연산 시 에러 방지
  const safeMinImages =
    Number.isInteger(minImages) && minImages > 0 ? minImages : 1;
  const safeMaxImages =
    Number.isInteger(maxImages) && maxImages >= safeMinImages ? maxImages : 10;
  // 디버깅: safeMinImages, safeMaxImages 확인
  // 값이 올바르게 설정되었는지 확인
  console.log('ImageUploadManager - safeMinImages:', safeMinImages);
  console.log('ImageUploadManager - safeMaxImages:', safeMaxImages);

  // showSlide가 불리언인지 확인, 아니면 false로 대체
  // 조건부 렌더링 오류 방지
  const safeShowSlide = typeof showSlide === 'boolean' ? showSlide : false;
  // 디버깅: safeShowSlide 확인
  // 값이 올바르게 설정되었는지 확인
  console.log('ImageUploadManager - safeShowSlide:', safeShowSlide);

  // 상태 관리 훅 사용
  // 이미지 업로드 관련 상태 관리
  const {
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
  } = useImageUploadState({ initialImageUrls: safeInitialImageUrls });

  // 파일명 접미사 제거 및 중복 제거 훅 사용
  // 중복 파일명 제거
  const { baseFileNamesWithoutSuffix } = useBaseFileNamesWithoutSuffix({
    imageUrls,
  });

  // ImageUploader의 key 생성 훅 사용
  // 캐시 문제 방지
  const { imageUploaderKey } = useImageUploaderKey({ imageUrls });

  // Context에 제공할 값: 하위 컴포넌트에서 사용할 상태와 함수
  // ImageUploadContext.Provider를 통해 전달됨
  const contextValue = {
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
    baseFileNamesWithoutSuffix,
    imageUploaderKey,
    postId: safePostId,
    minImages: safeMinImages,
    maxImages: safeMaxImages,
    onImageUrlsChange: safeOnImageUrlsChange,
  };
  // 디버깅: contextValue 확인
  // 컨텍스트 값이 올바르게 생성되었는지 확인
  console.log('ImageUploadManager - contextValue:', contextValue);

  // 디버깅: 컴포넌트 렌더링 확인
  // 컴포넌트가 올바르게 렌더링되었는지 확인
  console.log('ImageUploadManager - Component rendered');

  return (
    // ImageUploadContext.Provider를 사용하여 Context 값을 하위 컴포넌트에 전달
    // ImageUploadLayout에서 하위 컴포넌트 렌더링
    <ImageUploadContext.Provider value={contextValue}>
      <ImageUploadLayout
        showSlide={safeShowSlide}
        progressBarColor={safeProgressBarColor}
      />
    </ImageUploadContext.Provider>
  );
}

export default ImageUploadManager;
