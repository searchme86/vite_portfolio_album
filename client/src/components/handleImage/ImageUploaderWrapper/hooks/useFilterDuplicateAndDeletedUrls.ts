// useFilterDuplicateAndDeletedUrls 훅: 중복 및 삭제된 URL 필터링
// 의미: 새로운 URL을 중복 기준으로 필터링
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

    console.log(
      '---> useFilterDuplicateAndDeletedUrls 훅 호출됨: safeUploadedUrls',
      safeUploadedUrls
    );
    console.log(
      '---> useFilterDuplicateAndDeletedUrls 훅 호출됨: safeCurrentUrls',
      safeCurrentUrls
    );
    console.log(
      '---> useFilterDuplicateAndDeletedUrls 훅 호출됨: safeExistingBaseNames',
      safeExistingBaseNames
    );

    const newUrls = safeUploadedUrls
      .map((url) => ({ url, isNew: true }))
      .filter((newItem) => {
        const safeUrl = typeof newItem.url === 'string' ? newItem.url : '';
        console.log(
          '---> useFilterDuplicateAndDeletedUrls 훅 안에서 처리됨: safeUrl',
          safeUrl
        );
        const fileName = extractFileNameFromUrl(safeUrl);
        console.log(
          '---> useFilterDuplicateAndDeletedUrls 훅 안에서 처리됨: fileName',
          fileName
        );
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
        console.log(
          '---> useFilterDuplicateAndDeletedUrls 훅 안에서 처리됨: baseName',
          baseName
        );
        console.log(
          '---> useFilterDuplicateAndDeletedUrls 훅 안에서 처리됨: isDuplicate',
          isDuplicate
        );

        return !isDuplicate; // 중복되지 않은 URL만 반환
      });

    console.log(
      '---> useFilterDuplicateAndDeletedUrls 훅 안에서 처리됨: newUrls',
      newUrls
    );

    const safeNewUrls = Array.isArray(newUrls) ? newUrls : [];
    const hasNewUrls = safeNewUrls.length > 0;

    console.log(
      '---> useFilterDuplicateAndDeletedUrls 훅 안에서 처리됨: safeNewUrls',
      safeNewUrls
    );
    console.log(
      '---> useFilterDuplicateAndDeletedUrls 훅 안에서 처리됨: hasNewUrls',
      hasNewUrls
    );

    return { newUrls: safeNewUrls, hasNewUrls };
  };

  return { filterDuplicateAndDeletedUrls };
}

export default useFilterDuplicateAndDeletedUrls;
//====여기까지 수정됨====
