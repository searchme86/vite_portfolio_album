// ImageSlide 컴포넌트: 이미지 슬라이드 UI 제공
// 단일 책임: 공통 컴포넌트와 훅을 조합하여 슬라이드 UI 구성
// import { useImageUploadContext } from '../context/ImageUploadContext';
import { useImageUploadContext } from '../context/ImageUploadContext';
import { useImageSlide } from './hooks/useImageSlide';
import useSafeImages from './hooks/useSafeImages';
import SlideContainer from './parts/SlideContainer';
import SlideFallback from './parts/SlideFallback';
// import SwiperWrapper from './SwiperWrapper';
import SwiperWrapper from './SwiperWrapper';

// ImageSlide 컴포넌트 정의
// 공통 컴포넌트와 훅을 사용하여 조립
function ImageSlide() {
  const { imageUrls } = useImageUploadContext();
  const { slideImages } = useImageSlide();

  // 이미지 URL이 있을 경우, 슬라이드 이미지가 없다면 기본 이미지로 fallback 처리
  const safeImageUrls = useSafeImages(imageUrls || []);
  const safeSlideImages = useSafeImages(slideImages || []);

  // 두 이미지를 합칠 수 있는 방법을 고민해본다.
  const finalImages = [...safeImageUrls, ...safeSlideImages];

  return (
    <SlideContainer
      hasImages={finalImages.length > 0}
      fallback={<SlideFallback message="No images available for slide." />}
    >
      <SwiperWrapper images={finalImages} />
    </SlideContainer>
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default ImageSlide;
