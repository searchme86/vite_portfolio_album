// SlideImage 컴포넌트: 개별 슬라이드 이미지를 렌더링
// 단일 책임: 이미지 렌더링과 접근성 처리만 담당
function SlideImage({ imageSrc, index }) {
  //====여기부터 수정됨====
  // imageSrc가 undefined이거나 문자열이 아닌 경우 기본 이미지 URL로 fallback
  // 타입스크립트 대비: string 타입으로 명확히 처리
  const safeImageSrc =
    typeof imageSrc === 'string' && imageSrc
      ? imageSrc
      : 'https://via.placeholder.com/150'; // <!---여기수정
  // 디버깅: safeImageSrc 값 확인
  // safeImageSrc가 올바르게 처리되었는지 확인
  console.log(`SlideImage - safeImageSrc for index ${index}:`, safeImageSrc); // <!---여기추가

  // index가 undefined이거나 숫자가 아닌 경우 0으로 fallback
  // 타입스크립트 대비: number 타입으로 명확히 처리
  const safeIndex = typeof index === 'number' && !isNaN(index) ? index : 0; // <!---여기추가
  // 디버깅: safeIndex 값 확인
  // safeIndex가 올바르게 처리되었는지 확인
  console.log('SlideImage - safeIndex:', safeIndex); // <!---여기추가
  //====여기까지 수정됨====

  // imageSrc 값 확인을 위한 디버깅 로그
  // 디버깅: imageSrc가 올바른 URL인지 확인
  console.log(`SlideImage - imageSrc for index ${safeIndex}:`, safeImageSrc);

  // img 태그로 이미지 렌더링, alt 속성으로 접근성 제공
  // object-cover로 이미지 비율 유지, rounded-md로 시각적 개선
  return (
    <img
      src={safeImageSrc}
      alt={`Slide image ${safeIndex + 1}`}
      className="object-cover w-full h-full rounded-md"
    />
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default SlideImage;
