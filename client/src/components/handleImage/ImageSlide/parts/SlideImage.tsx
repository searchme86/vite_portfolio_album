interface SlideImageProps {
  imageSrc?: string; // @type {string} - 이미지 URL
  // @description 이미지 주소
  // @reason 표시
  index?: number; // @type {number} - 이미지 인덱스
  // @description 이미지 순서
  // @reason 접근성
}

function SlideImage({ imageSrc, index }: SlideImageProps) {
  // imageSrc가 undefined이거나 문자열이 아닌 경우 기본 이미지 URL로 fallback
  const safeImageSrc: string =
    typeof imageSrc === 'string' && imageSrc
      ? imageSrc
      : 'https://via.placeholder.com/150'; // @type {string} - 안전한 이미지 URL
  // @description imageSrc가 유효하지 않으면 더미 이미지 사용
  // @reason 애플리케이션 깨짐 방지

  // index가 undefined이거나 숫자가 아닌 경우 0으로 fallback
  const safeIndex: number =
    typeof index === 'number' && !isNaN(index) ? index : 0; // @type {number} - 안전한 인덱스
  // @description index가 유효하지 않으면 0으로 처리
  // @reason 애플리케이션 깨짐 방지

  return (
    <img
      src={safeImageSrc} // @type {string} - 이미지 URL
      // @description 검증된 이미지 URL 사용
      // @reason 이미지 표시
      alt={`Slide image ${safeIndex + 1}`} // @type {string} - 접근성 설명
      // @description 스크린 리더를 위한 설명
      // @reason 접근성
      className="object-cover w-full h-full rounded-md" // @type {string} - 스타일 클래스
      // @description 이미지 스타일 적용
      // @reason UI 스타일링
    />
  ); // @type {JSX.Element} - 이미지 렌더링
  // @description 슬라이드 이미지 UI 반환
  // @reason 화면 표시
}

export default SlideImage;
