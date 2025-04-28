// SlideContainer 컴포넌트: 슬라이드 UI의 최상위 컨테이너 역할
// 단일 책임: 슬라이드 UI의 레이아웃과 조건부 렌더링만 담당
function SlideContainer({ hasImages, children, fallback }) {
  //====여기부터 수정됨====
  // hasImages가 undefined이거나 boolean이 아닌 경우 false로 fallback 처리
  // 타입스크립트 대비: boolean 타입으로 명확히 처리
  const safeHasImages = typeof hasImages === 'boolean' ? hasImages : false; // <!---여기수정
  // 디버깅: safeHasImages 값 확인
  // safeHasImages가 올바르게 처리되었는지 확인
  console.log('SlideContainer - safeHasImages:', safeHasImages); // <!---여기추가

  // children이 undefined일 경우 빈 JSX 요소 반환
  // 타입스크립트 대비: React.ReactNode 타입으로 예상
  const safeChildren = children || <></>; // <!---여기추가
  // 디버깅: safeChildren 존재 여부 확인
  // children이 제대로 전달되었는지 확인
  console.log('SlideContainer - safeChildren exists:', !!safeChildren); // <!---여기추가

  // fallback이 undefined일 경우 기본 fallback UI 제공
  // 타입스크립트 대비: React.ReactNode 타입으로 예상
  const safeFallback = fallback || <div>No fallback provided</div>; // <!---여기추가
  // 디버깅: safeFallback 존재 여부 확인
  // fallback이 제대로 전달되었는지 확인
  console.log('SlideContainer - safeFallback exists:', !!safeFallback); // <!---여기추가
  //====여기까지 수정됨====

  // hasImages 값 확인을 위한 디버깅 로그
  // 디버깅: hasImages가 true인지 false인지 확인하여 조건부 렌더링 동작 점검
  console.log('SlideContainer - hasImages:', hasImages);

  // div 태그로 최상위 컨테이너 제공, mb-4 클래스로 하단 여백 추가
  // 웹접근성: section 태그로 변경하고 aria-label 추가하여 의미 전달
  return (
    <section className="mb-4" aria-label="Image slide container">
      {safeHasImages
        ? // 자식 컴포넌트(children)를 렌더링
          // children을 통해 SwiperWrapper와 같은 컴포넌트를 유연하게 삽입
          safeChildren
        : // fallback UI 렌더링
          // 이미지가 없을 때 사용자에게 정보를 제공하는 UI
          safeFallback}
    </section>
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default SlideContainer;
