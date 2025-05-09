// import { useImageUploadContext } from '../context/ImageUploadContext'; // @type {Function} - 이미지 업로드 컨텍스트 훅
// @description 컨텍스트에서 상태와 함수 가져오기
// @reason 컨텍스트 기반 상태 관리
import { useImageSlide } from './hooks/useImageSlide'; // @type {Function} - 이미지 슬라이드 훅
// @description 슬라이드 이미지 관리
// @reason 상태 분리
import useSafeImages from './hooks/useSafeImages'; // @type {Function} - 이미지 안전 처리 훅
// @description 이미지 데이터 검증
// @reason 안전한 데이터 전달
import SlideContainer from './parts/SlideContainer'; // @type {Component} - 슬라이드 컨테이너 컴포넌트
// @description 슬라이드 UI 컨테이너
// @reason UI 구성
import SlideFallback from './parts/SlideFallback'; // @type {Component} - 슬라이드 폴백 컴포넌트
// @description 이미지 없음 UI
// @reason 사용자 피드백
import SwiperWrapper from './SwiperWrapper'; // @type {Component} - Swiper 래퍼 컴포넌트

// @description Swiper 슬라이드 기능 제공
// @reason UI 구성

interface ImageUrlType {
  url: string; // @type {string} - 이미지 URL
  // @description 이미지 주소
  // @reason 표시
  isNew: boolean; // @type {boolean} - 새 이미지 여부
  // @description 새 이미지인지 확인
  // @reason 상태 관리
}

// ImageSlide 컴포넌트 정의
function ImageSlide() {
  // const { imageUrls } = useImageUploadContext(); // @type {{ url: string; isNew: boolean }[]} - 컨텍스트에서 이미지 URL 가져오기
  // @description 컨텍스트에서 이미지 목록 가져오기
  // @reason 상태 사용
  const { slideImages } = useImageSlide(); // @type {string[]} - 슬라이드 이미지 URL 배열
  // @description 슬라이드용 이미지 목록 가져오기
  // @reason 상태 사용

  // 이미지 URL이 있을 경우, 슬라이드 이미지가 없다면 기본 이미지로 fallback 처리

  const imageUrls = [{ url: 'default', isNew: false }]; // @type {string[]} - 기본 이미지 URL
  const safeImageUrls = useSafeImages(imageUrls || []); // @type {string[]} - 안전한 이미지 URL 배열
  // @description 컨텍스트 이미지 검증
  // @reason 안전한 데이터 사용
  const safeSlideImages = useSafeImages(slideImages || []); // @type {string[]} - 안전한 슬라이드 이미지 URL 배열
  // @description 슬라이드 이미지 검증
  // @reason 안전한 데이터 사용

  // 두 이미지 배열을 합침
  const finalImages = [...safeImageUrls, ...safeSlideImages]; // @type {string[]} - 최종 이미지 배열
  // @description 컨텍스트 이미지와 슬라이드 이미지를 결합
  // @reason 모든 이미지 표시

  return (
    <SlideContainer
      hasImages={finalImages.length > 0} // @type {boolean} - 이미지 존재 여부
      // @description 이미지 유무에 따라 UI 조정
      // @reason 사용자 피드백
      fallback={<SlideFallback message="No images available for slide." />}
    >
      <SwiperWrapper images={finalImages} />{' '}
      {/* @type {JSX.Element} - Swiper 래퍼 */}
      {/* @description 이미지 슬라이드 렌더링 */}
      {/* @reason UI 표시 */}
    </SlideContainer>
  ); // @type {JSX.Element} - 렌더링 결과
  // @description 슬라이드 UI 반환
  // @reason 화면 표시
}

export default ImageSlide;
