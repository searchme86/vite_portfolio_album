// ImageSlide 컴포넌트: 이미지 슬라이드 UI 제공
// 단일 책임: 공통 컴포넌트와 훅을 조합하여 슬라이드 UI 구성
// import { useImageUploadContext } from '../context/ImageUploadContext';
import { useImageUploadContext } from '../context/ImageUploadContext';
import { useImageSlide } from './hooks/useImageSlide';
import useSafeImages from './hooks/useSafeImages';
import SlideContainer from './components/SlideContainer';
import SlideFallback from './components/SlideFallback';
// import SwiperWrapper from './SwiperWrapper';
import SwiperWrapper from './SwiperWrapper';

// ImageSlide 컴포넌트 정의
// 공통 컴포넌트와 훅을 사용하여 조립
function ImageSlide() {
  // Context에서 imageUrls 가져오기
  // ImageUploadManager에서 제공된 값을 사용
  const { imageUrls } = useImageUploadContext();

  //====여기부터 수정됨====
  // imageUrls가 undefined일 경우 빈 배열로 fallback
  // 타입스크립트 대비: string[] 타입으로 예상
  const safeImageUrlsFromContext = imageUrls || []; // <!---여기추가
  // 디버깅: safeImageUrlsFromContext 확인
  // imageUrls가 올바르게 처리되었는지 확인
  console.log(
    'ImageSlide - safeImageUrlsFromContext:',
    safeImageUrlsFromContext
  ); // <!---여기추가

  // useImageSlide 훅으로 슬라이드 이미지 데이터 가져오기
  // slideImages가 undefined일 경우 빈 배열로 fallback
  const { slideImages } = useImageSlide() || { slideImages: [] }; // <!---여기수정
  // 디버깅: slideImages 확인
  // slideImages가 올바르게 반환되었는지 확인
  console.log('ImageSlide - slideImages from useImageSlide:', slideImages); // <!---여기추가
  //====여기까지 수정됨====

  // imageUrls를 안전하게 처리
  // useSafeImages 훅으로 배열 안전성 보장
  const safeImageUrls = useSafeImages(safeImageUrlsFromContext);

  // slideImages를 안전하게 처리
  // useSafeImages 훅으로 배열 안전성 보장
  const safeSlideImages = useSafeImages(slideImages);

  // 디버깅: safeImageUrls와 safeSlideImages 확인
  // 두 배열이 올바르게 처리되었는지 확인
  console.log('ImageSlide - safeImageUrls:', safeImageUrls);
  console.log('ImageSlide - safeSlideImages:', safeSlideImages);

  // SlideContainer를 사용하여 조건부 렌더링
  // hasImages로 이미지 존재 여부 판단, SwiperWrapper 또는 fallback 렌더링
  return (
    <SlideContainer
      hasImages={safeImageUrls.length > 0}
      fallback={<SlideFallback message="No images available for slide." />}
    >
      <SwiperWrapper images={safeSlideImages} />
    </SlideContainer>
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default ImageSlide;
