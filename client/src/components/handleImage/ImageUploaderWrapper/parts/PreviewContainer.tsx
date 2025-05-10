// PreviewContainer 컴포넌트: 업로드된 이미지와 임시 파일 미리보기
// 의미: 이미지 미리보기 UI 제공
// 이유: 사용자에게 업로드 상태 시각화
import type { ImageFileName } from '../../utils/ImageFileType';

interface PreviewContainerProps {
  previewUrls: string[];
  imageUrls: string[];
  imageTitles: ImageFileName[]; // 추가: imageTitles props 타입 명시
  onDelete: (index: number) => void;
  isUploading: boolean;
}

function PreviewContainer({
  previewUrls,
  imageUrls,
  imageTitles, // 추가: imageTitles props 받기
  onDelete,
  isUploading,
}: PreviewContainerProps) {
  console.log(
    '---> PreviewContainer : ImageUploaderMain에서 전달 imageUrls',
    imageUrls
  );
  console.log(
    '---> PreviewContainer : ImageUploaderMain에서 전달 previewUrls',
    previewUrls
  );
  console.log(
    '---> PreviewContainer : ImageUploaderMain에서 전달 imageTitles',
    imageTitles
  ); // 디버깅: imageTitles 로그 추가

  return (
    <div className="flex gap-2">
      {/* 업로드된 이미지 표시 */}
      {imageUrls.map((url, index) => {
        // imageTitles에서 파일 이름 가져오기
        // 의미: imageTitles 배열에서 해당 인덱스의 파일 이름을 추출
        // 이유: alt 속성에 파일 이름 사용
        const fileName =
          imageTitles && imageTitles[index]?.name
            ? imageTitles[index].name
            : `Uploaded ${index + 1}`; // fallback: 파일 이름이 없으면 기본값 사용
        // 비유: "이름표가 있으면 붙이고, 없으면 번호로 대신 붙이는 거야!"

        return (
          <div key={`uploaded-${url}`} className="relative">
            <div className="">
              <img
                src={url}
                alt={fileName} // 수정: alt 속성에 파일 이름 적용
                className="object-cover w-32 h-32"
              />
            </div>
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
          </div>
        );
      })}
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
