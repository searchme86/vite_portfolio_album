//====여기부터 수정됨====
// useBaseFileNamesWithoutSuffix 훅: 파일명 접미사 제거 및 중복 제거
// 단일 책임: 파일명 처리 및 중복 제거 로직 제공
import { useMemo } from 'react';

function useBaseFileNamesWithoutSuffix({ imageUrls }) {
  // imageUrls가 배열인지 확인, useMemo로 감싸서 동일한 참조 유지
  // map 오류 방지 및 useMemo 의존성 변경 방지
  const safeImageUrls = useMemo(() => {
    const result = Array.isArray(imageUrls) ? imageUrls : [];
    // 디버깅: safeImageUrls 확인
    // 배열이 올바르게 처리되었는지 확인
    console.log('useBaseFileNamesWithoutSuffix - safeImageUrls:', result);
    return result;
  }, [imageUrls]); // imageUrls가 변경될 때만 재계산

  // 파일명 접미사 제거 및 중복 제거 (useMemo로 최적화)
  // 불필요한 리렌더링 방지 및 중복 파일명 제거
  const baseFileNamesWithoutSuffix = useMemo(() => {
    const names = safeImageUrls.map((item) => {
      // item이 객체인지 확인
      const safeItem = typeof item === 'object' && item !== null ? item : {};
      // item.url이 문자열인지 확인
      const url = typeof safeItem.url === 'string' ? safeItem.url : '';
      // 디버깅: url 확인
      // URL이 올바르게 추출되었는지 확인
      console.log('useBaseFileNamesWithoutSuffix - url:', url);

      // URL에서 파일명 추출
      const fileName = url.split('/').pop() || '';
      // 디버깅: fileName 확인
      // 파일명이 올바르게 추출되었는지 확인
      console.log('useBaseFileNamesWithoutSuffix - fileName:', fileName);

      // 확장자와 이름 분리
      const lastDotIndex = fileName.lastIndexOf('.');
      // lastDotIndex가 숫자인지 확인
      const safeLastDotIndex = Number.isFinite(lastDotIndex)
        ? lastDotIndex
        : -1;
      // 디버깅: safeLastDotIndex 확인
      // 인덱스가 올바르게 계산되었는지 확인
      console.log(
        'useBaseFileNamesWithoutSuffix - safeLastDotIndex:',
        safeLastDotIndex
      );

      const extension =
        safeLastDotIndex !== -1 ? fileName.substring(safeLastDotIndex) : '';
      // extension이 문자열인지 확인
      const safeExtension = typeof extension === 'string' ? extension : '';
      // 디버깅: safeExtension 확인
      // 확장자가 올바르게 추출되었는지 확인
      console.log(
        'useBaseFileNamesWithoutSuffix - safeExtension:',
        safeExtension
      );

      const nameWithoutExtension =
        safeLastDotIndex !== -1
          ? fileName.substring(0, safeLastDotIndex)
          : fileName;
      // nameWithoutExtension이 문자열인지 확인
      const safeNameWithoutExtension =
        typeof nameWithoutExtension === 'string' ? nameWithoutExtension : '';
      // 디버깅: safeNameWithoutExtension 확인
      // 이름이 올바르게 추출되었는지 확인
      console.log(
        'useBaseFileNamesWithoutSuffix - safeNameWithoutExtension:',
        safeNameWithoutExtension
      );

      // 접미사 제거
      const firstUnderscoreIndex = safeNameWithoutExtension.indexOf('_');
      // firstUnderscoreIndex가 숫자인지 확인
      const safeFirstUnderscoreIndex = Number.isFinite(firstUnderscoreIndex)
        ? firstUnderscoreIndex
        : -1;
      // 디버깅: safeFirstUnderscoreIndex 확인
      // 인덱스가 올바르게 계산되었는지 확인
      console.log(
        'useBaseFileNamesWithoutSuffix - safeFirstUnderscoreIndex:',
        safeFirstUnderscoreIndex
      );

      const nameWithoutSuffix =
        safeFirstUnderscoreIndex !== -1
          ? safeNameWithoutExtension.substring(0, safeFirstUnderscoreIndex) +
            safeExtension
          : fileName;
      // nameWithoutSuffix가 문자열인지 확인
      const safeNameWithoutSuffix =
        typeof nameWithoutSuffix === 'string' ? nameWithoutSuffix : '';
      // 디버깅: safeNameWithoutSuffix 확인
      // 접미사가 제거된 이름 확인
      console.log(
        'useBaseFileNamesWithoutSuffix - Processed file name without suffix:',
        safeNameWithoutSuffix
      );

      return safeNameWithoutSuffix;
    });

    // 중복 제거
    const deduplicatedNames = Array.from(new Set(names));
    // deduplicatedNames가 배열인지 확인
    const safeDeduplicatedNames = Array.isArray(deduplicatedNames)
      ? deduplicatedNames
      : [];
    // 디버깅: safeDeduplicatedNames 확인
    // 중복 제거된 파일명 목록 확인
    console.log(
      'useBaseFileNamesWithoutSuffix - Base file names without suffix (deduplicated):',
      safeDeduplicatedNames
    );

    return safeDeduplicatedNames;
  }, [safeImageUrls]);

  // baseFileNamesWithoutSuffix 반환
  // 객체 형태로 반환
  return { baseFileNamesWithoutSuffix };
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default useBaseFileNamesWithoutSuffix;
//====여기까지 수정됨====
