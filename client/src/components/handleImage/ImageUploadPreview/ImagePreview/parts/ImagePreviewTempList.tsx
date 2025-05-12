import { useImageFilePreviewUrls } from '../hooks/useImageFilePreviewUrls';
import ImagePreviewTempItem from './ImagePreviewTempItem';
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

function ImagePreviewTempList() {
  const { previewUrls } = useImageFilePreviewUrls();
  const imageTitles = useImageManagementStore((state) => state.imageTitle);

  return (
    <div>
      {previewUrls.map((url, index) => {
        const fileName =
          imageTitles && imageTitles[index]?.name
            ? imageTitles[index].name
            : `업로드 중인 ${index + 1}번째 파일`;

        return (
          <ul key={`preview-${url}`} className="relative">
            <ImagePreviewTempItem
              fileName={fileName}
              listKey={index}
              tempUrl={url}
            />
          </ul>
        );
      })}
    </div>
  );
}

export default ImagePreviewTempList;
