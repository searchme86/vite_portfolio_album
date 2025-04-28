//====여기부터 수정됨====
// usePrepareExistingFileNames 훅: 기존 파일명 추출 및 중복 확인 준비
// 단일 책임: 현재 이미지 URL과 파일명 추출 로직 제공
import useImageUploadContextValues from './useImageUploadContextValues';
import useExtractFileName from './useExtractFileName';

// 훅 정의
// 기존 파일명과 URL 준비
function usePrepareExistingFileNames() {
  // 컨텍스트 값 가져오기
  // safeImageUrls 사용
  const { safeImageUrls } = useImageUploadContextValues();
  // safeImageUrls가 배열인지 확인
  const validatedSafeImageUrls = Array.isArray(safeImageUrls)
    ? safeImageUrls
    : [];
  // 디버깅: validatedSafeImageUrls 확인
  // 배열이 올바르게 처리되었는지 확인
  console.log(
    'usePrepareExistingFileNames - validatedSafeImageUrls:',
    validatedSafeImageUrls
  );

  // 파일명 추출 훅 사용
  // URL에서 파일명 추출
  const { extractFileNameFromUrl } = useExtractFileName();
  // extractFileNameFromUrl이 함수인지 확인
  const safeExtractFileNameFromUrl =
    typeof extractFileNameFromUrl === 'function'
      ? extractFileNameFromUrl
      : () => '';
  // 디버깅: safeExtractFileNameFromUrl 확인
  // 함수가 올바르게 설정되었는지 확인
  console.log(
    'usePrepareExistingFileNames - safeExtractFileNameFromUrl:',
    safeExtractFileNameFromUrl
  );

  // prepareExistingFileNames 함수: 현재 URL과 파일명 준비
  // 중복 확인을 위한 데이터 생성
  const prepareExistingFileNames = () => {
    // 현재 이미지 URL 추출
    // validatedSafeImageUrls에서 URL만 추출
    const currentUrls = validatedSafeImageUrls.map((item) => {
      const url = item && typeof item.url === 'string' ? item.url : '';
      return url;
    });
    // currentUrls가 배열인지 확인
    const safeCurrentUrls = Array.isArray(currentUrls) ? currentUrls : [];
    // 디버깅: safeCurrentUrls 확인
    // URL 목록이 올바르게 추출되었는지 확인
    console.log(
      'usePrepareExistingFileNames - safeCurrentUrls:',
      safeCurrentUrls
    );

    // 기존 파일명 추출
    // 중복 확인용
    const existingBaseNames = validatedSafeImageUrls.map((item) => {
      const url = item && typeof item.url === 'string' ? item.url : '';
      const fileName = safeExtractFileNameFromUrl(url);
      // fileName이 문자열인지 확인
      const safeFileName = typeof fileName === 'string' ? fileName : '';
      // 디버깅: safeFileName 확인
      // 파일명이 올바르게 추출되었는지 확인
      console.log('usePrepareExistingFileNames - safeFileName:', safeFileName);

      // lastDotIndex 계산
      const lastDotIndex = safeFileName.lastIndexOf('.');
      // lastDotIndex가 숫자인지 확인
      const safeLastDotIndex = Number.isFinite(lastDotIndex)
        ? lastDotIndex
        : -1;
      // 디버깅: safeLastDotIndex 확인
      // 인덱스가 올바르게 계산되었는지 확인
      console.log(
        'usePrepareExistingFileNames - safeLastDotIndex:',
        safeLastDotIndex
      );

      // extension 추출
      const extension =
        safeLastDotIndex !== -1 ? safeFileName.substring(safeLastDotIndex) : '';
      // extension이 문자열인지 확인
      const safeExtension = typeof extension === 'string' ? extension : '';
      // 디버깅: safeExtension 확인
      // 확장자가 올바르게 추출되었는지 확인
      console.log(
        'usePrepareExistingFileNames - safeExtension:',
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
        'usePrepareExistingFileNames - safeNameWithoutExtension:',
        safeNameWithoutExtension
      );

      // firstUnderscoreIndex 계산
      const firstUnderscoreIndex = safeNameWithoutExtension.indexOf('_');
      // firstUnderscoreIndex가 숫자인지 확인
      const safeFirstUnderscoreIndex = Number.isFinite(firstUnderscoreIndex)
        ? firstUnderscoreIndex
        : -1;
      // 디버깅: safeFirstUnderscoreIndex 확인
      // 인덱스가 올바르게 계산되었는지 확인
      console.log(
        'usePrepareExistingFileNames - safeFirstUnderscoreIndex:',
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
      console.log('usePrepareExistingFileNames - safeBaseName:', safeBaseName);

      return safeBaseName;
    });

    // existingBaseNames가 배열인지 확인
    const safeExistingBaseNames = Array.isArray(existingBaseNames)
      ? existingBaseNames
      : [];
    // 디버깅: safeExistingBaseNames 확인
    // 파일명 목록이 올바르게 생성되었는지 확인
    console.log(
      'usePrepareExistingFileNames - safeExistingBaseNames:',
      safeExistingBaseNames
    );

    // currentUrls와 existingBaseNames 반환
    // 객체 형태로 반환
    return {
      currentUrls: safeCurrentUrls,
      existingBaseNames: safeExistingBaseNames,
    };
  };

  // prepareExistingFileNames 함수 반환
  // 객체 형태로 반환
  return { prepareExistingFileNames };
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default usePrepareExistingFileNames;
//====여기까지 수정됨====
