// ImageUploadHeader 컴포넌트: 이미지 업로드 섹션의 제목 표시
// 단일 책임: 제목 렌더링 및 웹접근성 제공
function ImageUploadHeader() {
  // 디버깅: 컴포넌트 렌더링 확인
  // 컴포넌트가 올바르게 렌더링되었는지 확인
  console.log('ImageUploadHeader - Component rendered');

  return (
    // h2 태그로 제목 표시
    // role="heading"과 aria-level="2"로 웹접근성 강화
    <h2 className="mb-2 text-lg font-semibold" role="heading" aria-level="2">
      Images
    </h2>
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default ImageUploadHeader;
