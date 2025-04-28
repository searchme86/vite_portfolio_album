// SwiperWrapper 컴포넌트: Swiper 라이브러리 래퍼
// 단일 책임: Swiper 슬라이드 기능 제공 및 공통 컴포넌트 사용
import { Swiper, SwiperSlide } from 'swiper/react';
import useSafeImages from './hooks/useSafeImages';
import SlideImage from './components/SlideImage';
import SlideFallback from './components/SlideFallback';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

// SwiperWrapper 컴포넌트 정의
// images와 slideHeight를 props로 받음
function SwiperWrapper({ images, slideHeight = 'h-64' }) {
  //====여기부터 수정됨====
  // images가 undefined일 경우 빈 배열로 fallback
  // 타입스크립트 대비: string[] 타입으로 예상
  const safeImagesProp = images || []; // <!---여기추가
  // 디버깅: safeImagesProp 확인
  // images가 올바르게 전달되었는지 확인
  console.log('SwiperWrapper - safeImagesProp:', safeImagesProp); // <!---여기추가

  // slideHeight가 undefined이거나 문자열이 아닌 경우 기본값 "h-64"로 fallback
  // 타입스크립트 대비: string 타입으로 명확히 처리
  const safeSlideHeight =
    typeof slideHeight === 'string' && slideHeight ? slideHeight : 'h-64'; // <!---여기수정
  // 디버깅: safeSlideHeight 확인
  // safeSlideHeight가 올바르게 처리되었는지 확인
  console.log('SwiperWrapper - safeSlideHeight:', safeSlideHeight); // 이미 존재하는 로그
  //====여기까지 수정됨====

  // images를 안전하게 처리
  // useSafeImages 훅으로 배열 안전성 보장
  const safeImages = useSafeImages(safeImagesProp);

  // Swiper 컴포넌트로 슬라이드 기능 제공
  // Navigation과 Pagination 모듈 사용, 접근성 고려
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className={`w-full ${safeSlideHeight}`}
      aria-label="Image slide carousel"
    >
      {safeImages.length > 0 ? (
        // safeImages가 있을 경우 각 이미지를 SwiperSlide로 렌더링
        // SlideImage 컴포넌트 사용
        safeImages.map((image, index) => (
          <SwiperSlide key={index}>
            {image ? (
              <SlideImage imageSrc={image} index={index} />
            ) : (
              <SlideFallback message="Image not available" />
            )}
          </SwiperSlide>
        ))
      ) : (
        // safeImages가 없을 경우 fallback UI 렌더링
        // SlideFallback 컴포넌트 사용
        <SwiperSlide>
          <SlideFallback message="No images available for slide." />
        </SwiperSlide>
      )}
    </Swiper>
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default SwiperWrapper;
