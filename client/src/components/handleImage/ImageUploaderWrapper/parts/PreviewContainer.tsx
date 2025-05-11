// PreviewContainer 컴포넌트: 업로드된 이미지와 임시 파일 미리보기
// 의미: 이미지 미리보기 UI 제공
// 이유: 사용자에게 업로드 상태 시각화
import ImagePreviewList from '../../preview/Common/parts/ImagePreviewList';
import ImagePreviewTempList from '../../preview/Common/parts/ImagePreviewTempList';

function PreviewContainer() {
  return (
    <div className="flex gap-2">
      {/* 업로드된 이미지 표시 */}
      <ImagePreviewList />
      {/* 임시 파일 표시 */}
      <ImagePreviewTempList />
    </div>
  );
}

export default PreviewContainer;
