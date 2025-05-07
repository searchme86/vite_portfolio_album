type Props = {
  url?: string;
  index: number;
  imageUrl: string; // @type {string} - 현재 이미지 URL
  // @description 현재 이미지 주소
  // @reason 표시
  isUploading: boolean; // @type {boolean} - 업로드 중 여부
  // @description 업로드 상태
  // @reason UI 조정
};

function ImageDisplayComponent({ url, index, imageUrl, isUploading }: Props) {
  console.log('ImageDisplayComponent 컴포넌트에서 url', url);
  console.log('ImageDisplayComponent 컴포넌트에서 index', index);
  console.log('ImageDisplayComponent 컴포넌트에서 imageUrl', imageUrl);
  console.log('ImageDisplayComponent 컴포넌트에서 isUploading', isUploading);
  if (url) {
    return (
      <img
        src={url}
        alt={`Post image ${index + 1}`}
        className="object-cover w-full h-32 rounded-md"
      />
    );
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
}

export default ImageDisplayComponent;
