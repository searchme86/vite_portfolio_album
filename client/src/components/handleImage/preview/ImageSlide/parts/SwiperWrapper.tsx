import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ImageSlideImage from './ImageSlideImage';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function SwiperWrapper({ images }: { images: string[] }) {
  const safeImages = images || ['https://via.placeholder.com/150']; // @type {string[]}
  // @description 이미지 배열 설정, 기본값은 더미 URL
  // @reason Fallback 제공

  return (
    <ul className="w-full" aria-label="Image slide list">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-64"
      >
        {safeImages.map((image, index) => (
          <SwiperSlide key={index}>
            <ImageSlideImage imageSrc={image} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </ul>
  );
}

export default SwiperWrapper;
