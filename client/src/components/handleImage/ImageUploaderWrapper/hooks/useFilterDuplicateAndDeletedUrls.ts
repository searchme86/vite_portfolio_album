//====여기부터 수정됨====
// useFilterDuplicateAndDeletedUrls 훅: 중복 및 삭제된 URL 필터링
// 단일 책임: 새로운 URL 필터링 로직 제공
import useExtractFileName from './useExtractFileName';

// 훅 정의
// 중복 및 삭제된 URL 필터링
function useFilterDuplicateAndDeletedUrls() {
  // 파일명 추출 훅 사용
  // URL에서 파일명 추출
  const { extractFileNameFromUrl } = useExtractFileName();

  // filterDuplicateAndDeletedUrls 함수: 중복 및 삭제된 URL 필터링
  // safeUploadedUrls, currentUrls, existingBaseNames를 받아 필터링
  const filterDuplicateAndDeletedUrls = (
    safeUploadedUrls,
    currentUrls,
    existingBaseNames
  ) => {
    // safeUploadedUrls가 배열인지 확인, 아니면 빈 배열로 대체
    const safeSafeUploadedUrls = Array.isArray(safeUploadedUrls)
      ? safeUploadedUrls
      : [];
    // 디버깅: safeSafeUploadedUrls 확인
    // 배열이 올바르게 처리되었는지 확인
    console.log(
      'useFilterDuplicateAndDeletedUrls - safeSafeUploadedUrls:',
      safeSafeUploadedUrls
    );

    // currentUrls가 배열인지 확인, 아니면 빈 배열로 대체
    const safeCurrentUrls = Array.isArray(currentUrls) ? currentUrls : [];
    // 디버깅: safeCurrentUrls 확인
    // 배열이 올바르게 처리되었는지 확인
    console.log(
      'useFilterDuplicateAndDeletedUrls - safeCurrentUrls:',
      safeCurrentUrls
    );

    // existingBaseNames가 배열인지 확인, 아니면 빈 배열로 대체
    const safeExistingBaseNames = Array.isArray(existingBaseNames)
      ? existingBaseNames
      : [];
    // 디버깅: safeExistingBaseNames 확인
    // 배열이 올바르게 처리되었는지 확인
    console.log(
      'useFilterDuplicateAndDeletedUrls - safeExistingBaseNames:',
      safeExistingBaseNames
    );

    // 새로운 URL 필터링
    // 중복 및 삭제된 URL 제외
    const newUrls = safeSafeUploadedUrls
      .map((url) => ({ url, isNew: true }))
      .filter((newItem) => {
        // newItem?.url이 문자열인지 확인
        const safeUrl =
          newItem && typeof newItem.url === 'string' ? newItem.url : '';
        const fileName = extractFileNameFromUrl(safeUrl);
        // fileName이 문자열인지 확인
        const safeFileName = typeof fileName === 'string' ? fileName : '';
        // 디버깅: safeFileName 확인
        // 파일명이 올바르게 추출되었는지 확인
        console.log(
          'useFilterDuplicateAndDeletedUrls - safeFileName:',
          safeFileName
        );

        // lastDotIndex 계산
        const lastDotIndex = safeFileName.lastIndexOf('.');
        // lastDotIndex가 숫자인지 확인 (lastIndexOf는 항상 숫자 반환)
        const safeLastDotIndex = Number.isFinite(lastDotIndex)
          ? lastDotIndex
          : -1;
        // 디버깅: safeLastDotIndex 확인
        // 인덱스가 올바르게 계산되었는지 확인
        console.log(
          'useFilterDuplicateAndDeletedUrls - safeLastDotIndex:',
          safeLastDotIndex
        );

        // extension 추출
        const extension =
          safeLastDotIndex !== -1
            ? safeFileName.substring(safeLastDotIndex)
            : '';
        // extension이 문자열인지 확인
        const safeExtension = typeof extension === 'string' ? extension : '';
        // 디버깅: safeExtension 확인
        // 확장자가 올바르게 추출되었는지 확인
        console.log(
          'useFilterDuplicateAndDeletedUrls - safeExtension:',
          safeExtension
        );

        // nameWithoutExtension 추출
        const nameWithoutExtension =
          safeLastDotIndex !== -1
            ? safeFileName.substring(0, safeLastDotIndex)
            : safeFileName;
        // nameWithoutExtension이 문자열인지 확인
        const safeNameWithoutExtension =
          typeof nameWithoutExtension === 'string' ? nameWithoutExtension : '';
        // 디버깅: safeNameWithoutExtension 확인
        // 이름이 올바르게 추출되었는지 확인
        console.log(
          'useFilterDuplicateAndDeletedUrls - safeNameWithoutExtension:',
          safeNameWithoutExtension
        );

        // firstUnderscoreIndex 계산
        const firstUnderscoreIndex = safeNameWithoutExtension.indexOf('_');
        // firstUnderscoreIndex가 숫자인지 확인 (indexOf는 항상 숫자 반환)
        const safeFirstUnderscoreIndex = Number.isFinite(firstUnderscoreIndex)
          ? firstUnderscoreIndex
          : -1;
        // 디버깅: safeFirstUnderscoreIndex 확인
        // 인덱스가 올바르게 계산되었는지 확인
        console.log(
          'useFilterDuplicateAndDeletedUrls - safeFirstUnderscoreIndex:',
          safeFirstUnderscoreIndex
        );

        // baseName 생성
        const baseName =
          safeFirstUnderscoreIndex !== -1
            ? safeNameWithoutExtension.substring(0, safeFirstUnderscoreIndex) +
              safeExtension
            : safeFileName;
        // baseName이 문자열인지 확인
        const safeBaseName = typeof baseName === 'string' ? baseName : '';
        // 디버깅: safeBaseName 확인
        // baseName이 올바르게 생성되었는지 확인
        console.log(
          'useFilterDuplicateAndDeletedUrls - safeBaseName:',
          safeBaseName
        );

        // 중복 여부 확인
        const isDuplicate = safeExistingBaseNames.includes(safeBaseName);
        // 디버깅: isDuplicate 확인
        // 중복 여부 확인
        console.log(
          'useFilterDuplicateAndDeletedUrls - isDuplicate:',
          isDuplicate
        );
        if (isDuplicate) {
          // 디버깅: 중복 URL 로그
          // 중복으로 제외된 URL 확인
          console.log(
            'useFilterDuplicateAndDeletedUrls - Duplicate URL filtered out:',
            safeBaseName
          );
          return false;
        }

        // 삭제 여부 확인
        const isDeleted = !safeCurrentUrls.includes(safeUrl);
        // 디버깅: isDeleted 확인
        // 삭제 여부 확인
        console.log('useFilterDuplicateAndDeletedUrls - isDeleted:', isDeleted);
        if (!isDeleted) {
          // 디버깅: 이미 존재하는 URL 로그
          // 제외된 URL 확인
          console.log(
            'useFilterDuplicateAndDeletedUrls - URL already exists in currentUrls:',
            safeUrl
          );
          return false;
        }

        return true;
      });

    // newUrls가 배열인지 확인
    const safeNewUrls = Array.isArray(newUrls) ? newUrls : [];
    // 디버깅: safeNewUrls 확인
    // 필터링된 URL 목록 확인
    console.log(
      'useFilterDuplicateAndDeletedUrls - Filtered newUrls:',
      safeNewUrls
    );

    // 새로운 URL이 없는 경우
    // 처리 중단 플래그 추가
    const hasNewUrls = safeNewUrls.length > 0;
    // hasNewUrls가 불리언인지 확인
    const safeHasNewUrls = typeof hasNewUrls === 'boolean' ? hasNewUrls : false;
    // 디버깅: safeHasNewUrls 확인
    // 플래그가 올바르게 설정되었는지 확인
    console.log(
      'useFilterDuplicateAndDeletedUrls - safeHasNewUrls:',
      safeHasNewUrls
    );

    if (!safeHasNewUrls) {
      // 디버깅: 새로운 URL 없음 로그
      // 처리 결과 확인
      console.log(
        'useFilterDuplicateAndDeletedUrls - No new URLs to add after deduplication and filtering'
      );
    }

    // newUrls와 hasNewUrls 반환
    // 객체 형태로 반환
    return { newUrls: safeNewUrls, hasNewUrls: safeHasNewUrls };
  };

  // filterDuplicateAndDeletedUrls 함수 반환
  // 객체 형태로 반환
  return { filterDuplicateAndDeletedUrls };
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default useFilterDuplicateAndDeletedUrls;
//====여기까지 수정됨====
