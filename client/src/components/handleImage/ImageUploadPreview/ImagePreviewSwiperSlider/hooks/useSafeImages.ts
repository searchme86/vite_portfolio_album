// // ImageUrl 타입 정의
// interface ImageUrlType {
//   url: string; // @type {string} - 이미지 URL
//   // @description 이미지 주소
//   // @reason 표시
//   isNew: boolean; // @type {boolean} - 새 이미지 여부
//   // @description 새 이미지인지 확인
//   // @reason 상태 관리
// }

// function useSafeImages(images: ImageUrlType[] | string[]): string[] {
//   // images가 배열이 아니거나 undefined일 경우 빈 배열로 처리
//   const safeImages: ImageUrlType[] | string[] = Array.isArray(images)
//     ? images
//     : []; // @type {ImageUrlType[] | string[]} - 안전한 이미지 배열
//   // @description images가 없으면 빈 배열로 처리
//   // @reason 애플리케이션 깨짐 방지

//   // 이미지가 ImageUrlType[]일 경우, 객체에서 url을 추출
//   if (
//     safeImages.length > 0 &&
//     typeof safeImages[0] === 'object' &&
//     'url' in safeImages[0]
//   ) {
//     const validatedImages = (safeImages as ImageUrlType[]).filter(
//       (image) => typeof image.url === 'string' && image.url !== ''
//     ); // @type {ImageUrlType[]} - 유효한 이미지 필터링
//     // @description url이 문자열이고 비어있지 않은 이미지 필터링
//     // @reason 데이터 검증

//     // 유효한 이미지가 있으면 URL 배열 반환, 없으면 더미 이미지 사용
//     return validatedImages.length > 0
//       ? validatedImages.map((image) => image.url) // @type {string[]} - URL 배열 추출
//       : // @description 유효한 이미지의 URL 추출
//         // @reason 데이터 정제
//         ['https://via.placeholder.com/150']; // @type {string[]} - 더미 이미지 배열
//     // @description 유효한 이미지가 없으면 더미 이미지 반환
//     // @reason 사용자 피드백
//   }

//   // 이미지가 string[]일 경우 그대로 사용
//   const validatedImages = (safeImages as string[]).filter(
//     (image) => typeof image === 'string' && image !== ''
//   ); // @type {string[]} - 유효한 문자열 필터링
//   // @description 문자열이고 비어있지 않은 이미지 필터링
//   // @reason 데이터 검증

//   // 최종 결과가 빈 배열일 경우 기본 더미 이미지 배열로 fallback
//   return validatedImages.length > 0
//     ? validatedImages // @type {string[]} - 유효한 이미지 배열
//     : // @description 유효한 이미지가 있으면 반환
//       // @reason 데이터 사용
//       ['https://via.placeholder.com/150']; // @type {string[]} - 더미 이미지 배열
//   // @description 유효한 이미지가 없으면 더미 이미지 반환
//   // @reason 사용자 피드백
// }

// export default useSafeImages;
