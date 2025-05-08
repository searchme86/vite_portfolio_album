interface MinimumImagesWarningComponentProps {
  safeImageUrlsLength: number; // @type {number} - 이미지 개수
  // @description 현재 이미지 개수
  // @reason 경고 확인
  safeMinImages: number; // @type {number} - 최소 이미지 수
  // @description 최소 이미지 수
  // @reason 규칙 적용
}

function MinimumImagesWarningComponent({
  safeImageUrlsLength,
  safeMinImages,
}: MinimumImagesWarningComponentProps) {
  const shouldShowWarning = safeImageUrlsLength === safeMinImages; // @type {boolean} - 경고 표시 여부
  // @description 이미지 개수가 최소와 같으면 경고 표시
  // @reason 사용자 피드백

  if (!shouldShowWarning) return null; // @type {null} - 경고 비활성화
  // @description 경고 조건 미충족 시 아무것도 렌더링 안 함
  // @reason 불필요한 UI 방지

  return (
    <p className="mt-2 text-sm text-red-500" role="alert" aria-live="polite">
      반드시 블로그에는 이미지가 {safeMinImages}개 이상 포함되어야 합니다.
    </p>
  ); // @type {JSX.Element} - 경고 메시지 렌더링
  // @description 경고 메시지 표시
  // @reason 사용자 피드백
}

export default MinimumImagesWarningComponent;
