import { useEffect, useState } from 'react';
import { Swiper as SwiperClass } from 'swiper/types';
import ImagePreviewSwiperSlideList from './parts/ImagePreviewSwiperSlideList';
import ImagePreviewSwiperSlideItem from './parts/ImagePreviewSwiperSlideItem';
import {
  SwiperNextButton,
  SwiperPrevButton,
} from './parts/ImagePreviewSwiperButtons';
import { useImageFilePreviewUrls } from '../ImagePreview/hooks/useImageFilePreviewUrls';

// ImagePreviewSwiperSlider: Swiper 슬라이드 컴포넌트
// 의미: 이미지 개수가 maxImages를 초과할 때 슬라이드 형태로 표시
// 이유: 많은 이미지를 효과적으로 표시
function ImagePreviewSwiperSlider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  ); // @type {SwiperClass | null}
  // @description Swiper 인스턴스 상태
  // @reason Swiper 제어
  const [isBeginning, setIsBeginning] = useState(true); // @type {boolean}
  // @description 슬라이드 처음 위치 여부
  // @reason 내비게이션 버튼 상태
  const [isEnd, setIsEnd] = useState(false); // @type {boolean}
  // @description 슬라이드 끝 위치 여부
  // @reason 내비게이션 버튼 상태

  const { previewUrls, formattedImageUrls } = useImageFilePreviewUrls(); // @type {{ previewUrls: string[], formattedImageUrls: string[] }}
  // @description 미리보기 URL과 업로드된 이미지 URL 가져오기
  // @reason 슬라이드 이미지 데이터

  const images = [...previewUrls, ...formattedImageUrls]; // @type {string[]}
  // @description 업로드 중인 이미지와 업로드된 이미지를 결합
  // @reason 모든 이미지를 슬라이드에 표시

  useEffect(() => {
    if (!swiperInstance) return; // @type {void}
    // @description Swiper 인스턴스가 없으면 실행 중지
    // @reason 초기화 전 실행 방지

    const updateNavState = () => {
      setIsBeginning(swiperInstance.isBeginning); // @type {void}
      // @description 슬라이드 처음 위치 상태 업데이트
      // @reason 내비게이션 버튼 상태 반영
      setIsEnd(swiperInstance.isEnd); // @type {void}
      // @description 슬라이드 끝 위치 상태 업데이트
      // @reason 내비게이션 버튼 상태 반영
    };

    swiperInstance.on('slideChange', updateNavState); // @type {void}
    // @description 슬라이드 변경 시 내비게이션 상태 업데이트
    // @reason 사용자 인터랙션 반영
    updateNavState(); // @type {void}
    // @description 초기 내비게이션 상태 설정
    // @reason 초기화 시 상태 반영

    return () => {
      swiperInstance.off('slideChange', updateNavState); // @type {void}
      // @description 이벤트 리스너 제거
      // @reason 메모리 누수 방지
    };
  }, [swiperInstance]);

  return (
    <div className="relative flex flex-row w-full">
      {/* 이전 버튼 */}
      <SwiperPrevButton
        swiper={swiperInstance}
        isBeginning={isBeginning}
        isEnd={isEnd}
      />
      {/* 슬라이더 리스트 */}
      <div className="w-full">
        <ImagePreviewSwiperSlideList setSwiperInstance={setSwiperInstance}>
          {images.map((url, index) => (
            <ImagePreviewSwiperSlideItem key={index}>
              <div className="flex-shrink-0">
                <img
                  src={url}
                  alt={`slide-${index}`}
                  className="object-cover w-full h-auto max-h-48"
                />
              </div>
            </ImagePreviewSwiperSlideItem>
          ))}
        </ImagePreviewSwiperSlideList>
      </div>
      {/* 다음 버튼 */}
      <SwiperNextButton
        swiper={swiperInstance}
        isBeginning={isBeginning}
        isEnd={isEnd}
      />
      <div className="absolute bottom-[-2rem] w-full flex flex-col items-center gap-2">
        <div className="text-sm font-medium text-gray-700 custom-swiper-pagination-text" />
        <div className="flex gap-2 custom-swiper-pagination-dots" />
      </div>
    </div>
  );
}

export default ImagePreviewSwiperSlider;
