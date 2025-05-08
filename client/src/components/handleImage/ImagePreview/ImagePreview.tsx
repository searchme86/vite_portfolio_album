import React from 'react';

// 타입 정의: ImagePreviewProps는 previewUrls, imageUrls, onDelete를 받음
// previewUrls는 파일 선택 시 생성된 blob URL 배열
// imageUrls는 서버에서 반환된 URL 배열
// onDelete는 이미지 삭제를 위한 함수
interface ImagePreviewProps {
  previewUrls: string[]; // 미리보기용 blob URL 배열
  imageUrls: string[]; // 서버에서 반환된 최종 URL 배열
  onDelete: (index: number) => void; // 이미지 삭제 함수
}

function ImagePreview({ previewUrls, imageUrls, onDelete }: ImagePreviewProps) {
  // 안전하게 URL 배열을 처리하기 위해 null/undefined 체크
  // 의미: previewUrls가 있으면 미리보기로 사용, 없으면 imageUrls 사용
  // 이유: 사용자가 업로드 중일 때 실시간으로 선택한 이미지를 확인할 수 있어야 함

  console.log('previewUrls:<---', previewUrls);
  console.log('imageUrls:<---', imageUrls);

  const safePreviewUrls = previewUrls ?? [];
  const safeImageUrls = imageUrls ?? [];

  // 표시할 URL 결정: previewUrls가 있으면 우선 사용, 없으면 imageUrls 사용
  // 의미: 미리보기가 우선순위가 높아야 함
  // 이유: 사용자가 업로드 중일 때 실시간으로 선택한 이미지를 확인할 수 있어야 함
  const displayUrls =
    safePreviewUrls.length > 0 ? safePreviewUrls : safeImageUrls;

  // 렌더링: displayUrls를 기반으로 이미지를 표시
  // 의미: URL 배열을 순회하며 각 URL에 대해 img 태그와 삭제 버튼 생성
  // 이유: 여러 이미지를 미리보기하고 삭제 기능 제공
  return (
    <div className="flex gap-2 image-preview-container">
      {displayUrls.length > 0 ? (
        displayUrls.map((url, index) => (
          // 각 이미지와 삭제 버튼을 감싸는 div에 고유한 key 부여
          // 의미: React가 리스트 렌더링 시 요소를 효율적으로 업데이트하도록 도움
          // 이유: key가 없으면 React가 불필요한 리렌더링을 수행할 수 있음
          <div key={index} className="relative">
            <img
              src={url}
              alt={`preview-${index}`}
              className="preview-image"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            {/* 삭제 버튼 추가 */}
            {/* 의미: 각 이미지에 삭제 버튼을 제공하여 사용자가 이미지를 삭제할 수 있게 함 */}
            {/* 이유: 사용자 편의성을 높이고, 업로드된 이미지를 관리 가능 */}
            <button
              type="button"
              onClick={() => onDelete(index)}
              className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full"
              aria-label={`Delete image ${index}`}
            >
              X
            </button>
          </div>
        ))
      ) : (
        // 표시할 URL이 없을 때 대체 UI 제공
        // 의미: 사용자에게 이미지가 없음을 알림
        // 이유: UX를 개선하고, 빈 상태에서도 UI가 깨지지 않도록 함
        <p>No images to display</p>
      )}
    </div>
  );
}

export default ImagePreview;

// 동작 매커니즘:
// 1. ImagePreview는 previewUrls, imageUrls, onDelete를 props로 받음
// 2. previewUrls가 존재하면 이를 우선적으로 사용하여 미리보기를 표시
// 3. previewUrls가 없으면 imageUrls를 사용하여 서버에서 받은 이미지를 표시
// 4. URL 배열을 매핑하여 각 URL에 대해 img 태그와 삭제 버튼을 생성
// 5. 삭제 버튼 클릭 시 onDelete 함수를 호출하여 해당 인덱스의 이미지를 삭제
// 6. 배열이 비어있을 경우 "No images to display" 메시지를 표시하여 UX 개선
