interface MinimumImagesWarningComponentProps {
  safeImageUrlsLength: number; // 타입: number - 이미지 개수
  // 의미: 현재 이미지 개수
  // 이유: 경고 확인
  safeMinImages: number; // 타입: number - 최소 이미지 수
  // 의미: 최소 이미지 수
  // 이유: 규칙 적용
}

// 최소 이미지 경고 컴포넌트
// 의미: 최소 이미지 수를 충족하지 않을 때 경고 표시
// 이유: 사용자 피드백 제공
function MinimumImagesWarningComponent({
  safeImageUrlsLength,
  safeMinImages,
}: MinimumImagesWarningComponentProps) {
  const shouldShowWarning = safeImageUrlsLength === safeMinImages;
  // 타입: boolean - 경고 표시 여부
  // 의미: 이미지 개수가 최소와 같으면 경고 표시
  // 이유: 사용자 피드백

  if (!shouldShowWarning) return null;
  // 타입: null - 경고 비활성화
  // 의미: 경고 조건 미충족 시 아무것도 렌더링 안 함
  // 이유: 불필요한 UI 방지

  return (
    <p className="mt-2 text-sm text-red-500" role="alert" aria-live="polite">
      반드시 블로그에는 이미지가 {safeMinImages}개 이상 포함되어야 합니다.
    </p>
  );
  // 타입: JSX.Element - 경고 메시지 렌더링
  // 의미: 경고 메시지 표시
  // 이유: 사용자 피드백
}

export default MinimumImagesWarningComponent;
