// src/components/handleImage/ImagePreview/components/ImageDisplayComponent.jsx

// ===여기부터 수정됨====
// 1. ImageDisplayComponent 컴포넌트 정의
// 2. 단일 책임: 이미지 표시 또는 폴백 UI 렌더링
function ImageDisplayComponent({ url, index }) {
  // 1. url이 유효한 문자열인지 확인
  // 2. 문자열이 아니면 undefined로 폴백
  const safeUrl = typeof url === 'string' ? url : undefined;
  console.log('ImageDisplayComponent - safeUrl:', safeUrl);

  // 1. index가 유효한 숫자인지 확인
  // 2. 숫자가 아니면 0으로 폴백
  const safeIndex = Number.isInteger(index) ? index : 0;
  console.log('ImageDisplayComponent - safeIndex:', safeIndex);

  // 1. url이 존재하는 경우 이미지 렌더링
  // 2. 삼항연산자 대신 if-else로 가독성 향상
  if (safeUrl) {
    return (
      <img
        src={safeUrl}
        alt={`Post image ${safeIndex + 1}`} // 1. 웹접근성을 위한 alt 속성
        // 2. Tailwind CSS로 스타일링
        className="object-cover w-full h-32 rounded-md"
      />
    );
  }

  // 1. url이 없는 경우 폴백 UI 렌더링
  // 2. 사용자 경험 개선 및 웹접근성 고려
  return (
    <div
      className="flex items-center justify-center w-full h-32 bg-gray-200 rounded-md"
      role="alert" // 1. 웹접근성을 위한 role 속성
      aria-label="Image not available" // 2. 스크린 리더가 읽을 수 있도록
    >
      <p className="text-gray-500">Image not available</p>
    </div>
  );
}

export default ImageDisplayComponent;
// ===여기까지 수정됨====
