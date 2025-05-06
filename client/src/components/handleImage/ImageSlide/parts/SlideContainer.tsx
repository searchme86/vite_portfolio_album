import React, { ReactNode } from 'react';

interface SlideContainerProps {
  hasImages: boolean;
  children?: ReactNode;
  fallback?: ReactNode;
}

function SlideContainer({
  hasImages,
  children,
  fallback,
}: SlideContainerProps) {
  // hasImages가 undefined이거나 boolean이 아닌 경우 false로 fallback 처리
  const safeHasImages: boolean =
    typeof hasImages === 'boolean' ? hasImages : false;

  // children이 undefined일 경우 빈 JSX 요소 반환
  const safeChildren: ReactNode = children || <></>;

  // fallback이 undefined일 경우 기본 fallback UI 제공
  const safeFallback: ReactNode = fallback || <div>No fallback provided</div>;

  return (
    <section className="mb-4" aria-label="Image slide container">
      {safeHasImages ? safeChildren : safeFallback}
    </section>
  );
}

export default SlideContainer;
