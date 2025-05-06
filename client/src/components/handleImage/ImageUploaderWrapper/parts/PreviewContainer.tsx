// PreviewContainer 컴포넌트: 이미지 미리보기 컨테이너 UI 제공
// 단일 책임: 미리보기 이미지 목록 렌더링만 담당
import ImagePreview from '../../ImagePreview/ImagePreview';

// PreviewContainer 컴포넌트 정의
// previewUrls와 관련 props를 받아 렌더링
function PreviewContainer({ previewUrls, onDelete, isUploading }) {
  // previewUrls 값 확인을 위한 디버깅 로그
  // 디버깅: previewUrls가 올바르게 전달되었는지 확인
  console.log('PreviewContainer - previewUrls:', previewUrls);

  // flex 컨테이너로 미리보기 이미지 목록 렌더링
  // ImagePreview 컴포넌트 사용
  return (
    <div className="flex flex-wrap gap-4">
      {previewUrls.map((url, index) => (
        <ImagePreview
          key={index}
          imageUrl={url}
          onDelete={() => onDelete(index)}
          isUploading={isUploading}
        />
      ))}
    </div>
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default PreviewContainer;
