import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

function useImagePreviewDelete(index: number) {
  const setImageUrls = useImageManagementStore((state) => state.setImageUrls); // @type {(urls: ImageUrl[]) => void}
  // @description Zustand 상태에서 이미지 URL 설정 함수 가져오기
  // @reason 상태 변경
  const imageUrls = useImageManagementStore((state) => state.imageUrls || []); // @type {ImageUrl[]}
  // @description Zustand 상태에서 현재 이미지 URL 배열 가져오기
  // @reason 상태 접근

  const handleDelete = () => {
    const newUrls = imageUrls.filter((_, i) => i !== index); // @type {ImageUrl[]}
    // @description 삭제할 인덱스 제외한 새 배열 생성
    // @reason 배열 필터링
    setImageUrls(newUrls); // @type {void}
    // @description 상태 업데이트
    // @reason UI 반영
  };

  return handleDelete;
}

export default useImagePreviewDelete;
