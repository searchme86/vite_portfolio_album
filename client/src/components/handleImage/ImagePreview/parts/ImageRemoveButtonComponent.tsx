type Props = {
  index: number; // 타입: number - 이미지 인덱스
  // 의미: 이미지 순서
  // 이유: 삭제 대상 지정
  handleRemoveImage?: (index: number) => void; // 타입: (index: number) => void - 삭제 핸들러
  // 의미: 인덱스로 이미지 삭제
  // 이유: 사용자 행동 처리
  safeImageUrlsLength: number; // 타입: number - 이미지 개수
  // 의미: 현재 이미지 개수
  // 이유: 최소 이미지 검사
  safeMinImages: number; // 타입: number - 최소 이미지 수
  // 의미: 최소 이미지 수
  // 이유: 규칙 적용
};

// 이미지 삭제 버튼 컴포넌트
// 의미: 이미지 삭제 버튼 제공
// 이유: 사용자 인터랙션 처리
function ImageRemoveButtonComponent({
  index,
  handleRemoveImage,
  safeImageUrlsLength,
  safeMinImages,
}: Props) {
  const isDisabled = safeImageUrlsLength <= safeMinImages;
  // 타입: boolean - 비활성화 여부
  // 의미: 최소 이미지 수 이하일 때 비활성화
  // 이유: 규칙 준수

  const buttonClassName = [
    'absolute top-2 right-2 rounded-full p-1 text-white',
    isDisabled
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-red-500 hover:bg-red-600',
  ].join(' ');
  // 타입: string - 버튼 클래스
  // 의미: 조건부 스타일 적용
  // 이유: UI 조정

  return (
    <button
      type="button"
      onClick={() => handleRemoveImage?.(index)}
      className={buttonClassName}
      disabled={isDisabled}
      aria-label={`Remove image ${index + 1}`}
    >
      ✕
    </button>
  );
  // 타입: JSX.Element - 삭제 버튼 렌더링
  // 의미: 삭제 버튼 표시
  // 이유: 사용자 인터랙션
}

export default ImageRemoveButtonComponent;
