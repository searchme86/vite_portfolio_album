export const validateImages = (images) => {
  // 의미: 이미지 배열의 유효성을 검사하는 유틸리티 함수
  // 이유: 이미지 유효성 검사 로직 분리
  // 비유: 책 표지가 규격에 맞는지 확인하는 도구
  if (!Array.isArray(images)) {
    // 의미: 입력값이 배열인지 확인
    // 이유: 예상치 못한 입력 방어
    // 비유: 표지가 목록인지 확인
    return [];
  }

  const validImages = images
    .filter(
      // 의미: 유효한 이미지만 필터링
      (img) =>
        typeof img === 'string' && !img.startsWith('blob:') && img.trim() !== ''
    ) // 이유: 문자열이고, blob URL이 아니며, 빈 문자열이 아닌 이미지 선택
    // 비유: 표지가 실제 사진이고 임시 사진이 아닌지 확인
    .filter((img) => img.startsWith('https://ik.imagekit.io')); // 의미: ImageKit URL인지 확인
  // 이유: ImageKit에서 호스팅된 이미지만 허용
  // 비유: 도서관 규격에 맞는 표지만 사용

  console.log('validateImages - Valid images after filtering:', validImages); // 의미: 필터링된 이미지 로그
  // 이유: 디버깅 용이성
  // 비유: 사용 가능한 표지 확인

  return validImages; // 의미: 유효한 이미지 배열 반환
  // 이유: 서비스에서 사용
  // 비유: 규격에 맞는 표지 목록 넘겨줌
};
