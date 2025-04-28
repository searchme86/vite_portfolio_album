// ImageDisplaySelector 컴포넌트: 이미지 미리보기 또는 슬라이드 선택 렌더링
// 단일 책임: showSlide prop에 따라 ImagePreview 또는 ImageSlide 렌더링
// import ImagePreview from '../../ImagePreview/ImagePreview';
import ImagePreview from '../../ImagePreview/ImagePreview';
// import ImageSlide from '../../ImageSlide/ImageSlide';
import ImageSlide from '../../ImageSlide/ImageSlide';

function ImageDisplaySelector({ showSlide }) {
  // showSlide가 불리언인지 확인, 아니면 false로 대체
  // 조건부 렌더링 오류 방지
  const safeShowSlide = typeof showSlide === 'boolean' ? showSlide : false;
  // 디버깅: safeShowSlide 확인
  // 값이 올바르게 설정되었는지 확인
  console.log('ImageDisplaySelector - safeShowSlide:', safeShowSlide);

  // 디버깅: 컴포넌트 렌더링 확인
  // 컴포넌트가 올바르게 렌더링되었는지 확인
  console.log(
    'ImageDisplaySelector - Component rendered with showSlide:',
    safeShowSlide
  );

  return (
    // 조건부 렌더링
    // safeShowSlide에 따라 ImageSlide 또는 ImagePreview 표시
    safeShowSlide ? <ImageSlide /> : <ImagePreview />
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default ImageDisplaySelector;
