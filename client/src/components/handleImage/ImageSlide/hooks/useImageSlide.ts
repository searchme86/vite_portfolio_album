// 1. useImageSlide 훅: 슬라이드에 사용할 이미지 목록 관리
// 2. 단일 책임: 슬라이드 이미지 준비, Context는 ImageUploadManager에서 제공
// import { useImageUploadContext } from '../../context/ImageUploadContext';
import { useImageUploadContext } from '../../context/ImageUploadContext';

// 훅 정의
// 슬라이드 이미지 데이터를 반환
export const useImageSlide = () => {
  // 1. useImageUploadContext 훅으로 Context 값 가져옴
  // 2. ImageUploadManager에서 Provider를 통해 전달된 값을 사용
  const { imageUrls } = useImageUploadContext();

  //====여기부터 수정됨====
  // imageUrls가 undefined일 경우 빈 배열로 초기화
  // 타입스크립트 대비: string[] 타입으로 예상
  const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : []; // 이미 존재하는 로직

  // imageUrls의 각 항목이 객체인지 확인하고 url 속성 추출, 없으면 빈 문자열 반환
  // 타입스크립트 대비: 각 item이 { url: string } 형태로 예상
  const validatedImageUrls = safeImageUrls.map((item) => {
    // item이 객체이고 url 속성이 문자열인지 확인
    const isValidItem =
      item && typeof item === 'object' && typeof item.url === 'string';
    // 유효하지 않은 경우 빈 문자열로 fallback
    const safeUrl = isValidItem ? item.url : '';
    // 디버깅: 각 url 값 확인
    // url이 올바르게 처리되었는지 확인
    console.log('useImageSlide - Processing item:', item, 'Safe URL:', safeUrl); // <!---여기추가
    return safeUrl;
  }); // <!---여기수정

  // slideImages가 빈 배열이거나 유효하지 않은 경우 기본 더미 데이터로 fallback
  // 타입스크립트 대비: string[] 타입으로 예상
  const slideImages =
    validatedImageUrls.length > 0
      ? validatedImageUrls
      : ['https://via.placeholder.com/150']; // <!---여기수정
  // 디버깅: slideImages 최종 결과 확인
  // slideImages가 올바르게 생성되었는지 확인
  console.log('useImageSlide - Final slideImages:', slideImages); // <!---여기추가
  //====여기까지 수정됨====

  // 기존 디버깅 로그 유지
  // slideImages 준비 완료 후 로그
  console.log('useImageSlide - Slide images prepared:', slideImages);

  // 슬라이드 이미지 데이터 반환
  // 객체 형태로 반환하여 구조분해할당 가능
  return { slideImages };
};
