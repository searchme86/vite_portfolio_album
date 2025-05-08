// useFilterDuplicateAndDeletedUrls 훅: 중복 및 삭제된 URL 필터링
// 의미: 새로운 URL을 중복/삭제 기준으로 필터링
// 이유: 상태 일관성 유지
export interface ImageUrl {
  url: string;
  isNew: boolean;
}

interface FilterResult {
  newUrls: ImageUrl[];
  hasNewUrls: boolean;
}

import useExtractFileName from './useExtractFileName';

function useFilterDuplicateAndDeletedUrls(): {
  filterDuplicateAndDeletedUrls: (
    uploadedUrls: string[],
    currentUrls: string[],
    existingBaseNames: string[]
  ) => FilterResult;
} {
  const { extractFileNameFromUrl } = useExtractFileName();

  const filterDuplicateAndDeletedUrls = (
    uploadedUrls: string[],
    currentUrls: string[],
    existingBaseNames: string[]
  ): FilterResult => {
    const safeUploadedUrls = Array.isArray(uploadedUrls) ? uploadedUrls : [];
    const safeCurrentUrls = Array.isArray(currentUrls) ? currentUrls : [];
    const safeExistingBaseNames = Array.isArray(existingBaseNames)
      ? existingBaseNames
      : [];

    const newUrls = safeUploadedUrls
      .map((url) => ({ url, isNew: true }))
      .filter((newItem) => {
        const safeUrl = typeof newItem.url === 'string' ? newItem.url : '';
        const fileName = extractFileNameFromUrl(safeUrl);
        const safeFileName = typeof fileName === 'string' ? fileName : '';
        const lastDotIndex = safeFileName.lastIndexOf('.');
        const extension =
          lastDotIndex !== -1 ? safeFileName.substring(lastDotIndex) : '';
        const nameWithoutExtension =
          lastDotIndex !== -1
            ? safeFileName.substring(0, lastDotIndex)
            : safeFileName;
        const firstUnderscoreIndex = nameWithoutExtension.indexOf('_');
        const baseName =
          firstUnderscoreIndex !== -1
            ? nameWithoutExtension.substring(0, firstUnderscoreIndex) +
              extension
            : safeFileName;

        const isDuplicate = safeExistingBaseNames.includes(baseName);
        const isDeleted = !safeCurrentUrls.includes(safeUrl);

        return !isDuplicate && isDeleted;
      });

    const safeNewUrls = Array.isArray(newUrls) ? newUrls : [];
    const hasNewUrls = safeNewUrls.length > 0;

    return { newUrls: safeNewUrls, hasNewUrls };
  };

  return { filterDuplicateAndDeletedUrls };
}

export default useFilterDuplicateAndDeletedUrls;
//====여기까지 수정됨====
