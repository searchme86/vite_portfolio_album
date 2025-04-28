// src/components/handleImage/ImagePreview/components/ImageRemoveButtonComponent.jsx

// ===여기부터 수정됨====
// 1. ImageRemoveButtonComponent 컴포넌트 정의
// 2. 단일 책임: 이미지 삭제 버튼 렌더링 및 동작 처리
function ImageRemoveButtonComponent({
  index,
  handleRemoveImage,
  safeImageUrlsLength,
  safeMinImages,
}) {
  // 1. index가 유효한 숫자인지 확인
  // 2. 숫자가 아니면 0으로 폴백
  const safeIndex = Number.isInteger(index) ? index : 0;
  console.log('ImageRemoveButtonComponent - safeIndex:', safeIndex);

  // 1. handleRemoveImage가 함수인지 확인
  // 2. 함수가 아니면 빈 함수로 폴백
  const safeHandleRemoveImage =
    typeof handleRemoveImage === 'function'
      ? handleRemoveImage
      : () => {
          console.log(
            'ImageRemoveButtonComponent - Fallback handleRemoveImage called'
          );
        };
  console.log(
    'ImageRemoveButtonComponent - safeHandleRemoveImage:',
    safeHandleRemoveImage
  );

  // 1. safeImageUrlsLength가 유효한 숫자인지 확인
  // 2. 숫자가 아니면 0으로 폴백
  const safeImageUrlsLengthValue = Number.isInteger(safeImageUrlsLength)
    ? safeImageUrlsLength
    : 0;
  console.log(
    'ImageRemoveButtonComponent - safeImageUrlsLengthValue:',
    safeImageUrlsLengthValue
  );

  // 1. safeMinImages가 유효한 숫자인지 확인
  // 2. 숫자가 아니면 1로 폴백
  const safeMinImagesValue =
    Number.isInteger(safeMinImages) && safeMinImages > 0 ? safeMinImages : 1;
  console.log(
    'ImageRemoveButtonComponent - safeMinImagesValue:',
    safeMinImagesValue
  );

  // 1. 삭제 버튼 비활성화 여부 계산
  // 2. 삼항연산자 대신 if-else로 가독성 향상
  const isDisabled = safeImageUrlsLengthValue <= safeMinImagesValue;
  console.log('ImageRemoveButtonComponent - isDisabled:', isDisabled);

  // 1. 버튼 스타일 결정
  // 2. 삼항연산자 대신 if-else로 가독성 향상
  let buttonClassName = 'absolute top-2 right-2 rounded-full p-1 text-white ';
  if (isDisabled) {
    buttonClassName += 'bg-gray-400 cursor-not-allowed';
  } else {
    buttonClassName += 'bg-red-500 hover:bg-red-600';
  }
  console.log('ImageRemoveButtonComponent - buttonClassName:', buttonClassName);

  return (
    <button
      type="button"
      onClick={() => {
        // 1. 삭제 핸들러 호출
        // 2. 디버깅을 위해 호출 시점 출력
        console.log(
          'ImageRemoveButtonComponent - handleRemoveImage called for index:',
          safeIndex
        );
        safeHandleRemoveImage(safeIndex);
      }}
      className={buttonClassName}
      disabled={isDisabled}
      aria-label={`Remove image ${safeIndex + 1}`} // 1. 웹접근성을 위한 aria-label
      // 2. 스크린 리더가 버튼의 목적을 이해하도록
    >
      ✕
    </button>
  );
}

export default ImageRemoveButtonComponent;
// ===여기까지 수정됨====
