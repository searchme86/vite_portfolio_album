interface MinimumImagesWarningComponentProps {
  safeImageUrlsLength: number;
  safeMinImages: number;
}

function MinimumImagesWarningComponent({
  safeImageUrlsLength,
  safeMinImages,
}: MinimumImagesWarningComponentProps) {
  const shouldShowWarning = safeImageUrlsLength === safeMinImages;

  if (!shouldShowWarning) return null;

  return (
    <p className="mt-2 text-sm text-red-500" role="alert" aria-live="polite">
      반드시 블로그에는 이미지가 {safeMinImages}개 이상 포함되어야 합니다.
    </p>
  );
}

export default MinimumImagesWarningComponent;
