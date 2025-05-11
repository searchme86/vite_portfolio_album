import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

function ImagePreviewButton({
  onClick,
  index,
}: {
  onClick: () => void;
  index?: number;
}) {
  const safeIndex = typeof index === 'number' && !isNaN(index) ? index : 0; // @type {number}
  // @description 인덱스 유효성 검사
  // @reason 오류 방지
  const isUploading = useImageManagementStore(
    (state) => state.isUploading || false
  ); // @type {boolean}
  // @description Zustand 상태에서 업로드 상태 가져오기
  // @reason 버튼 비활성화
  const imageUrls = useImageManagementStore((state) => state.imageUrls || []); // @type {ImageUrl[]}
  // @description Zustand 상태에서 이미지 URL 배열 가져오기
  // @reason 최소 개수 체크

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isUploading || imageUrls.length <= 1}
      className={`absolute top-2 right-2 p-1 text-white bg-red-500 rounded ${
        isUploading || imageUrls.length <= 1
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-red-600'
      }`}
      aria-label={`Remove image ${safeIndex + 1}`}
    >
      ✕
    </button>
  );
}

export default ImagePreviewButton;
