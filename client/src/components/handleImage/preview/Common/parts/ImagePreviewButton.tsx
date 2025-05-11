function ImagePreviewButton({
  onDelete,
  index,
  formattedImageUrls,
  isUploading,
}: {
  onDelete: (index: number) => void;
  index: number;
  formattedImageUrls: string[];
  isUploading: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        onDelete(index);
      }}
      disabled={isUploading || formattedImageUrls.length <= 1} // 최소 1개 제한 적용
      className={`absolute top-0 right-0 p-1 text-white bg-red-500 ${
        isUploading || formattedImageUrls.length <= 1
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-red-600'
      }`}
    >
      ✕
    </button>
  );
}

export default ImagePreviewButton;
