type Props = {
  index: number;
  handleRemoveImage?: (index: number) => void;
  safeImageUrlsLength: number;
  safeMinImages: number;
};

function ImageRemoveButtonComponent({
  index,
  handleRemoveImage,
  safeImageUrlsLength,
  safeMinImages,
}: Props) {
  const isDisabled = safeImageUrlsLength <= safeMinImages;

  const buttonClassName = [
    'absolute top-2 right-2 rounded-full p-1 text-white',
    isDisabled
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-red-500 hover:bg-red-600',
  ].join(' ');

  return (
    <button
      type="button"
      onClick={() => handleRemoveImage?.(index)}
      className={buttonClassName}
      disabled={isDisabled}
      aria-label={`Remove image ${index + 1}`}
    >
      ✕
    </button>
  );
}

export default ImageRemoveButtonComponent;
