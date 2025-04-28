// useImageUploaderKey 훅: ImageUploader의 key 생성
// 단일 책임: imageUploaderKey 생성 로직 제공
function useImageUploaderKey({ imageUrls }) {
  // imageUrls가 배열인지 확인, 아니면 빈 배열로 대체
  // map 오류 방지
  const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];
  // 디버깅: safeImageUrls 확인
  // 배열이 올바르게 처리되었는지 확인
  console.log('useImageUploaderKey - safeImageUrls:', safeImageUrls);

  // ImageUploader의 key 생성
  // imageUrls 변경 시 리마운트로 캐시 문제 방지
  const imageUploaderKey = safeImageUrls
    .map((item) => {
      // item이 객체인지 확인
      const safeItem = typeof item === 'object' && item !== null ? item : {};
      // item.url이 문자열인지 확인
      const url = typeof safeItem.url === 'string' ? safeItem.url : '';
      // 디버깅: url 확인
      // URL이 올바르게 추출되었는지 확인
      console.log('useImageUploaderKey - url:', url);
      return url;
    })
    .join('-');
  // imageUploaderKey가 문자열인지 확인
  const safeImageUploaderKey =
    typeof imageUploaderKey === 'string' ? imageUploaderKey : '';
  // 디버깅: safeImageUploaderKey 확인
  // 키가 올바르게 생성되었는지 확인
  console.log(
    'useImageUploaderKey - safeImageUploaderKey:',
    safeImageUploaderKey
  );

  // imageUploaderKey 반환
  // 객체 형태로 반환
  return { imageUploaderKey: safeImageUploaderKey };
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default useImageUploaderKey;
