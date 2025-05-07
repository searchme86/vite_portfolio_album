import ImageUploader from './ImageUploader';
import { useImageUploadContext } from '../context/ImageUploadContext';
import useHandleFilesChange from './hooks/useHandleFilesChange';

function ImageUploaderWrapper() {
  const {
    postId,
    imageUploaderKey,
    tempFiles,
    imageUrls,
    buttonText,
    isUploading,
    setIsUploading,
    baseFileNamesWithoutSuffix,
  } = useImageUploadContext();

  const { handleFilesChange } = useHandleFilesChange();

  // postId가 없을 경우 기본값 설정
  // API 호출 시 문제 방지
  const safePostId = postId || 'default-post-id';
  // 디버깅: safePostId 확인
  // 값이 올바르게 설정되었는지 확인
  console.log('ImageUploaderWrapper - safePostId:', safePostId);

  // imageUploaderKey가 없을 경우 기본값 설정
  // key prop 오류 방지
  const safeImageUploaderKey = imageUploaderKey || 'default-key';
  // 디버깅: safeImageUploaderKey 확인
  // 값이 올바르게 설정되었는지 확인
  console.log(
    'ImageUploaderWrapper - safeImageUploaderKey:',
    safeImageUploaderKey
  );

  // tempFiles가 배열이 아닌 경우 빈 배열로 초기화
  // prop 전달 오류 방지
  const safeTempFiles = Array.isArray(tempFiles) ? tempFiles : [];
  // 디버깅: safeTempFiles 확인
  // 배열이 올바르게 처리되었는지 확인
  console.log('ImageUploaderWrapper - safeTempFiles:', safeTempFiles);

  // imageUrls가 배열이 아닌 경우 빈 배열로 초기화
  // map 오류 방지
  const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];
  // 디버깅: safeImageUrls 확인
  // 배열이 올바르게 처리되었는지 확인
  console.log('ImageUploaderWrapper - safeImageUrls:', safeImageUrls);

  // buttonText가 문자열이 아닌 경우 기본값 설정
  // UI 렌더링 오류 방지
  const safeButtonText =
    typeof buttonText === 'string' ? buttonText : 'Add a Cover Image';
  // 디버깅: safeButtonText 확인
  // 값이 올바르게 설정되었는지 확인
  console.log('ImageUploaderWrapper - safeButtonText:', safeButtonText);

  // isUploading이 불리언이 아닌 경우 기본값 설정
  // 조건부 로직 오류 방지
  const safeIsUploading =
    typeof isUploading === 'boolean' ? isUploading : false;
  // 디버깅: safeIsUploading 확인
  // 값이 올바르게 설정되었는지 확인
  console.log('ImageUploaderWrapper - safeIsUploading:', safeIsUploading);

  // setIsUploading이 함수가 아닌 경우 빈 함수로 대체
  // 호출 시 에러 방지
  const safeSetIsUploading =
    typeof setIsUploading === 'function' ? setIsUploading : () => {};
  // 디버깅: safeSetIsUploading 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log('ImageUploaderWrapper - safeSetIsUploading:', safeSetIsUploading);

  // baseFileNamesWithoutSuffix가 배열이 아닌 경우 빈 배열로 초기화
  // prop 전달 오류 방지
  const safeBaseFileNamesWithoutSuffix = Array.isArray(
    baseFileNamesWithoutSuffix
  )
    ? baseFileNamesWithoutSuffix
    : [];
  // 디버깅: safeBaseFileNamesWithoutSuffix 확인
  // 배열이 올바르게 처리되었는지 확인
  console.log(
    'ImageUploaderWrapper - safeBaseFileNamesWithoutSuffix:',
    safeBaseFileNamesWithoutSuffix
  );

  // handleFilesChange가 함수가 아닌 경우 빈 함수로 대체
  // 호출 시 에러 방지
  const safeHandleFilesChange =
    typeof handleFilesChange === 'function' ? handleFilesChange : () => {};
  // 디버깅: safeHandleFilesChange 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log(
    'ImageUploaderWrapper - safeHandleFilesChange:',
    safeHandleFilesChange
  );

  // ImageUploader 컴포넌트 렌더링
  // 준비된 데이터를 props로 전달
  return (
    <ImageUploader
      key={safeImageUploaderKey} // imageUrls 변경 시 리마운트, 캐시 문제 방지
      postId={safePostId}
      initialFiles={safeTempFiles}
      initialUrls={safeImageUrls.map((item) => item?.url || '')}
      onFilesChange={safeHandleFilesChange}
      buttonText={safeButtonText}
      isUploading={safeIsUploading}
      setIsUploading={safeSetIsUploading}
      existingBaseFileNames={safeBaseFileNamesWithoutSuffix}
    />
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default ImageUploaderWrapper;
//====여기까지 수정됨====
