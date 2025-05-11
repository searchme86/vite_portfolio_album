function ImagePreviewTempItem({
  fileName,
  listKey,
  tempUrl,
}: {
  tempUrl: string;
  fileName: string;
  listKey: number;
}) {
  return (
    <li key={listKey}>
      <div>
        <img
          src={tempUrl}
          alt={fileName}
          className="object-cover w-32 h-32 opacity-50"
        />
      </div>
      <span className="absolute top-0 left-0 p-1 text-white bg-gray-500">
        Uploading...
      </span>
    </li>
  );
}

export default ImagePreviewTempItem;
