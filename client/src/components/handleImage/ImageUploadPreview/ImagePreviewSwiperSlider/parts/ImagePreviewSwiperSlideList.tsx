import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Keyboard,
  Mousewheel,
} from 'swiper/modules';
import { SwiperOptions, Swiper as SwiperClass } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/a11y';
import 'swiper/css/keyboard';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';
import '../styles/imagePreviewSwiperButtonStyle.css';

interface Props {
  children: ReactNode;
  setSwiperInstance: (swiper: SwiperClass) => void;
}

const swiperParams: SwiperOptions = {
  slidesPerView: 2, // @type {number}
  // @description 한 번에 보여줄 슬라이드 수
  // @reason UI 설정
  spaceBetween: 10, // @type {number}
  // @description 슬라이드 간 간격
  // @reason UI 스타일링
  direction: 'horizontal', // @type {'horizontal' | 'vertical'}
  // @description 슬라이드 방향
  // @reason 수평 슬라이드 보장
  a11y: {
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
  }, // @type {Object}
  // @description 접근성 메시지
  // @reason 사용자 접근성
  keyboard: { enabled: true, onlyInViewport: false }, // @type {Object}
  // @description 키보드 내비게이션 활성화
  // @reason 사용자 인터랙션
  breakpoints: {
    320: { slidesPerView: 2, spaceBetween: 20 },
    480: { slidesPerView: 3, spaceBetween: 30 },
    640: { slidesPerView: 4, spaceBetween: 40 },
  }, // @type {Object}
  // @description 반응형 설정
  // @reason 다양한 화면 크기 대응
  mousewheel: { invert: true }, // @type {Object}
  // @description 마우스 휠 설정
  // @reason 사용자 인터랙션
  pagination: {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  }, // @type {Object}
  // @description 페이지네이션 설정
  // @reason 사용자 인터랙션
  simulateTouch: true, // @type {boolean}
  // @description 드래그 허용
  // @reason 사용자 인터랙션
  touchRatio: 1, // @type {number}
  // @description 드래그 민감도
  // @reason 사용자 경험 개선
  touchAngle: 45, // @type {number}
  // @description 수직/수평 판단 각도
  // @reason 드래그 동작 최적화
  grabCursor: true, // @type {boolean}
  // @description 마우스 커서를 "grab" 모양으로
  // @reason 사용자 피드백
};

// ImagePreviewSwiperSlideList: Swiper 슬라이드 리스트
// 의미: Swiper 슬라이드 컨테이너
// 이유: 슬라이드 UI 구성
function ImagePreviewSwiperSlideList({ children, setSwiperInstance }: Props) {
  console.log('Swiper children:', children); // @type {void}
  // @description Swiper의 children 확인
  // @reason 디버깅

  return (
    <Swiper
      {...swiperParams}
      modules={[Navigation, Pagination, Scrollbar, Keyboard, A11y, Mousewheel]} // @type {Module[]}
      // @description Swiper 모듈 활성화
      // @reason 내비게이션, 페이지네이션 등 기능 제공
      onSwiper={(swiperInstance) => setSwiperInstance(swiperInstance)} // @type {Function}
      // @description Swiper 인스턴스 설정
      // @reason 부모 컴포넌트로 전달
      className="w-full" // @type {string}
      // @description Swiper 전체 너비 설정
      // @reason 레이아웃 보장
    >
      {React.Children.map(children, (child: ReactNode) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImagePreviewSwiperSlideList;
