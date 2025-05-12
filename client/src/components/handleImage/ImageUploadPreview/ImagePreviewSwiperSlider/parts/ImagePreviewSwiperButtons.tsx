import { Swiper as SwiperClass } from 'swiper/types';

interface ButtonProps {
  swiper: SwiperClass | null;
  isBeginning: boolean;
  isEnd: boolean;
}

export const SwiperPrevButton = ({ swiper, isBeginning }: ButtonProps) => (
  <button
    className="custom-swiper-button left-2"
    onClick={() => swiper?.slidePrev()}
    disabled={isBeginning}
    aria-label="이전 슬라이드"
  >
    ←
  </button>
);

export const SwiperNextButton = ({ swiper, isEnd }: ButtonProps) => (
  <button
    className="custom-swiper-button right-2"
    onClick={() => swiper?.slideNext()}
    disabled={isEnd}
    aria-label="다음 슬라이드"
  >
    →
  </button>
);
