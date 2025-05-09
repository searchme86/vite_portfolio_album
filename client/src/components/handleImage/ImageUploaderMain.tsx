// ImageUploaderMain 컴포넌트: 메인 업로더 UI
// 의미: 파일 업로드 인터페이스 제공
// 이유: 사용자 입력 처리
import { useRef, useEffect, useMemo } from 'react';
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
    setTempFiles,
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

  // 추가: previewUrls와 imageUrls를 미리 계산
  // 의미: PreviewContainer에 전달할 데이터를 정제
  // 이유: JSX 내부에서 복잡한 로직을 제거해 가독성 향상
  // 비유: "과일을 접시에 예쁘게 담아서 친구에게 주는 것처럼, 데이터를 정리해서 전달"
  const previewUrls = useMemo(() => {
    return (
      tempFiles
        .filter((file): file is File => file instanceof File) // File 객체 필터링
        // 의미: tempFiles에서 유효한 File 객체만 골라냄
        // 이유: null이나 손상된 데이터로 인해 createObjectURL이 실패하는 문제 해결
        .map((file) => URL.createObjectURL(file))
    ); // URL 생성
  }, [tempFiles]);
  // 의미: tempFiles가 변경될 때만 계산
  // 이유: 불필요한 연산 방지

  const formattedImageUrls = useMemo(() => {
    return imageUrls.map((img) => img.url); // imageUrls에서 URL만 추출
  }, [imageUrls]);
  // 의미: imageUrls가 변경될 때만 계산
  // 이유: 불필요한 연산 방지

  // 추가: URL 해제 로직
  // 의미: 생성된 URL 메모리 누수 방지
  // 이유: 컴포넌트 언마운트 시 리소스 정리
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      // 의미: 생성된 URL 해제
      // 이유: 메모리 누수 방지
    };
  }, [previewUrls]);

  // 추가: PreviewContainer에 전달할 props를 객체로 정리
  // 의미: props를 깔끔하게 전달
  // 이유: 코드 가독성 향상 및 유지보수 용이성
  const previewContainerProps = {
    previewUrls, // 정제된 previewUrls
    imageUrls: formattedImageUrls, // 정제된 imageUrls
    onDelete: handleDeleteFile,
    isUploading,
  };

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
        <PreviewContainer {...previewContainerProps} />
      )}
      {/* 수정: 정제된 props 객체를 전달 */}
      {/* 의미: PreviewContainer에 깔끔하게 props 전달 */}
      {/* 이유: JSX 내부에서 복잡한 계산 제거, 가독성 향상 */}
      {/* 비유: "친구에게 과일을 줄 때, 껍질 까서 접시에 담아주는 것처럼 깔끔하게 전달" */}
    </div>
  );
}

export default ImageUploaderMain;
