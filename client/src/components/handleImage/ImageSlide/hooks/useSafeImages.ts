// useSafeImages 훅: 이미지 배열을 안전하게 처리
// 단일 책임: 배열 안전성 검사 및 디버깅 로그 제공
function useSafeImages(images) {
  //====여기부터 수정됨====
  // images가 undefined이거나 배열이 아닌 경우 빈 배열로 fallback
  // 타입스크립트 대비: string[] 타입으로 예상
  const safeImages = Array.isArray(images) && images ? images : []; // 이미 존재하는 로직

  // safeImages의 각 항목이 문자열인지 확인, 유효하지 않은 항목은 제외
  // 타입스크립트 대비: string[] 타입으로 필터링
  const validatedImages = safeImages.filter(
    (image) => typeof image === 'string' && image !== ''
  ); // <!---여기추가
  // 디버깅: validatedImages 결과 확인
  // validatedImages가 올바르게 필터링되었는지 확인
  console.log('useSafeImages - validatedImages:', validatedImages); // <!---여기추가

  // 최종 결과가 빈 배열일 경우 기본 더미 이미지 배열로 fallback
  // 타입스크립트 대비: string[] 타입으로 예상
  const finalImages =
    validatedImages.length > 0
      ? validatedImages
      : ['https://via.placeholder.com/150']; // <!---여기추가
  // 디버깅: finalImages 결과 확인
  // finalImages가 올바르게 처리되었는지 확인
  console.log('useSafeImages - finalImages:', finalImages); // <!---여기추가
  //====여기까지 수정됨====

  // 기존 디버깅 로그 유지
  // safeImages 결과 확인
  console.log('useSafeImages - safeImages:', safeImages);

  // 처리된 safeImages 반환
  // 컴포넌트에서 안전하게 사용할 수 있도록 값 제공
  return finalImages;
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default useSafeImages;
