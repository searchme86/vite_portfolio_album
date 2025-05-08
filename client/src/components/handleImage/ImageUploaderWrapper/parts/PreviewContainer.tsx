// PreviewContainer 컴포넌트: 미리보기 컨테이너
// 의미: 업로드된 이미지 미리보기 표시
// 이유: 사용자 피드백 제공
interface PreviewContainerProps {
  previewUrls: string[];
  imageUrls: string[];
  onDelete: (index: number) => void;
  isUploading: boolean;
}

function PreviewContainer({
  previewUrls,
  imageUrls,
  onDelete,
  isUploading,
}: PreviewContainerProps) {
  const displayUrls = previewUrls.length > 0 ? previewUrls : imageUrls;

  return (
    <div className="flex gap-2">
      {displayUrls.map((url, index) => (
        <div key={index} className="relative">
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="object-cover w-32 h-32"
          />
          <button
            type="button"
            onClick={() => onDelete(index)}
            disabled={isUploading}
            className="absolute top-0 right-0 p-1 text-white bg-red-500"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default PreviewContainer;
