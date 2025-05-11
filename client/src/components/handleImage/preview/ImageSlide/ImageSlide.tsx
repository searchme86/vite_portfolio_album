import ImageSlideContainer from './parts/ImageSlideContainer';
import SwiperWrapper from './parts/SwiperWrapper';
import ImageSlideFallback from './parts/ImageSlideFallback';
import useImageSlideImages from './hooks/useImageSlideImages';

function ImageSlide() {
  const { imageUrls } = useImageSlideImages(); // @type {ImageUrl[]}
  // @description 이미지 URL 배열 가져오기
  // @reason 상태 기반 렌더링

  return (
    <ImageSlideContainer>
      {imageUrls.length > 0 ? (
        <SwiperWrapper images={imageUrls} />
      ) : (
        <ImageSlideFallback />
      )}
    </ImageSlideContainer>
  );
}

export default ImageSlide;
