interface ImageUploadProgressBarProps {
  isUploading: boolean;
  progress: number;
}

function ImageUploadProgressBar({
  isUploading,
  progress,
}: ImageUploadProgressBarProps) {
  if (!isUploading) return null;

  return (
    <div className="w-[160px] my-[10px]">
      <span
        className="block h-2 transition-all duration-300 ease-in-out bg-blue-600 rounded-lg"
        style={{ width: `${progress}%` }}
      />
      <p className="mt-[5px] text-lg text-gray-600">
        <span className="sr-only">현재</span> 업로드 진행 중:
        <span>{progress}%</span>
        <span className="sr-only">입니다</span>
      </p>
    </div>
  );
}

export default ImageUploadProgressBar;
