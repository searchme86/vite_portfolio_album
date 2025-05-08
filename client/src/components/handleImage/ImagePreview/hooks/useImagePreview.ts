import {
  useImageUploadContext,
  ImageUrl,
} from '../../context/ImageUploadContext'; // @type {Function, Type} - 이미지 업로드 컨텍스트와 타입
// @description 컨텍스트에서 데이터와 함수 가져오기
// @reason 컨텍스트 기반 상태 관리

export const useImagePreview = () => {
  const {
    imageUrls, // @type {ImageUrl[]} - 이미지 URL 배열
    // @description 컨텍스트에서 이미지 목록 가져오기
    // @reason 상태 사용
    setImageUrls, // @type {(urls: ImageUrl[]) => void} - 이미지 URL 설정 함수
    // @description 이미지 목록 업데이트
    // @reason 상태 변경
    minImages, // @type {number} - 최소 이미지 수
    // @description 최소 이미지 수 가져오기
    // @reason 규칙 적용
    setButtonText, // @type {(text: string) => void} - 버튼 텍스트 설정 함수
    // @description 버튼 텍스트 업데이트
    // @reason UI 조정
    onImageUrlsChange, // @type {(urls: string[]) => void} - 이미지 URL 변경 콜백
    // @description 이미지 변경 시 호출
    // @reason 상위 콜백
  } = useImageUploadContext();

  const handleRemoveImage = (index: number) => {
    if (index < 0 || index >= imageUrls.length) return; // @type {void} - 인덱스 유효성 검사
    // @description 잘못된 인덱스 방지
    // @reason 에러 방지
    if (imageUrls.length <= minImages) return; // @type {void} - 최소 이미지 수 검사
    // @description 최소 이미지 수 유지
    // @reason 규칙 준수

    const updatedUrls = imageUrls.filter((_, i) => i !== index); // @type {ImageUrl[]} - 필터링된 이미지 목록
    // @description 인덱스에 해당하는 이미지 제거
    // @reason 이미지 삭제

    setImageUrls(updatedUrls); // @type {void} - 이미지 목록 업데이트
    // @description 상태 변경
    // @reason UI 반영
    setButtonText(updatedUrls.length > 0 ? 'Update' : 'Add a Cover Image'); // @type {void} - 버튼 텍스트 변경
    // @description 이미지 수에 따라 버튼 텍스트 조정
    // @reason UI 조정
    onImageUrlsChange(updatedUrls.map((image: ImageUrl) => image.url)); // @type {void} - 상위 콜백 호출
    // @description 이미지 URL 변경 알림
    // @reason 상위 컴포넌트와 동기화
  };

  return { handleRemoveImage }; // @type {Object} - 이벤트 핸들러 반환
  // @description 삭제 핸들러 반환
  // @reason 상위 사용
};
