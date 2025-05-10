interface ImageUploadProgressBarProps {
  isUploading: boolean;
  progress: number;
}

function ImageUploadProgressBar({
  isUploading,
  progress,
}: ImageUploadProgressBarProps) {
  // 조건부 렌더링: 업로드 중일 때만 표시
  // 의미: 진행률 표시
  // 이유: 사용자 피드백 제공
  if (!isUploading) return null;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      />
      <p className="mt-1 text-sm text-gray-600">업로드 진행: {progress}%</p>
    </div>
  );
}

export default ImageUploadProgressBar;
