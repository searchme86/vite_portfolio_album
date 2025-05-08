type Props = {
  index: number; // @type {number} - 이미지 인덱스
  // @description 이미지 순서
  // @reason 삭제 대상 지정
  handleRemoveImage?: (index: number) => void; // @type {(index: number) => void} - 삭제 핸들러
  // @description 인덱스로 이미지 삭제
  // @reason 사용자 행동 처리
  safeImageUrlsLength: number; // @type {number} - 이미지 개수
  // @description 현재 이미지 개수
  // @reason 최소 이미지 검사
  safeMinImages: number; // @type {number} - 최소 이미지 수
  // @description 최소 이미지 수
  // @reason 규칙 적용
};

function ImageRemoveButtonComponent({
  index,
  handleRemoveImage,
  safeImageUrlsLength,
  safeMinImages,
}: Props) {
  const isDisabled = safeImageUrlsLength <= safeMinImages; // @type {boolean} - 비활성화 여부
  // @description 최소 이미지 수 이하일 때 비활성화
  // @reason 규칙 준수

  const buttonClassName = [
    'absolute top-2 right-2 rounded-full p-1 text-white',
    isDisabled
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-red-500 hover:bg-red-600',
  ].join(' '); // @type {string} - 버튼 클래스
  // @description 조건부 스타일 적용
  // @reason UI 조정

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
  ); // @type {JSX.Element} - 삭제 버튼 렌더링
  // @description 삭제 버튼 표시
  // @reason 사용자 인터랙션
}

export default ImageRemoveButtonComponent;
