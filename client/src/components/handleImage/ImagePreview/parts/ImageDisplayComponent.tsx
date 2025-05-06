type Props = {
  url?: string;
  index: number;
};

function ImageDisplayComponent({ url, index }: Props) {
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
