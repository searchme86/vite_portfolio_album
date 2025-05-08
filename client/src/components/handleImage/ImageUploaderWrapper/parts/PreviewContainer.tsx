// PreviewContainer 컴포넌트: 미리보기 컨테이너
// 의미: 업로드된 이미지와 임시 파일을 리스트로 표시
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
  console.log('---> PreviewContainer 렌더링: imageUrls', imageUrls);
  console.log('---> PreviewContainer 렌더링: previewUrls', previewUrls);

  return (
    <div className="flex gap-2">
      {/* 업로드된 이미지 표시 */}
      {imageUrls.map((url, index) => (
        <div key={`uploaded-${url}`} className="relative">
          <img
            src={url}
            alt={`Uploaded ${index + 1}`}
            className="object-cover w-32 h-32"
          />
          <button
            type="button"
            onClick={() => {
              console.log('---> PreviewContainer X 버튼 클릭: index', index);
              onDelete(index); // imageUrls 기준 인덱스 사용
            }}
            disabled={isUploading || imageUrls.length <= 1} // 최소 1개 제한 적용
            className={`absolute top-0 right-0 p-1 text-white bg-red-500 ${
              isUploading || imageUrls.length <= 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-red-600'
            }`}
          >
            ✕
          </button>
          {/* 의미: 삭제 버튼 */}
          {/* 이유: 이미지 삭제 가능 */}
        </div>
      ))}
      {/* 임시 파일 표시 */}
      {previewUrls.map((url, index) => (
        <div key={`preview-${url}`} className="relative">
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="object-cover w-32 h-32 opacity-50"
          />
          <span className="absolute top-0 left-0 p-1 text-white bg-gray-500">
            Uploading...
          </span>
          {/* 의미: 업로드 중 표시 */}
          {/* 이유: 사용자 피드백 */}
        </div>
      ))}
    </div>
  );
}

export default PreviewContainer;
//====여기까지 수정됨====
