import ImagePreview from '../../ImagePreview/ImagePreview'; // @type {Component} - 이미지 미리보기 컴포넌트
// @description 이미지 미리보기 렌더링
// @reason UI 표시
import ImageSlide from '../../ImageSlide/ImageSlide'; // @type {Component} - 이미지 슬라이드 컴포넌트
// @description 이미지 슬라이드 렌더링
// @reason 대체 UI

interface ImageDisplaySelectorProps {
  showSlide?: boolean; // @type {boolean} - 슬라이드 표시 여부
  // @description 슬라이드 모드 여부
  // @reason 조건부 렌더링
}

function ImageDisplaySelector({ showSlide }: ImageDisplaySelectorProps) {
  // showSlide가 불리언인지 확인, 아니면 false로 대체
  const safeShowSlide = typeof showSlide === 'boolean' ? showSlide : false; // @type {boolean} - 안전한 상태
  // @description showSlide 유효성 체크
  // @reason 오류 방지
  // @analogy 도서관에서 옵션 확인

  // 디버깅: safeShowSlide 확인
  console.log('ImageDisplaySelector - safeShowSlide:', safeShowSlide); // @type {void} - 디버깅 로그
  // @description 상태 출력
  // @reason 디버깅
  // @analogy 도서관에서 옵션 점검

  // 디버깅: 컴포넌트 렌더링 확인
  console.log(
    'ImageDisplaySelector - Component rendered with showSlide:',
    safeShowSlide
  ); // @type {void} - 디버깅 로그
  // @description 렌더링 확인
  // @reason 디버깅
  // @analogy 도서관에서 표시 확인

  return (
    // 조건부 렌더링
    safeShowSlide ? <ImageSlide /> : <ImagePreview /> // @type {JSX.Element} - 렌더링 요소
    // @description 조건부 UI 렌더링
    // @reason 사용자 요구 반영
    // @analogy 도서관에서 책 또는 사진 선택
  );
}

// 컴포넌트 내보내기
export default ImageDisplaySelector;
