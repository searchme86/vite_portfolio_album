// UploadButton 컴포넌트: 업로드 버튼 UI 제공
// 단일 책임: 버튼 렌더링 및 클릭 이벤트만 담당
function UploadButton({ onClick, isUploading, buttonText }) {
  // isUploading과 buttonText 값 확인을 위한 디버깅 로그
  // 디버깅: props가 올바르게 전달되었는지 확인
  console.log('UploadButton - isUploading:', isUploading);
  console.log('UploadButton - buttonText:', buttonText);

  // 버튼 요소 렌더링, 웹접근성 고려
  // disabled 상태와 스타일링으로 사용자 경험 개선
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isUploading}
      className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isUploading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      aria-label="Add or update images for the post"
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {buttonText}
    </button>
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default UploadButton;
