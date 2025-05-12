function ImagePreviewItem({
  imageSrc,
  fileName,
}: {
  imageSrc: string;
  fileName: string;
}) {
  const safeImageSrc = imageSrc || 'https://via.placeholder.com/150';

  return (
    <>
      <div className="w-full h-[10rem]">
        <img
          src={safeImageSrc}
          alt={fileName} // 수정: alt 속성에 파일 이름 적용
          className="block object-cover w-full h-full"
        />
      </div>
    </>
  );
}

export default ImagePreviewItem;
