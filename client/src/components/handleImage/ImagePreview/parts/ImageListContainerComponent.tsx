import ImageDisplayComponent from './ImageDisplayComponent';
import ImageRemoveButtonComponent from './ImageRemoveButtonComponent';

type ImageItem = {
  url?: string;
};

type Props = {
  safeImageUrls: ImageItem[];
  safeMinImages: number;
  handleRemoveImage?: (index: number) => void;
};

function ImageListContainerComponent({
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
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-3">
      {safeImageUrls.map((item, index) => (
        <div key={index} className="relative">
          <ImageDisplayComponent url={item.url} index={index} />
          <ImageRemoveButtonComponent
            index={index}
            handleRemoveImage={handleRemoveImage}
            safeImageUrlsLength={safeImageUrls.length}
            safeMinImages={safeMinImages}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageListContainerComponent;
