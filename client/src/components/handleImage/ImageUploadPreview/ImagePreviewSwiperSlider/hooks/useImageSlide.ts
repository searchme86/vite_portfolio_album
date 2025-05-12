// import { useImageUploadContext } from '../../context/ImageUploadContext'; // @type {Function} - 이미지 업로드 컨텍스트 훅
// // @description 컨텍스트에서 상태와 함수 가져오기
// // @reason 컨텍스트 기반 상태 관리

// // ImageUrl 타입 정의 (컨텍스트에서 재사용)
// export interface ImageUrl {
//   url: string; // @type {string} - 이미지 URL
//   // @description 이미지 주소
//   // @reason 표시
//   isNew: boolean; // @type {boolean} - 새 이미지 여부
//   // @description 새 이미지인지 확인
//   // @reason 상태 관리
// }

// // 훅 정의
// export const useImageSlide = () => {
//   const { imageUrls } = useImageUploadContext();

//   // imageUrls가 undefined나 null일 경우 빈 배열로 초기화
//   const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

//   // imageUrls의 각 항목이 객체인지 확인하고 url 속성 추출
//   const validatedImageUrls = safeImageUrls.map((item) => {
//     // item이 객체이고 url 속성이 문자열인지 확인
//     const isValidItem =
//       item && typeof item === 'object' && typeof item.url === 'string';
//     // 유효하지 않은 경우 빈 문자열로 fallback
//     return isValidItem ? item.url : '';
//   });

//   // 슬라이드 이미지 목록이 비어 있을 경우 기본 더미 이미지로 fallback
//   const slideImages =
//     validatedImageUrls.length > 0
//       ? validatedImageUrls
//       : ['https://via.placeholder.com/150']; // 더미 이미지 URL

//   return { slideImages }; // @type {{ slideImages: string[] }} - 슬라이드 이미지 반환
//   // @description 슬라이드 이미지 목록 반환
//   // @reason 상위 사용
// };
