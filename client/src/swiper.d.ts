// 📂 swiper.d.ts

import React from 'react';

import type { SwiperSlideProps, SwiperProps } from 'swiper/react';

declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperProps,
        HTMLElement
      >;
      'swiper-slide': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
        HTMLElement
      >;
    }
  }
}
