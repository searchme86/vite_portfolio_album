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
      <div className="">
        <img
          src={safeImageSrc}
          alt={fileName} // 수정: alt 속성에 파일 이름 적용
          className="object-cover w-32 h-32"
        />
      </div>
    </>
  );
}

export default ImagePreviewItem;
