import { ReactNode } from 'react'; // @type {Library} - React 라이브러리
// @description React 컴포넌트 및 타입 정의
// @reason JSX 및 타입 사용

interface SlideContainerProps {
  hasImages: boolean; // @type {boolean} - 이미지 존재 여부
  // @description 이미지 유무에 따라 UI 조정
  // @reason 사용자 피드백
  children?: ReactNode; // @type {ReactNode} - 자식 요소
  // @description 슬라이드 컨텐츠
  // @reason UI 구성
  fallback?: ReactNode; // @type {ReactNode} - 폴백 UI
  // @description 이미지 없음 UI
  // @reason 사용자 피드백
}

function SlideContainer({
  hasImages,
  children,
  fallback,
}: SlideContainerProps) {
  // hasImages가 undefined이거나 boolean이 아닌 경우 false로 fallback 처리
  const safeHasImages: boolean =
    typeof hasImages === 'boolean' ? hasImages : false; // @type {boolean} - 안전한 이미지 존재 여부
  // @description hasImages가 유효하지 않으면 false로 처리
  // @reason 애플리케이션 깨짐 방지

  // children이 undefined일 경우 빈 JSX 요소 반환
  const safeChildren: ReactNode = children || <></>; // @type {ReactNode} - 안전한 자식 요소
  // @description children이 없으면 빈 요소 반환
  // @reason 애플리케이션 깨짐 방지

  // fallback이 undefined일 경우 기본 fallback UI 제공
  const safeFallback: ReactNode = fallback || <div>No fallback provided</div>; // @type {ReactNode} - 안전한 폴백 UI
  // @description fallback이 없으면 기본 UI 제공
  // @reason 사용자 피드백

  return (
    <section className="mb-4" aria-label="Image slide container">
      {safeHasImages ? safeChildren : safeFallback}{' '}
      {/* @type {JSX.Element} - 조건부 렌더링 */}
      {/* @description 이미지 유무에 따라 자식 요소 또는 폴백 UI 렌더링 */}
      {/* @reason UI 조정 */}
    </section>
  ); // @type {JSX.Element} - 렌더링 결과
  // @description 슬라이드 컨테이너 UI 반환
  // @reason 화면 표시
}

export default SlideContainer;
