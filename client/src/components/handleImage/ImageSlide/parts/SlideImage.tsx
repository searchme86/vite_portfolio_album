interface SlideImageProps {
  imageSrc?: string;
  index?: number;
}

function SlideImage({ imageSrc, index }: SlideImageProps) {
  // imageSrc가 undefined이거나 문자열이 아닌 경우 기본 이미지 URL로 fallback
  const safeImageSrc =
    typeof imageSrc === 'string' && imageSrc
      ? imageSrc
      : 'https://via.placeholder.com/150';

  // index가 undefined이거나 숫자가 아닌 경우 0으로 fallback
  const safeIndex: number =
    typeof index === 'number' && !isNaN(index) ? index : 0;

  return (
    <img
      src={safeImageSrc}
      alt={`Slide image ${safeIndex + 1}`}
      className="object-cover w-full h-full rounded-md"
    />
  );
}

export default SlideImage;
