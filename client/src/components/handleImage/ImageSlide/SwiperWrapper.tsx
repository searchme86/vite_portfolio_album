import { Swiper, SwiperSlide } from 'swiper/react'; // @type {Component} - Swiper 컴포넌트
// @description 슬라이드 기능 제공
// @reason UI 구성
import useSafeImages from './hooks/useSafeImages'; // @type {Function} - 이미지 안전 처리 훅
// @description 이미지 데이터 검증
// @reason 안전한 데이터 전달
import SlideImage from './parts/SlideImage'; // @type {Component} - 슬라이드 이미지 컴포넌트
// @description 개별 이미지 렌더링
// @reason UI 구성
import SlideFallback from './parts/SlideFallback'; // @type {Component} - 슬라이드 폴백 컴포넌트
// @description 이미지 없음 UI
// @reason 사용자 피드백
import 'swiper/css'; // @type {CSS} - Swiper 기본 스타일
// @description Swiper 기본 스타일 적용
// @reason UI 스타일링
import 'swiper/css/navigation'; // @type {CSS} - Swiper 내비게이션 스타일
// @description 내비게이션 스타일 적용
// @reason UI 스타일링
import 'swiper/css/pagination'; // @type {CSS} - Swiper 페이지네이션 스타일
// @description 페이지네이션 스타일 적용
// @reason UI 스타일링
import { Navigation, Pagination } from 'swiper/modules'; // @type {Module} - Swiper 모듈
// @description 내비게이션 및 페이지네이션 기능
// @reason 사용자 인터랙션

interface SwiperWrapperProps {
  images: string[]; // @type {string[]} - 이미지 URL 배열
  // @description 슬라이드에 표시할 이미지 목록
  // @reason 데이터 전달
  slideHeight?: string; // @type {string} - 슬라이드 높이
  // @description 슬라이드 높이 스타일
  // @reason UI 스타일링
}

function SwiperWrapper({ images, slideHeight = 'h-64' }: SwiperWrapperProps) {
  // images가 undefined일 경우 빈 배열로 fallback
  const safeImagesProp = images || []; // @type {string[]} - 안전한 이미지 배열
  // @description images가 없으면 빈 배열로 처리
  // @reason 애플리케이션 깨짐 방지
  console.log('SwiperWrapper - safeImagesProp:', safeImagesProp); // @type {void} - 디버깅 로그
  // @description 이미지 배열 확인
  // @reason 데이터 검증

  // slideHeight가 유효하지 않은 경우 기본값으로 fallback
  const safeSlideHeight =
    typeof slideHeight === 'string' && slideHeight ? slideHeight : 'h-64'; // @type {string} - 안전한 슬라이드 높이
  // @description slideHeight가 유효하지 않으면 기본값 사용
  // @reason 애플리케이션 깨짐 방지
  console.log('SwiperWrapper - safeSlideHeight:', safeSlideHeight); // @type {void} - 디버깅 로그
  // @description 슬라이드 높이 확인
  // @reason 데이터 검증

  // images를 안전하게 처리
  const safeImages = useSafeImages(safeImagesProp); // @type {string[]} - 검증된 이미지 배열
  // @description 이미지 배열 검증
  // @reason 안전한 데이터 사용

  return (
    <Swiper
      modules={[Navigation, Pagination]} // @type {Module[]} - Swiper 모듈
      // @description 내비게이션 및 페이지네이션 기능 활성화
      // @reason 사용자 인터랙션
      spaceBetween={10} // @type {number} - 슬라이드 간 간격
      // @description 슬라이드 간격 설정
      // @reason UI 스타일링
      slidesPerView={1} // @type {number} - 한 번에 보여줄 슬라이드 수
      // @description 한 번에 하나의 슬라이드 표시
      // @reason UI 설정
      navigation // @type {boolean} - 내비게이션 활성화
      // @description 내비게이션 버튼 표시
      // @reason 사용자 인터랙션
      pagination={{ clickable: true }} // @type {Object} - 페이지네이션 설정
      // @description 클릭 가능한 페이지네이션 표시
      // @reason 사용자 인터랙션
      className={`w-full ${safeSlideHeight}`} // @type {string} - 스타일 클래스
      // @description 슬라이드 크기 및 스타일 적용
      // @reason UI 스타일링
      aria-label="Image slide carousel" // @type {string} - 접근성 속성
      // @description 스크린 리더를 위한 설명
      // @reason 접근성
    >
      {safeImages.length > 0 ? (
        safeImages.map((image, index) => (
          <SwiperSlide key={index}>
            {image ? (
              <SlideImage imageSrc={image} index={index} /> // @type {JSX.Element} - 이미지 렌더링
            ) : (
              // @description 유효한 이미지 렌더링
              // @reason UI 표시
              <SlideFallback message="Image not available" /> // @type {JSX.Element} - 폴백 UI
              // @description 이미지 없음 UI
              // @reason 사용자 피드백
            )}
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <SlideFallback message="No images available for slide." />
        </SwiperSlide>
      )}
    </Swiper>
  ); // @type {JSX.Element} - Swiper 컴포넌트 렌더링
  // @description 슬라이드 UI 반환
  // @reason 화면 표시
}

export default SwiperWrapper;
