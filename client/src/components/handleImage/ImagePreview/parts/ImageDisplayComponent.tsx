type Props = {
  url?: string; // @type {string} - 이미지 URL
  // @description 이미지 주소
  // @reason 이미지 표시
  index: number; // @type {number} - 이미지 인덱스
  // @description 이미지 순서
  // @reason 접근성
  imageUrl: string; // @type {string} - 현재 이미지 URL
  // @description 현재 이미지 주소
  // @reason 표시
  isUploading: boolean; // @type {boolean} - 업로드 중 여부
  // @description 업로드 상태
  // @reason UI 조정
};

function ImageDisplayComponent({ url, index, imageUrl, isUploading }: Props) {
  console.log('ImageDisplayComponent 컴포넌트에서 url', url); // @type {void} - 디버깅 로그
  // @description URL 출력
  // @reason 데이터 확인
  console.log('ImageDisplayComponent 컴포넌트에서 index', index); // @type {void} - 디버깅 로그
  // @description 인덱스 출력
  // @reason 데이터 확인
  console.log('ImageDisplayComponent 컴포넌트에서 imageUrl', imageUrl); // @type {void} - 디버깅 로그
  // @description 현재 이미지 URL 출력
  // @reason 데이터 확인
  console.log('ImageDisplayComponent 컴포넌트에서 isUploading', isUploading); // @type {void} - 디버깅 로그
  // @description 업로드 상태 출력
  // @reason 데이터 확인

  if (url) {
    return (
      <img
        src={url}
        alt={`Post image ${index + 1}`}
        className="object-cover w-full h-32 rounded-md"
      />
    ); // @type {JSX.Element} - 이미지 렌더링
    // @description URL이 있으면 이미지 표시
    // @reason 사용자에게 이미지 보여주기
  }

  return (
    <div
      className="flex items-center justify-center w-full h-32 bg-gray-200 rounded-md"
      role="alert"
      aria-label="Image not available"
    >
      <p className="text-gray-500">Image not available</p>
    </div>
  ); // @type {JSX.Element} - 대체 UI 렌더링
  // @description URL이 없으면 대체 UI 표시
  // @reason 사용자 피드백
}

export default ImageDisplayComponent;
