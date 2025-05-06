// FileInput 컴포넌트: 파일 입력 UI 제공
// 단일 책임: 파일 입력 요소 렌더링 및 이벤트 핸들링만 담당
function FileInput({ onChange, inputRef }) {
  // inputRef 값 확인을 위한 디버깅 로그
  // 디버깅: inputRef가 올바르게 전달되었는지 확인
  console.log('FileInput - inputRef:', inputRef);

  // 파일 입력 요소 렌더링, 웹접근성 고려
  // type="file"로 이미지 파일 선택, accept="image/*"로 이미지 파일만 허용
  return (
    <input
      type="file"
      accept="image/*"
      multiple
      ref={inputRef}
      onChange={onChange}
      className="hidden"
      id="image-upload"
      aria-label="Upload images for the post"
    />
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default FileInput;
