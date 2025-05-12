import { ReactNode } from 'react';

// Props: 슬라이드 아이템 콘텐츠
interface ItemProps {
  children: ReactNode; // @type {ReactNode}
  // @description 슬라이드에 표시할 콘텐츠
  // @reason 콘텐츠 전달
}

// ImagePreviewSwiperSlideItem: 슬라이드 아이템 래퍼
// 의미: 개별 슬라이드 콘텐츠를 감싸는 래퍼
// 이유: SwiperSlide로 변환용
function ImagePreviewSwiperSlideItem({ children }: ItemProps) {
  return <>{children}</>; // @type {JSX.Element}
  // @description 전달된 콘텐츠 반환
  // @reason SwiperSlide로 감싸기 위함
}

export default ImagePreviewSwiperSlideItem;
