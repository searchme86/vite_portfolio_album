type Props = {
  url?: string; // 타입: string - 이미지 URL
  // 의미: 이미지 주소
  // 이유: 이미지 표시
  index: number; // 타입: number - 이미지 인덱스
  // 의미: 이미지 순서
  // 이유: 접근성
  imageUrl: string; // 타입: string - 현재 이미지 URL
  // 의미: 현재 이미지 주소
  // 이유: 표시
  isUploading: boolean; // 타입: boolean - 업로드 중 여부
  // 의미: 업로드 상태
  // 이유: UI 조정
};

// 이미지 표시 컴포넌트
// 의미: 개별 이미지를 표시
// 이유: 사용자에게 이미지 미리보기 제공
function ImageDisplayComponent({ url, index, imageUrl, isUploading }: Props) {
  console.log('ImageDisplayComponent 컴포넌트에서 url', url);
  // 타입: void - 디버깅 로그
  // 의미: URL 출력
  // 이유: 데이터 확인
  console.log('ImageDisplayComponent 컴포넌트에서 index', index);
  // 타입: void - 디버깅 로그
  // 의미: 인덱스 출력
  // 이유: 데이터 확인
  console.log('ImageDisplayComponent 컴포넌트에서 imageUrl', imageUrl);
  // 타입: void - 디버깅 로그
  // 의미: 현재 이미지 URL 출력
  // 이유: 데이터 확인
  console.log('ImageDisplayComponent 컴포넌트에서 isUploading', isUploading);
  // 타입: void - 디버깅 로그
  // 의미: 업로드 상태 출력
  // 이유: 데이터 확인

  if (url) {
    return (
      <img
        src={url}
        alt={`Post image ${index + 1}`}
        className="object-cover w-full h-32 rounded-md"
      />
    );
    // 타입: JSX.Element - 이미지 렌더링
    // 의미: URL이 있으면 이미지 표시
    // 이유: 사용자에게 이미지 보여주기
  }

  return (
    <div
      className="flex items-center justify-center w-full h-32 bg-gray-200 rounded-md"
      role="alert"
      aria-label="Image not available"
    >
      <p className="text-gray-500">Image not available</p>
    </div>
  );
  // 타입: JSX.Element - 대체 UI 렌더링
  // 의미: URL이 없으면 대체 UI 표시
  // 이유: 사용자 피드백
}

export default ImageDisplayComponent;
