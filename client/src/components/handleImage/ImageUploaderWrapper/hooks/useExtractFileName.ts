//====여기부터 수정됨====
// useExtractFileName 훅: URL에서 파일명 추출
// 단일 책임: 파일명 추출 로직 제공
function useExtractFileName() {
  // extractFileNameFromUrl 함수: URL에서 파일명 추출
  // 파일명 중복 확인용
  const extractFileNameFromUrl = (url) => {
    // url이 문자열이 아닌 경우 빈 문자열로 대체
    // typeof로 타입 체크, split 오류 방지
    const safeUrl = typeof url === 'string' ? url : '';
    // 디버깅: safeUrl 확인
    // url이 올바르게 처리되었는지 확인
    console.log('useExtractFileName - safeUrl:', safeUrl);

    // URL을 "/"로 분리하여 마지막 부분 추출
    // 파일명이 포함된 부분, split 결과가 배열인지 확인
    const parts = Array.isArray(safeUrl.split('/')) ? safeUrl.split('/') : [];
    // 디버깅: parts 확인
    // split 결과가 올바른지 확인
    console.log('useExtractFileName - parts:', parts);

    // 마지막 부분에서 파일명 추출, 기본값 빈 문자열
    // parts 배열의 길이가 0이 아닌지 확인
    const fileNameWithQuery = parts.length > 0 ? parts[parts.length - 1] : '';
    // 디버깅: 추출된 파일명 확인
    // 파일명이 올바르게 추출되었는지 확인
    console.log(
      'useExtractFileName - Extracted file name from URL:',
      fileNameWithQuery
    );

    // 파일명이 문자열인지 확인 후 반환
    // 예상치 못한 값 방지
    const finalFileName =
      typeof fileNameWithQuery === 'string' ? fileNameWithQuery : '';
    // 디버깅: finalFileName 확인
    // 최종 반환값 확인
    console.log('useExtractFileName - finalFileName:', finalFileName);

    return finalFileName;
  };

  // extractFileNameFromUrl 함수 반환
  // 객체 형태로 반환
  return { extractFileNameFromUrl };
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default useExtractFileName;
//====여기까지 수정됨====
