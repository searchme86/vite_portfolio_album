import React from 'react';
import ImagePreview from '../../ImagePreview/ImagePreview';

// 타입 정의: PreviewContainerProps는 previewUrls, imageUrls, onDelete, isUploading을 받음
// previewUrls는 파일 선택 시 생성된 blob URL 배열
// imageUrls는 서버에서 반환된 URL 배열
// onDelete는 이미지 삭제를 위한 함수
// isUploading은 업로드 상태를 나타냄
interface PreviewContainerProps {
  previewUrls: string[]; // 미리보기용 blob URL 배열
  imageUrls: string[]; // 서버에서 반환된 최종 URL 배열
  onDelete: (index: number) => void; // 이미지 삭제 함수
  isUploading: boolean; // 업로드 중인지 여부
}

function PreviewContainer({
  previewUrls,
  imageUrls,
  onDelete,
  isUploading,
}: PreviewContainerProps) {
  // previewUrls를 안전하게 처리
  // 의미: previewUrls가 undefined일 경우 빈 배열로 초기화
  // 이유: undefined로 인해 렌더링이 실패하지 않도록 방지
  const safePreviewUrls = previewUrls ?? [];

  // imageUrls를 안전하게 처리
  // 의미: imageUrls가 undefined일 경우 빈 배열로 초기화
  // 이유: undefined로 인해 렌더링이 실패하지 않도록 방지
  const safeImageUrls = imageUrls ?? [];

  // ImagePreview 컴포넌트에 props 전달
  // 의미: previewUrls, imageUrls, onDelete를 하위 컴포넌트로 전달하여 미리보기 렌더링 및 삭제 기능 제공
  // 이유: ImagePreview가 두 가지 URL을 기반으로 이미지를 표시하고, 삭제 기능을 수행하도록 함
  return (
    <div className="preview-container">
      {/* 업로드 중일 때 로딩 메시지 표시 */}
      {/* 의미: isUploading이 true일 경우 사용자에게 업로드 중임을 알림 */}
      {/* 이유: UX를 개선하고, 업로드 상태를 시각적으로 표시 */}
      {isUploading && <p className="text-sm text-gray-600">업로드 중...</p>}
      <ImagePreview
        previewUrls={safePreviewUrls}
        imageUrls={safeImageUrls}
        onDelete={onDelete}
      />
    </div>
  );
}

export default PreviewContainer;

// 동작 매커니즘:
// 1. PreviewContainer는 previewUrls, imageUrls, onDelete, isUploading을 props로 받음
// 2. previewUrls와 imageUrls를 안전하게 처리하여 undefined일 경우 빈 배열로 초기화
// 3. isUploading 상태에 따라 로딩 메시지를 렌더링
// 4. 처리된 배열과 onDelete 함수를 ImagePreview 컴포넌트에 전달
// 5. ImagePreview가 전달받은 URL을 기반으로 이미지를 렌더링하고, 삭제 버튼 클릭 시 onDelete 호출
