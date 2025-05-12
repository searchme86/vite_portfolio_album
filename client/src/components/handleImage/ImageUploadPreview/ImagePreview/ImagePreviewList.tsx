import ImagePreviewItem from './parts/ImagePreviewItem';
import ImagePreviewButton from './parts/ImagePreviewButton';
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';
import { useImageFilePreviewUrls } from './hooks/useImageFilePreviewUrls';
import { useImageFileDeleteHandler } from './hooks/useImageFileDeleteHandler';

function ImagePreviewList() {
  const { formattedImageUrls } = useImageFilePreviewUrls();
  const { imageTitle, isUploading } = useImageManagementStore();
  const handleDeleteFile = useImageFileDeleteHandler();

  return (
    <>
      {formattedImageUrls.map((url, index) => {
        const fileName =
          imageTitle && imageTitle[index]?.name
            ? imageTitle[index].name
            : `Uploaded ${index + 1}`;

        return (
          <li key={`uploaded-${url}`} className="relative list-none">
            <ImagePreviewItem imageSrc={url} fileName={fileName} />
            <ImagePreviewButton
              index={index}
              onDelete={handleDeleteFile}
              formattedImageUrls={formattedImageUrls}
              isUploading={isUploading}
            />
          </li>
        );
      })}
    </>
  );
}

export default ImagePreviewList;
