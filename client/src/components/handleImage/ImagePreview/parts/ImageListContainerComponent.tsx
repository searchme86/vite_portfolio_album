import ImageDisplayComponent from './ImageDisplayComponent';
import ImageRemoveButtonComponent from './ImageRemoveButtonComponent';

// 타입 정의: ImageItem은 이미지 URL과 상태를 나타냄
// 의미: 이미지 데이터 구조 정의
// 이유: 타입 안전성 보장
type ImageItem = {
  url?: string; // 타입: string - 이미지 URL
  isNew: boolean; // 타입: boolean - 새 이미지 여부
};

type Props = {
  imageUrl: string; // 타입: string - 현재 이미지 URL
  // 의미: 현재 이미지 주소
  // 이유: 표시
  isUploading: boolean; // 타입: boolean - 업로드 중 여부
  // 의미: 업로드 상태
  // 이유: UI 조정
  safeImageUrls: ImageItem[]; // 타입: ImageItem[] - 이미지 목록
  // 의미: 검증된 이미지 목록
  // 이유: 표시
  safeMinImages: number; // 타입: number - 최소 이미지 수
  // 의미: 최소 이미지 수
  // 이유: 규칙 적용
  handleRemoveImage?: (index: number) => void; // 타입: (index: number) => void - 삭제 핸들러
  // 의미: 인덱스로 이미지 삭제
  // 이유: 사용자 행동 처리
};

// 이미지 목록 컨테이너 컴포넌트
// 의미: 이미지 목록을 그리드로 표시
// 이유: 사용자에게 이미지 미리보기 제공
function ImageListContainerComponent({
  imageUrl,
  isUploading,
  safeImageUrls,
  safeMinImages,
  handleRemoveImage,
}: Props) {
  if (safeImageUrls.length === 0) {
    return (
      <p className="text-gray-500" role="status" aria-live="polite">
        No images available.
      </p>
    );
    // 타입: JSX.Element - 이미지 없음 메시지
    // 의미: 이미지 목록이 비어있으면 메시지 표시
    // 이유: 사용자 피드백
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-3">
      {safeImageUrls.map((item, index) => (
        <div key={index} className="relative">
          <ImageDisplayComponent
            url={item.url}
            index={index}
            imageUrl={imageUrl}
            isUploading={isUploading}
          />
          {/* 의미: 개별 이미지 렌더링 */}
          {/* 이유: 사용자에게 이미지 표시 */}
          <ImageRemoveButtonComponent
            index={index}
            handleRemoveImage={handleRemoveImage}
            safeImageUrlsLength={safeImageUrls.length}
            safeMinImages={safeMinImages}
          />
          {/* 의미: 삭제 버튼 렌더링 */}
          {/* 이유: 사용자 인터랙션 */}
        </div>
      ))}
    </div>
  );
  // 타입: JSX.Element - 이미지 목록 렌더링
  // 의미: 이미지 목록을 그리드로 표시
  // 이유: 사용자에게 이미지 보여주기
}

export default ImageListContainerComponent;
