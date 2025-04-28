// src/components/handleImage/ImagePreview/components/MinimumImagesWarningComponent.jsx

// ===여기부터 수정됨====
// 1. MinimumImagesWarningComponent 컴포넌트 정의
// 2. 단일 책임: 최소 이미지 수 경고 메시지 렌더링
function MinimumImagesWarningComponent({ safeImageUrlsLength, safeMinImages }) {
  // 1. safeImageUrlsLength가 유효한 숫자인지 확인
  // 2. 숫자가 아니면 0으로 폴백
  const safeImageUrlsLengthValue = Number.isInteger(safeImageUrlsLength)
    ? safeImageUrlsLength
    : 0;
  console.log(
    'MinimumImagesWarningComponent - safeImageUrlsLengthValue:',
    safeImageUrlsLengthValue
  );

  // 1. safeMinImages가 유효한 숫자인지 확인
  // 2. 숫자가 아니면 1로 폴백
  const safeMinImagesValue =
    Number.isInteger(safeMinImages) && safeMinImages > 0 ? safeMinImages : 1;
  console.log(
    'MinimumImagesWarningComponent - safeMinImagesValue:',
    safeMinImagesValue
  );

  // 1. 경고 메시지 표시 여부 확인
  // 2. 삼항연산자 대신 if로 가독성 향상
  const shouldShowWarning = safeImageUrlsLengthValue === safeMinImagesValue;
  console.log(
    'MinimumImagesWarningComponent - shouldShowWarning:',
    shouldShowWarning
  );

  // 1. 경고 메시지가 필요 없는 경우 null 반환
  // 2. 불필요한 렌더링 방지
  if (!shouldShowWarning) {
    return null;
  }

  return (
    <p
      className="mt-2 text-sm text-red-500"
      role="alert" // 1. 웹접근성을 위한 role 속성
      aria-live="polite" // 2. 스크린 리더가 동적으로 읽도록
    >
      반드시 블로그에는 이미지가 {safeMinImagesValue}개 이상 포함되어야 합니다.
    </p>
  );
}

export default MinimumImagesWarningComponent;
// ===여기까지 수정됨====
